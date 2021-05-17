export class Pathfinder {
  constructor(gridObj, setGrid) {
    this.grid = gridObj.getGrid();
    this.gridObj = gridObj;
    this.setGrid = setGrid;
    this.intervalRef = setInterval(() => {
      if (!this.finished) this.updateGrid();
    }, 50);
    this.i = 0;
    this.j = 0;
    this.gridObj.openSet.push(this.gridObj.start);
    this.finished = false;
  }

  removeFromArray(arr, elt) {
    arr.splice(arr.indexOf(elt), 1);
  }

  heuristic(a, b) {
    let deltaI = Math.abs(a.i - b.i);
    let deltaJ = Math.abs(a.j - b.j);
    let d = Math.sqrt(deltaI * deltaI + deltaJ * deltaJ);
    return d;
  }

  manhattanDistance = (a, b) => {
    let d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
    return d;
  };

  updateGrid() {
    let current;
    if (this.gridObj.openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < this.gridObj.openSet.length; i++) {
        if (this.gridObj.openSet[i].f < this.gridObj.openSet[winner].f) {
          winner = i;
        }
      }
      current = this.gridObj.openSet[winner];

      if (current === this.gridObj.end) {
        // this.gridObj.completePath = [];
        let temp = current;
        while (temp.previous) {
          this.gridObj.completePath.push(temp.previous);
          temp = temp.previous;
        }
        console.log("Done!");
        this.finished = true;
        clearInterval(this.intervalRef);
      }

      this.removeFromArray(this.gridObj.openSet, current);

      this.gridObj.closedSet.push(current);

      let neighbors = current.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        if (!this.gridObj.closedSet.includes(neighbor) && !neighbor.wall) {
          let tempG = current.g + this.heuristic(current, neighbor);
          if (this.gridObj.openSet.includes(neighbor)) {
            if (tempG > neighbor.g) {
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            this.gridObj.openSet.push(neighbor);
          }
          neighbor.h = this.manhattanDistance(neighbor, this.gridObj.end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    } else {
      console.log("no solution");
    }

    this.gridObj.currentPath = [];
    let temp = current;
    while (temp?.previous) {
      this.gridObj.currentPath.push(temp.previous);
      temp = temp.previous;
    }

    this.setGrid();
  }
}
