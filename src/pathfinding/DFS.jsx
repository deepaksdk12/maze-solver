const DFSAlgo = ({
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
}) => {
  const findPathDFS = (startNode, endNode) => {
    let operationCount = 0;
    let stack = [];
    let path = [];

    stack.push(startNode);

    while (stack.length > 0) {
      path.push(stack.pop());
      let vertex = path[path.length - 1];
      let operations = [];
      operationCount++;
      operations.push([vertex[0], vertex[1]]);

      let neighbours = [
        [vertex[0] - 1, vertex[1]],
        [vertex[0], vertex[1] - 1],
        [vertex[0] + 1, vertex[1]],
        [vertex[0], vertex[1] + 1],
      ];

      for (let i = 0; i < neighbours.length; i++) {
        if (
          neighbours[i][0] === endNode[0] &&
          neighbours[i][1] === endNode[1]
        ) {
          drawOperations([vertex], operationCount);
          return [path.concat([endNode]), operationCount];
        }

        if (
          neighbours[i][0] < 0 ||
          neighbours[i][0] >= numCols ||
          neighbours[i][1] < 0 ||
          neighbours[i][1] >= numRows ||
          GridValue([neighbours[i][0], neighbours[i][1]]) !== 0
        ) {
          continue;
        }

        if (GridValue([vertex[0], vertex[1]]) === 0) {
          GridVisited([vertex[0], vertex[1]]);
        }

        stack.push(neighbours[i]);
      }

      drawOperations(operations, operationCount);
    }

    return [[], operationCount];
  };
  // board.clearPath();
  // board.setSearchingTrue();
  setSearching(true);
  clearPath();
  const curStartNode = [startNode.startx, startNode.starty];
  const curEndNode = [endNode.endx, endNode.endy];

  if (!curStartNode || !curEndNode) {
    showNotification(true, "You must first declare a start and end node");
  } else {
    const path = findPathDFS(curStartNode, curEndNode);
    if (path[0].length > 0) {
      drawPath(path[0], path[1]);
    } else {
      setTimeout(function () {
        // board.setSearchingFalse();
        setSearching(false);
        showNotification(true, "No path found");
      }, path[1] * 10);
    }
  }
};
export { DFSAlgo };
