const BFSAlgo = ({
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
  // board.clearPath();
  //board.setSearchingTrue();
  setSearching(true);
  clearPath();

  const findPathBFS = (start, end) => {
    let operationCount = 0;
    let queue = [];
    queue.push([start]);

    while (queue.length > 0) {
      let path = queue.shift();
      let pos = path[path.length - 1];

      let direction = [
        [pos[0] + 1, pos[1]],
        [pos[0], pos[1] + 1],
        [pos[0] - 1, pos[1]],
        [pos[0], pos[1] - 1],
      ];

      let operations = [];

      for (let i = 0; i < direction.length; i++) {
        if (direction[i][0] === end[0] && direction[i][1] === end[1]) {
          return [path.concat([end]), operationCount];
        }

        if (
          direction[i][0] < 0 ||
          direction[i][0] >= numCols ||
          direction[i][1] < 0 ||
          direction[i][1] >= numRows ||
          GridValue([direction[i][0], direction[i][1]]) !== 0
        ) {
          continue;
        }

        GridVisited([direction[i][0], direction[i][1]]);
        operations.push([direction[i][0], direction[i][1]]);
        operationCount++;
        queue.push(path.concat([direction[i]]));
      }

      drawOperations(operations, operationCount);
    }

    return [[], operationCount];
  };

  const curStartNode = [startNode.startx, startNode.starty];
  const curEndNode = [endNode.endx, endNode.endy];

  if (!curStartNode || !curEndNode) {
    showNotification(true, "You must first declare a start and end node");
  } else {
    const path = findPathBFS(curStartNode, curEndNode);
    if (path[0].length > 0) {
      drawPath(path[0], path[1]);
    }
    setTimeout(function () {
      if (path[0].length === 0) {
        //   board.setSearchingFalse();
        setSearching(false);
        showNotification(true, "No path found");
      }
    }, path[1] * 10);
  }
};

export { BFSAlgo };
