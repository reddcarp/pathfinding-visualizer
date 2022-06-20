import { NodeType } from "../../interfaces";

const constructNodesRow = (row: number, columns: number) => {
  let rowArray = [];

  for (let i = 0; i < columns; i++) {
    let node: NodeType = {
      coord: { row: row, column: i },
      state: "open",
      distance: Infinity,
    };
    rowArray.push(node);
  }

  return rowArray;
};

const constructNodesArray = (
  rows: number,
  columns: number,
  startNode: NodeType,
  goalNode: NodeType
) => {
  let nodesArray = [];

  for (let i = 0; i < rows; i++) {
    let rowArray = constructNodesRow(i, columns);
    nodesArray.push(rowArray);
  }

  // setting up the starting node
  nodesArray[startNode.coord.row][startNode.coord.column].state = "start";
  // setting up the goal node
  nodesArray[goalNode.coord.row][goalNode.coord.column].state = "goal";

  return nodesArray;
};

export { constructNodesArray };
