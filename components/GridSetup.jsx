import styles from "../styles/css/Grid.module.css";
import { Component } from "react";
import { Grid } from "../components/Grid.js";
import { Pathfinder } from "../components/Pathfinder";

let cols = 10;
let rows = cols;

let handleNodeStyle = (item, grid) => {
  let style = { backgroundColor: item.color };

  if (item.i === grid.start.i && item.j === grid.start.j) {
    style = {
      ...style,
      backgroundColor: "#86ec27",
    };
  } else if (item.i === grid.end.i && item.j === grid.end.j) {
    style = {
      ...style,
      backgroundColor: "#ec2727",
    };
  }
  return style;
};

class GridSetup extends Component {
  constructor() {
    super();
    this.gridObj = new Grid(cols, rows);
    this.state = {
      grid: this.gridObj.getGrid(),
    };
  }

  setGrid() {
    this.colorGrid();
    let tempG = [...this.state.grid];
    for (let i = 0; i < tempG.length; i++) {
      tempG[i] = [...tempG[i]];
    }
    this.setState({ grid: tempG });
  }

  startPathFind = () => {
    this.resetPath();
    let path = new Pathfinder(this.gridObj, (state) => this.setGrid(state));
  };

  colorGrid = () => {
    let grid = this.gridObj.copyGrid();
    for (let i = 0; i < this.gridObj.openSet.length; i++) {
      grid[this.gridObj.openSet[i].i][this.gridObj.openSet[i].j].color =
        "#95e95d";
    }
    for (let i = 0; i < this.gridObj.closedSet.length; i++) {
      grid[this.gridObj.closedSet[i].i][this.gridObj.closedSet[i].j].color =
        "#ff1e3c";
    }

    // for (let i = 0; i < this.gridObj.currentPath.length; i++) {
    //   this.gridObj.currentPath[i].color = "#D1495B";

    for (let i = 0; i < this.gridObj?.completePath.length; i++) {
      this.gridObj.completePath[i].color = "#2238fa";
    }
    for (let i = 0; i < this.gridObj.cols; i++) {
      for (let j = 0; j < this.gridObj.rows; j++) {
        if (grid[i][j].wall) {
          grid[i][j].color = "#86BBD8";
        }
      }
    }
  };

  resetPath = () => {
    this.gridObj.closedSet = [];
    this.gridObj.openSet = [];
    this.gridObj.completePath = [];
    this.gridObj.currentPath = [];
    let grid = this.gridObj.copyGrid();

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].color = "";
        grid[i][j].previous = null;
        grid[i][j].f = 0; // path cost to next node
        grid[i][j].g = 0; //path cost from start to current
        grid[i][j].h = 0;
      }
    }
    this.setGrid();
  };

  toggleWall = (item) => {
    item.wall = !item.wall;
    item.color = "#001b2e";
    this.setGrid();
  };

  clearWalls = () => {
    for (let i = 0; i < this.gridObj.cols; i++) {
      for (let j = 0; j < this.gridObj.rows; j++) {
        this.state.grid[i][j].wall = false;
      }
    }
    this.setGrid();
  };

  mouseOverCell = (item) => {
    if (this.mouseDown) {
      this.toggleWall(item);
    }
  };

  mouseDownCell = () => {
    this.mouseDown = true;
  };
  mouseUpCell = () => {
    this.mouseDown = false;
  };

  render() {
    let { grid } = this.state;
    return (
      <>
        <div
          onMouseDown={this.mouseDownCell}
          onMouseUp={this.mouseUpCell}
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${cols}, 0.9fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {grid.map((row, indexY) =>
            row.map((item, indexX) => (
              <div
                onMouseOver={() => this.mouseOverCell(item)}
                onClick={() => {
                  this.toggleWall(item);
                }}
                style={handleNodeStyle(item, this.gridObj)}
                key={"box" + indexX + indexY}
                className={styles.square}
              >
                <container className={styles.scores}>
                  <div className={styles.topLineScores}>
                    <div className={styles.gScore}>
                      {Math.round(item.g * 100) / 100}
                      {/* {Math.round(item.g * 10)} */}
                    </div>
                    <div className={styles.hScore}>
                      {Math.round(item.h * 100) / 100}
                      {/* {Math.round(item.h * 10)} */}
                    </div>
                  </div>
                  <div className={styles.fScore}>
                    {Math.round(item.f * 100) / 100}
                    {/* {Math.round(item.f * 10)} */}
                  </div>
                </container>
              </div>
            ))
          )}
        </div>
        <button onClick={this.startPathFind} className={styles.button}>
          {this.gridObj.completePath.length ? "Reset" : "Find Path"}
        </button>
        <button onClick={this.clearWalls} className={styles.button}>
          Clear Walls
        </button>
      </>
    );
  }
}

export default GridSetup;
