export default class Node {
  constructor(i, j, cols, rows) {
    this.i = i;
    this.j = j;
    this.cols = cols;
    this.rows = rows;
    this.f = Infinity; // path cost ro next node
    this.g = Infinity; //path cost from start to current
    this.h = 0; // heuristic from current to end
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
  }

  addNeighbors = (grid) => {
    let i = this.i;
    let j = this.j;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const currentCell = grid?.[this.i + i]?.[this.j + j];

        if (currentCell && currentCell != this) {
          this.neighbors.push(currentCell);
        }
      }
    }
  };
}
