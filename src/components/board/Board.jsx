import React, { useState, useEffect, useRef } from "react";
import "./board.css";
import { BFSAlgo } from "../../pathfinding/BFS";
import { DFSAlgo } from "../../pathfinding/DFS";
import { BidirectionaAlgo } from "../../pathfinding/Bidirectional";

const clearPath = (grid, setGrid) => {
  if (grid != undefined) {
    const newGrid = [...grid];
    for (let y = 0; y < newGrid.length; y++) {
      for (let x = 0; x < newGrid[0].length; x++) {
        if (newGrid[x][y] === -1) {
          newGrid[x][y] = 0;
        }
      }
    }
    setGrid(newGrid);
  }
};

function Board({ grid, setGrid, numRows, numCols, searching, setSearching }) {
  const [removingWalls, setRemovingWalls] = useState(false);
  const [drawingWalls, setDrawingWalls] = useState(false);
  const [movingStartNode, setMovingStartNode] = useState(false);
  const [movingEndNode, setMovingEndNode] = useState(false);
  const [prevX, setPrevX] = useState(null);
  const [prevY, setPrevY] = useState(null);
  const [algo, setAlgo] = useState(null);
  const [startNode, setStartNode] = useState({
    startx: 4,
    starty: Math.ceil(numRows / 2) - 2,
  });
  const [endNode, setEndNode] = useState({
    endx: numCols - 5,
    endy: Math.ceil(numRows / 2) - 2,
  });

  var algorithm = useRef("");

  const GridValue = (pos) => {
    if (pos[0] < numCols && pos[0] >= 0 && pos[1] >= 0 && pos[1] < numRows) {
      return grid[pos[0]][pos[1]];
    }
  };

  const GridVisited = (pos) => {
    if (pos[0] < numCols && pos[0] >= 0 && pos[1] >= 0 && pos[1] < numRows)
      return (grid[pos[0]][pos[1]] = -1);
  };

  function clearPrevStartNodes() {
    const newGrid = [...grid];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        if (newGrid[x][y] === 3) {
          newGrid[x][y] = 0;
          document.getElementById(`${x}-${y}`).classList.remove("startNode");
        }
      }
    }
    setGrid(newGrid);
  }

  function clearPrevEndNodes() {
    const newGrid = [...grid];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        if (newGrid[x][y] === 4) {
          newGrid[x][y] = 0;
        }
      }
    }
    setGrid(newGrid);
  }

  function setGridWall(pos) {
    if (pos[0] < numCols && pos[0] >= 0 && pos[1] >= 0 && pos[1] < numRows) {
      const newGrid = [...grid];
      newGrid[pos[0]][pos[1]] = 1;
      setGrid(newGrid);
    }
  }

  const generateRandomWalls = () => {
    clearWalls();
    // setSearchingTrue();
    setSearching(true);
    let numWalls = 0;
    const newGrid = [...grid];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        if (Math.random() < 0.2 && newGrid[x][y] === 0) {
          newGrid[x][y] = 1;
          numWalls++;
          setTimeout(function () {
            document.getElementById(`${x}-${y}`).classList.toggle("wall");
          }, numWalls * 3);
        }
      }
    }
    setGrid(newGrid);

    setTimeout(function () {
      setSearching(false);
    }, numWalls * 3);
  };

  function clearWalls() {
    const newGrid = [...grid];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        if (newGrid[x][y] === 1) {
          newGrid[x][y] = 0;
        }
        document
          .getElementById(`${x}-${y}`)
          .classList.remove("wall", "visited", "path");
      }
    }

    setGrid(newGrid);
  }

  const clearPath = () => {
    const newGrid = [...grid];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        document
          .getElementById(`${x}-${y}`)
          .classList.remove("visited", "path");

        if (newGrid[x][y] != 1) {
          newGrid[x][y] = 0;
        }
      }
    }

    setGrid(newGrid);
  };

  function handleMouseDown(e) {
    if (!searching) {
      let x = ~~(e.clientX / 30);
      let y = ~~(
        (e.clientY - document.querySelector(".top").clientHeight) /
        30
      );
      let id = document.getElementById(`${x}-${y}`);
      let newGrid = [...grid];
      if (prevX !== x || prevY !== y) {
        if (drawingWalls && grid[x][y] === 0) {
          id.classList.add("wall");
          newGrid[x][y] = 1;
        } else if (removingWalls && grid[x][y] === 1) {
          id.classList.remove("wall");
          newGrid[x][y] = 0;
        } else if (movingStartNode && grid[x][y] === 0) {
          clearPrevStartNodes();
          newGrid[x][y] = 3;
          id.classList.add("startNode");
        } else if (movingEndNode && grid[x][y] == 0) {
          clearPrevEndNodes();
          newGrid[x][y] = 4;
          id.classList.add("endNode");
        }
        setGrid(newGrid);
        setPrevX(x);
        setPrevY(y);
      }
    }
  }

  useEffect(() => {
    const table = document.querySelector("table");

    const handleMouseDownWrapper = (e) => {
      if (!searching) {
        let x = ~~(e.clientX / 30);
        let y = ~~(
          (e.clientY - document.querySelector(".top").clientHeight) /
          30
        );
        let id = document.getElementById(`${x}-${y}`);
        let newGrid = [...grid];
        console.log(grid[x][y] + "movingStartNode" + movingStartNode);

        if (movingStartNode && grid[x][y] == 0) {
          newGrid[startNode.startx][startNode.starty] = 0;
          setStartNode({ startx: x, starty: y });
          setMovingStartNode(false);
          newGrid[x][y] = 3;
          setGrid(newGrid);
          id.classList.toggle("startNode");
        } else if (movingEndNode && grid[x][y] == 0) {
          newGrid[endNode.endx][endNode.endy] = 0;
          setEndNode({ endx: x, endy: y });
          newGrid[x][y] = 4;
          setGrid(newGrid);
          id.classList.toggle("endNode");
          setMovingEndNode(false);
        } else if (id.classList.contains("startNode")) {
          setMovingStartNode(true);
        } else if (id.classList.contains("endNode")) {
          setMovingEndNode(true);
        } else if (id.classList.contains("wall")) {
          setRemovingWalls(true);
          newGrid[x][y] = 0;
          id.classList.toggle("wall");
        } else {
          newGrid[x][y] = 1;
          setDrawingWalls(true);
          console.log("black");
          id.classList.toggle("wall");
        }
        setPrevX(x);
        setPrevY(y);
      }
    };

    table.addEventListener("mousedown", handleMouseDownWrapper);

    return () => {
      table.removeEventListener("mousedown", handleMouseDownWrapper);
    };
  }, [
    grid,
    prevX,
    prevY,
    searching,
    drawingWalls,
    removingWalls,
    movingStartNode,
    movingEndNode,
  ]);

  const handledropdownbutton = (e) => {
    algorithm = e.target.id;
    setAlgo(algorithm);
    document.getElementById("visualize").innerHTML = "Visualize " + algorithm;
  };

  const handleTutorial = (e) => {
    const tutorialButton = document.getElementById("tutorialButton");
    const modalDialog = document.getElementById("openModal-about");
    tutorialButton.addEventListener("click", () => {
      modalDialog.classList.toggle("show");
    });
  };

  const drawPath = function (path, c) {
    let newPath = path.slice(1, path.length - 1);

    newPath.forEach((node, index) => {
      setTimeout(function () {
        document
          .getElementById(`${node[0]}-${node[1]}`)
          .classList.toggle("path");

        if (index === newPath.length - 1) {
          //  board.setSearchingFalse();
          setSearching(false);
        }
      }, c * 10 + 45 * index);
    });
  };

  const drawOperations = (operations, operationCount, delay = 10) => {
    let nodeClass;
    delay === 0
      ? (nodeClass = "visited-no-animation")
      : (nodeClass = "visited");

    setTimeout(function () {
      for (let i = 0; i < operations.length; i++) {
        let node = document.getElementById(
          `${operations[i][0]}-${operations[i][1]}`
        );
        if (node) {
          node.classList.toggle(nodeClass);
        }
      }
    }, operationCount * delay);
  };

  const showNotification = (type, text, time = 3000) => {
    const popupNotification = document.getElementById("snackbar");
    popupNotification.innerHTML = text;
    popupNotification.className = "show";

    setTimeout(function () {
      popupNotification.classList.remove("show");
    }, time);
  };

  return (
    <div>
      <div className="top">
        <div className="topleft" onClick={() => window.location.reload()}>
          <h4>Maze Solver</h4>
        </div>
        <div className="topcenter">
          <ul className="topList">
            {/* <li
              className="topListItem"
              id="tutorialButton"
              onClick={handleTutorial}
            >
              Tutorial
            </li> */}
            {/* <li>
              <a href="#openModal-about" >
                Tutorial
              </a>
            </li> */}
            <li
              className="topListItem"
              onClick={!searching ? clearWalls : undefined}
            >
              Clear Maze
            </li>
            <li
              className="topListItem"
              onClick={!searching ? clearPath : undefined}
            >
              Clear Path{" "}
            </li>
            <li
              className="topListItem"
              onClick={!searching ? generateRandomWalls : undefined}
            >
              Generate Random Maze
            </li>
            <li
              className="topListItem"
              id="visualize"
              onClick={() =>
                !searching
                  ? algo == "BFS"
                    ? BFSAlgo({
                        GridValue,
                        GridVisited,
                        drawPath,
                        drawOperations,
                        numRows,
                        numCols,
                        startNode,
                        endNode,
                        showNotification,
                        searching,
                        setSearching,
                        clearPath,
                      })
                    : algo == "DFS"
                    ? DFSAlgo({
                        GridValue,
                        GridVisited,
                        drawPath,
                        drawOperations,
                        numRows,
                        numCols,
                        startNode,
                        endNode,
                        showNotification,
                        searching,
                        setSearching,
                        clearPath,
                      })
                    : algo == "Bidirectional"
                    ? BidirectionaAlgo({
                        GridValue,
                        GridVisited,
                        drawPath,
                        drawOperations,
                        numRows,
                        numCols,
                        startNode,
                        endNode,
                        showNotification,
                        searching,
                        setSearching,
                        clearPath,
                      })
                    : showNotification(
                        true,
                        "You must first select an algorithm!"
                      )
                  : undefined
              }
            >
              Visualize
            </li>
          </ul>
        </div>
        <div className="topleft">
          <div class="dropdown">
            <button class="dropbtn">Select an Algorithm</button>
            <div id="myDropdown" class="dropdown-content">
              <a href="#" id="BFS" onClick={handledropdownbutton}>
                Breadth-First-Search
              </a>
              <a href="#" id="DFS" onClick={handledropdownbutton}>
                Depth-First-Search
              </a>
              <a href="#" id="Bidirectional" onClick={handledropdownbutton}>
                Bidirectional Search
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        {
          /* Your component JSX goes here */
          <div className="board">
            <table className="table">
              <tbody>
                {Array.from({ length: numRows }, (_, y) => (
                  <tr key={y}>
                    {Array.from({ length: numCols }, (_, x) => {
                      let isStartNode =
                        x == startNode.startx && y == startNode.starty;
                      //  x === 4 && y === Math.ceil(numRows / 2) - 2;
                      let isEndNode = x == endNode.endx && y == endNode.endy;
                      // y === Math.ceil(numRows / 2) - 2 && x === numCols - 5;
                      return (
                        <td
                          key={`${x}-${y}`}
                          id={`${x}-${y}`}
                          className={
                            isStartNode
                              ? "startNode"
                              : isEndNode
                              ? "endNode"
                              : ""
                          }
                        ></td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
      {/* <div>
        <div id="snackbar"></div>
        <div id="openModal-about" className="modalDialog">
          <div>
            <a href="#close" title="Close" class="close">
              X
            </a>
            <h2>Tutorial</h2>
            <div className="content">
              <strong>Moving Start and End Nodes</strong>
              <p>Simply click and drag to move both start and end nodes.</p>
              <br />
              <strong>Drawing Walls</strong>
              <p>
                Simply click and move the mouse on the empty nodes (the white
                squares) to create walls on the grid, or alternatively simply
                just click the "Generate Random Maze" button.
              </p>
              <br />
              <strong>Removing Walls</strong>
              <p>
                Simply click on a wall to erase it. To erase multiple walls
                click on a wall and then drag the mouse while holding down the
                left click button on your mouse, or alternatively click "Clear
                Maze" to remove all walls.
              </p>

               <img src="../src/static/key.png" alt="Key"> 
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export { Board, clearPath };
