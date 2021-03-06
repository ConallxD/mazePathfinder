import Node from "../components/Node.jsx";

export class Grid {
  constructor(cols, rows) {
    this.grid = new Array(cols);

    for (let i = 0; i < cols; i++) {
      this.grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.grid[i][j] = new Node(i, j, cols, rows);
      }
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.grid[i][j].addNeighbors(this.grid);
      }
    }

    this.start = this.grid[0][0];
    this.end = this.grid[cols - 1][rows - 1];
    this.closedSet = [];
    this.openSet = [];
    this.completePath = [];
    this.currentPath = [];
    this.cols = cols;
    this.rows = rows;
    this.start.color = "cyan";
  }

  reset() {
    this.closedSet = [];
    this.openSet = [];
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].visited = false;
        this.grid[i][j].color = "black";
      }
    }
  }

  copyGrid() {
    let tempG = [...this.grid];
    for (let i = 0; i < tempG.length; i++) {
      tempG[i] = [...tempG[i]];
      // for (let j = 0; j < tempG[i].length; j++) {
      //   tempG[i][j] = { ...tempG[i][j] };
      // }
    }
    return tempG;
  }
  getGrid = () => this.grid;
}
