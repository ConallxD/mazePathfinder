import styles from "../styles/css/Grid.module.css";
import { useState, Component } from "react";
import { Grid } from "../components/Grid.js";
import { Pathfinder } from "../components/Pathfinder";

let cols = 50;
let rows = cols;

let handleNodeStyle = (item, grid) => {
  let style = { backgroundColor: item.color };

  if (item.i === grid.start.i && item.j === grid.start.j) {
    style = {
      ...style,
      border: "1px solid green",
      backgroundColor: "#86ec27",
    };
  } else if (item.i === grid.end.i && item.j === grid.end.j) {
    style = {
      ...style,
      border: "1px solid #bbff00",
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
    let path = new Pathfinder(this.gridObj, (state) => this.setGrid(state));
  };

  colorGrid = () => {
    let grid = this.gridObj.copyGrid();
    for (let i = 0; i < this.gridObj.openSet.length; i++) {
      grid[this.gridObj.openSet[i].i][this.gridObj.openSet[i].j].color =
        "magenta";
    }
    for (let i = 0; i < this.gridObj.closedSet.length; i++) {
      grid[this.gridObj.closedSet[i].i][this.gridObj.closedSet[i].j].color =
        "#09E85E";
    }
    for (let i = 0; i < this.gridObj.cols; i++) {
      for (let j = 0; j < this.gridObj.rows; j++) {
        if (grid[i][j].wall) {
          grid[i][j].color = "black";
        }
      }
    }

    for (let i = 0; i < this.gridObj.currentPath.length; i++) {
      this.gridObj.currentPath[i].color = "green";
    }

    for (let i = 0; i < this.gridObj?.completePath.length; i++) {
      this.gridObj.completePath[i].color = "blue";
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

  setWall = (item) => {
    item.wall = true;
    item.color = "black";
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
      this.setWall(item);
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
                  this.setWall(item);
                }}
                style={handleNodeStyle(item, this.gridObj)}
                key={"box" + indexX + indexY}
                className={styles.square}
              ></div>
            ))
          )}
        </div>
        <button onClick={this.startPathFind} className={styles.button}>
          Find Path
        </button>
        <button onClick={this.resetPath} className={styles.button}>
          Reset
        </button>
        <button className="resetWallsBtn" onClick={this.clearWalls}>
          Clear Walls
        </button>
      </>
    );
  }
}

export default GridSetup;
