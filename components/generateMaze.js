import { Grid } from "./Grid";
import { utils } from "./utils";

export class GenerateMaze {
  constructor(gridObj, setGrid) {
    this.gridObj = gridObj;
    this.setGrid = setGrid;
    this.intervalRef = setInterval(() => {
      if (!this.finished) this.updateGrid();
    }, 0);
    this.pathStack = [];
    // Make an initial cell the current cell and mark it as visited
    this.cell = this.gridObj.start;
    this.gridObj.start.visited = true;
    this.pathStack.push(this.cell);
    this.finished = false;
  }

  reset() {
    this.intervalRef = setInterval(() => {
      if (!this.finished) this.updateGrid();
    }, 0);
    this.pathStack = [];
    // Make an initial cell the current cell and mark it as visited
    this.cell = this.gridObj.start;
    this.gridObj.start.visited = true;
    this.pathStack.push(this.cell);
  }

  // checkNeighbors = (grid) => {
  //   let top = grid[this.index(this.i, this.j - 1)];
  //   let right = grid[this.index(this.i + 1, this.j)];
  //   let bottom = grid[this.index(this.i, this.j + 1)];
  //   let left = grid[this.index(this.i - 1, this.j)];

  //   if (top && !top.visited) {
  //     this.neighbors.push(top);
  //   }
  //   if (right && !right.visited) {
  //     this.neighbors.push(right);
  //   }
  //   if (bottom && !bottom.visited) {
  //     this.neighbors.push(bottom);
  //   }
  //   if (left && !left.visited) {
  //     this.neighbors.push(left);
  //   }
  //   if (this.neighbors.length > 0) {
  //     let r = utils.diceRoll(neighbors.length - 1);
  //     return neighbors[r];
  //   } else {
  //     return undefined;
  //   }
  // };

  updateGrid(skipUpdate = false) {
    // this.cell.removeWallsBetween(this.cell.neighborsObj.right);
    // this.cell = this.cell.neighborsObj.right;
    // While there are unvisited cells
    if (this.pathStack.length > 0) {
      //If the current cell has any neighbors which have not been visited
      let notVisited = [];
      for (let i = 0; i < this.cell.neighbors.length; i++) {
        if (!this.cell.neighbors[i].visited) {
          notVisited.push(this.cell.neighbors[i]);
        }
      }
      if (notVisited.length) {
        // if (cell.neighbors[i] === cell) {
        //Choose randomly one of the unvisited neighbors
        let randomNeighbor = notVisited[utils.diceRoll(notVisited.length - 1)];
        //Push the current node to the stack
        this.pathStack.push(randomNeighbor);
        //Remove the wall between the current node and the chosen cell
        this.cell.removeWallsBetween(randomNeighbor);
        this.cell = randomNeighbor;
        //Make the chosen cell the current node and mark it as visited
        this.cell.visited = true;
        //Else if stack is not empty
      } else if (this.pathStack.length) {
        //Pop a node from the stack
        //Make it the current cell
        this.cell = this.pathStack.pop();
        this.updateGrid();
      }
    } else {
      this.finished = true;
      clearInterval(this.intervalRef);
    }
    if (!skipUpdate) this.setGrid();
  }
}
