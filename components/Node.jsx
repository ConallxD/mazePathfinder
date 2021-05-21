import { utils } from "./utils";

export default class Node {
  constructor(i, j, cols, rows) {
    this.i = i;
    this.j = j;
    this.cols = cols;
    this.rows = rows;
    this.f = 0; // path cost ro next node
    this.g = 0; //path cost from start to current
    this.h = 0; // heuristic from current to end
    this.neighbors = [];
    this.neighborsObj = {
      up: null,
      down: null,
      left: null,
      right: null,
    };
    this.previous = undefined;
    this.wall = false;
    this.canGo = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.visited = false;
  }

  index = (i, j) => {
    if (i < 0 || j < 0 || i > cols - 1 || rows - 1) {
      return -1;
    }
    return i + j * this.cols;
  };

  removeWallsBetween = (node) => {
    let deltaI = this.i - node.i;
    let deltaJ = this.j - node.j;
    if (
      Math.abs(deltaI) === Math.abs(deltaJ) ||
      Math.abs(deltaI) > 1 ||
      Math.abs(deltaJ) > 1
    ) {
      console.error("no dice");
      return;
    }

    if (deltaI == -1) {
      this.canGo.right = true;
      // if (this.neighborsObj.right) this.neighborsObj.right.canGo.left = true;
      node.canGo.left = true;
    }
    if (deltaI == 1) {
      this.canGo.left = true;
      node.canGo.right = true;
      // if (this.neighborsObj.left) this.neighborsObj.left.canGo.right = true;
    }
    if (deltaJ == 1) {
      this.canGo.up = true;
      node.canGo.down = true;
      // if (this.neighborsObj.up) this.neighborsObj.up.canGo.down = true;
    }
    if (deltaJ == -1) {
      this.canGo.down = true;
      node.canGo.up = true;
      // if (this.neighborsObj.down) this.neighborsObj.down.canGo.up = true;
    }
  };

  saveNeighborObj = (i, j, neighbor) => {
    if (i === 1) {
      this.neighborsObj.right = neighbor;
    }
    if (i === -1) {
      this.neighborsObj.left = neighbor;
    }
    if (j === 1) {
      this.neighborsObj.down = neighbor;
    }
    if (j === -1) {
      this.neighborsObj.up = neighbor;
    }
  };

  addNeighbors = (grid, diagsAllowed = false) => {
    if (diagsAllowed) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (!diagsAllowed && Math.abs(i) === Math.abs(j)) continue;
          const currentCell = grid?.[this.i + i]?.[this.j + j];
          if (currentCell && currentCell != this) {
            if (!diagsAllowed) this.saveNeighborObj(i, j, currentCell);
            this.neighbors.push(currentCell);
          }
        }
      }
    } else {
      const rightCell = grid?.[this.i + 1]?.[this.j];
      if (rightCell) {
        this.neighbors.push(rightCell);
        this.neighborsObj.right = rightCell;
      }

      const leftCell = grid?.[this.i - 1]?.[this.j];
      if (leftCell) {
        this.neighbors.push(leftCell);
        this.neighborsObj.left = leftCell;
      }
      const upCell = grid?.[this.i]?.[this.j - 1];
      if (upCell) {
        this.neighbors.push(upCell);
        this.neighborsObj.up = upCell;
      }
      const downCell = grid?.[this.i]?.[this.j + 1];
      if (downCell) {
        this.neighbors.push(downCell);
        this.neighborsObj.down = downCell;
      }
    }
  };
}
