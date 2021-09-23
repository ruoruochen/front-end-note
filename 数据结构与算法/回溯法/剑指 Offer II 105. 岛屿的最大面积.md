#### 剑指 Offer II 105. 岛屿的最大面积

```js
var maxAreaOfIsland = function(grid) {
    let row = grid.length;
    let col = grid[0].length;
    let count = 0 ;
    let ans = 0;
    let visited = [...new Array(row)].map(() => new Array(col).fill(false))
    let dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    function dfs(i,j){
        count++;
        visited[i][j] = true;
        for(const dir of dirs){
            let nextRow = i +dir[0] , nextCol = j +dir[1];
            if(check(nextRow, nextCol)&& !visited[nextRow][nextCol] &&grid[nextRow][nextCol] == 1){
                dfs(nextRow , nextCol);
            }
        }
    }
    function check(row,col){
        return row >= 0 && row < grid.length && col >=0 &&col <grid[0].length;
    }
    for(let i=0 ;i < row; i++){
        for(let j=0; j < col ;j++){
            if(grid[i][j] == 1 &&!visited[i][j]){
                count = 0;
                dfs(i,j);
                ans = Math.max(ans, count);
            }
        }
    }
    return ans;
   
};
```

