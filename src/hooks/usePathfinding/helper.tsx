import { NodeType } from "../../interfaces";

const constructNodesRow = (row: number, columns: number) => {
  let rowArray = [];

  for (let i = 0; i < columns; i++) {
    let node: NodeType = { coord: { row: row, column: i }, state: "open" };
    rowArray.push(node);
  }

  return rowArray;
};

const constructNodesArray = (rows: number, columns: number) => {
  let nodesArray = [];

  for (let i = 0; i < rows; i++) {
    let rowArray = constructNodesRow(i, columns);
    nodesArray.push(rowArray);
  }

  return nodesArray;
};

export { constructNodesArray };
