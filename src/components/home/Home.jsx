import React from "react";
import { useState, useEffect } from "react";
import { Board } from "../board/Board";
import BFS from "../../pathfinding/BFS";
import "./home.css";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
  );
  const [windowHeight, setWindowHeight] = useState(
    window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  );
  const [searching, setSearching] = useState(false);
  const [numRows, setNumRows] = useState(Math.floor((windowHeight - 50) / 30));
  const [numCols, setNumCols] = useState(Math.floor(windowWidth / 30));
  const initialGrid = Array.from({ length: numCols }, () =>
    Array.from({ length: numRows }, () => 0)
  );
  const [grid, setGrid] = useState(initialGrid);
  /*var x1, x2, y1, y2;
  x1 = 4;
  y1 === Math.ceil(numRows / 2) - 2;
  y2 === Math.ceil(numRows / 2) - 2;
  x2 === numCols - 5;
  document.getElementById(`${x1}-${y1}`).classList.toggle("startNode");
  document.getElementById(`${x2}-${y2}`).classList.toggle("endNode");*/

  useEffect(() => {
    function handleResize() {
      setWindowWidth(
        window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
      );
      setWindowHeight(
        window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
      );
      setNumRows(Math.ceil((windowHeight - 45) / 30));
      setNumCols(Math.ceil(windowWidth / 30));
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, windowHeight]);

  return (
    <div>
      <Board
        grid={grid}
        setGrid={setGrid}
        numRows={numRows}
        numCols={numCols}
        searching={searching}
        setSearching={setSearching}
      />
      {/* <BFS
        getStartNode={getStartNode}
        getEndNode={getEndNode}
        GridValue={GridValue}
        GridVisited={GridVisited}
        drawPath={drawPath}
        drawOperations={drawOperations}
        numRows={numRows}
        numCols={numCols}
      /> */}
    </div>
  );
};

export default Home;
