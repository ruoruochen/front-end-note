# setState 是同步/异步？

## 结论

- 在合成事件、钩子函数中表现异步，在原生事件、setTimeout 中表现同步。
- 合成事件： React 为了跨平台、兼容性而实现的一套事件机制，例如 onClick、onChange 等事件
- 原生事件：addEventListener 中的事件

React 会对合成事件进行一系列处理时，会执行 batchesUpdate 函数，在这里就已经把 executionContext 变为 batchContext ，此时相当于打上一个标记“延迟更新 state”，因此不会直接走 flush。

而原生时间或计时器，不会走 React 的调度流程，也就不会被打上标记，就表现为同步更新。

## 源码解读

> 以下代码中，与本次探讨问题关系不大的代码会剔除，仅保留相关代码、大方向，感兴趣的可以直接去看源码。

在调用`this.setState`时，我们会进入到`enqueueSetState`方法，然后会调用重点函数`scheduleUpdateOnFiber`,我们来看看在这个函数里具体做了什么。

**setState、enqueueSetState 方法（感兴趣可以看）**

```js
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

enqueueSetState(inst, payload, callback) {
    // 获取Fiber结点、优先级
    const fiber = getInstance(inst);
    const eventTime = requestEventTime();
    const lane = requestUpdateLane(fiber);

    // 创建Update对象
    const update = createUpdate(eventTime, lane);

    // 将Update对象加入UpdateQueue中 其中root为rootFiber
    const root = enqueueUpdate(fiber, update, lane);

    // 调度更新
    if (root !== null) {
      /* 看这里，进入这个方法*/
      scheduleUpdateOnFiber(root, fiber, lane, eventTime);
      entangleTransitions(root, fiber, lane);
    }

    {
      markStateUpdateScheduled(fiber, lane);
    }
  },
```

**重点：scheduleUpdateOnFiber**

```js
export function scheduleUpdateOnFiber(root, fiber, lane, eventTime) {
    // 调度
    ensureRootIsScheduled(root, eventTime);

    /* 重点!!!!
    判断上下文是否
    */
    if (
      lane === SyncLane &&
      executionContext === NoContext &&
      (fiber.mode & ConcurrentMode) === NoMode &&
      // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !(__DEV__ && ReactCurrentActQueue.isBatchingLegacy)
    ) {
      // Flush the synchronous work now, unless we're already working or inside
      // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
      // scheduleCallbackForFiber to preserve the ability to schedule a callback
      // without immediately flushing it. We only do this for user-initiated
      // updates, to preserve historical behavior of legacy mode.
      resetRenderTimer();
      flushSyncCallbacksOnlyInLegacyMode();
    }
  }
}
```

我们重点看这一段代码：

```js
if (
  lane === SyncLane &&
  executionContext === NoContext &&
  (fiber.mode & ConcurrentMode) === NoMode
) {
  // Flush the synchronous work now, unless we're already working or inside
  // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
  // scheduleCallbackForFiber to preserve the ability to schedule a callback
  // without immediately flushing it. We only do this for user-initiated
  // updates, to preserve historical behavior of legacy mode.
  resetRenderTimer();
  flushSyncCallbacksOnlyInLegacyMode();
}
```

**if 语句里的意思：如果当前处于最高优先级、React 无活可干、同步模式时，立即执行 flushSyncCallbacksOnlyInLegacyMode 进行渲染。**

我们一个字段一个字段的看，首先是`lane`优先级，`lane === SyncLane`: 处于最高优先级。

其次是`executionContext`执行上下文，`executionContext === NoContext`：简单理解为 React 现在没活干了（React 在干别的事情时，会置 executionContext）。

最后是`fiber.mode`模式，`(fiber.mode & ConcurrentMode) === NoMode`：处于同步模式

**executionContext**

`NoContext`表示目前没活干了，执行`flushSyncCallbacksOnlyInLegacyMode`进行渲染，更新 state。

问题来了，`executionContext`是在什么时候被修改的呢？

在合成事件进行一系列处理时，会触发 batchesUpdate，就已经把 executionContext 变为 batchContext 了，因此不会直接走 flush。

![20220716223018](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220716223018.png)

其他时机：

简单全局搜索了一下，发现在 Batch,Render,Commit 时，会修改 Context，此时 React 就该干活了，顾不上"flush"了，等后续没活干了，再去"flush"，因此表现出了异步。

![20220716221132](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220716221132.png)

**fiber.mode**

`fiber.mode`一共有 6 个值，从上到下分别表示：

- NoMode：同步模式
- ConcurrentMode：并发模式
- ProfileMode：性能检测模式，用于检测哪存在性能问题
- DebugTracingMode：测试模式
- StrictLegacyMode/StrictEffectsMode：严格模式
  ...(具体模式作用不深入了解，大概知道就行)

![20220716221500](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220716221500.png)

## 其他问题

### setState 的批量更新是指只执行相同 key 的最后一次 setState 吗？

setState 在批量合并过程中会执行每个 setState，但在 updater 是对象的情况下，setState 对于相同 key 的操作始终以最后一次修改为准。

### React 为什么要这样子设计？如果全同步会怎么样？

批量更新提高性能，例如一个 Click 事件会触发父子组件的 setState，我们并不喜欢子组件 Re-render 两次，而是将其变为 dirty，一块 re-render

### 同步不能实现批量更新吗？

原文：https://github.com/facebook/react/issues/11527

**总结一下：**

不能，异步 setState 是为了保持内部的一致性

如果 this.setState 变为同步，而 props 还为异步，就会出现内部不一致，举个简单的例子

我们假设此时 this.setState 是同步的，就会输出 1，2，3

```js
this.state = { count: 0 };

this.setState({ count: this.state.count + 1 });
console.log(this.state.count); // 1
this.setState({ count: this.state.count + 1 });
console.log(this.state.count); // 2
this.setState({ count: this.state.count + 1 });
console.log(this.state.count); // 3
```

**我们对上面代码改写一下,我们假设 count 是父组件的 state，在子组件中调用父组件传递下来的方法对 state 进行修改**

```js
console.log(this.props.count); //0
this.props.inCreaseNumber();
console.log(this.props.count); //0
this.props.inCreaseNumber();
console.log(this.props.count); //0
this.props.inCreaseNumber();
console.log(this.props.count); //0
```

这时候输出的 count 一直为 0，为什么呢？因为 this.state 会同步刷新，而 this.props 不会.因为只有在重新渲染父组件，才能更新 props。
如果我们想要达到输出 1，2，3 的效果，就只能放弃批量更新，在每次 state 变化的时候，更新父组件，保证 props 的更新，这会显著降低性能且不符合预期！

## 参考链接

https://zhuanlan.zhihu.com/p/350332132
https://zhuanlan.zhihu.com/p/54037407
https://github.com/facebook/react/issues/11527
