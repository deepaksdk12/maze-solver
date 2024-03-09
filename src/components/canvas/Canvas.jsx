// import React, { useState } from "react";
// import {
//   kruskal,
//   primJarnik,
//   boruvka,
//   dfs,
//   bfs,
//   dijkstra,
//   astar,
//   bidirectionalSearch,
// } from "./mazeFunctions"; // Import your maze generation and solving functions here

// const Canvas = () => {
//   const [mstEdges, setMstEdges] = useState([]);
//   const [startVertex, setStartVertex] = useState(-1);
//   const [endVertex, setEndVertex] = useState(-1);
//   const [nodeDimensions, setNodeDimensions] = useState(
//     (0.8 * window.innerWidth) / (2 * 50 - 1)
//   ); // Assuming 50 as the default width, you may adjust this value
//   const [errorMessage, setErrorMessage] = useState("");
//   const [startPosX, setStartPosX] = useState(0.1 * window.innerWidth);
//   const [startPosY, setStartPosY] = useState(0.15 * window.innerHeight);
//   const sizeSliderRef = useRef(null);

//   const width = 50;
//   const height = 25;
//   let graph = null;
//   let maze = null;
//   let mazeGenerationFunctions = new Map();
//   mazeGenerationFunctions.set("kruskal", kruskal);
//   mazeGenerationFunctions.set("prim-jarnik", primJarnik);
//   mazeGenerationFunctions.set("boruvka", boruvka);
//   let mazeSolvingFunctions = new Map();
//   mazeGenerationFunctions.set("dfs", dfs);
//   mazeGenerationFunctions.set("bfs", bfs);
//   mazeGenerationFunctions.set("dijkstra", dijkstra);
//   mazeGenerationFunctions.set("astar", astar);
//   mazeGenerationFunctions.set("bidirectionalSearch", bidirectionalSearch);
//   // const startPosX = 0.1 * window.innerWidth;
//   //const startPosY = 0.15 * window.innerHeight;
//   let generatedMaze = false;

//   const updateNodeDimensions = () => {
//     const silderRect = sizeSliderRef.current.getBoundingClientRect(); // Assuming sizeSliderRef is a ref created using useRef
//     const newStartPosX = 0.1 * window.innerWidth;
//     const newStartPosY = Math.max(
//       0.15 * window.innerHeight,
//       80 + (silderRect.top + silderRect.height)
//     );
//     setStartPosX(newStartPosX);
//     setStartPosY(newStartPosY);
//     setNodeDimensions((0.8 * window.innerWidth) / (2 * width - 1));
//   };
//   const generateMaze = () => {
//     // Your generateMaze function logic here
//   };

//   const solveMaze = () => {
//     // Your solveMaze function logic here
//   };

//   const mazeClickHandler = () => {
//     // Your mazeClickHandler function logic here
//   };

//   const mazeSizeChanged = () => {
//     // Your mazeSizeChanged function logic here
//   };

//   return <div>{/* Your canvas rendering logic here */}</div>;
// };

// export default Canvas;
