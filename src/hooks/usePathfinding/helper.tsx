import { NodeType } from "../../interfaces";

const constructNodesRow = (row: number, columns: number) => {
  let rowArray = [];

  for (let i = 0; i < columns; i++) {
    let node: NodeType = {
      coord: { row: row, column: i },
      distance: Infinity,
      type: "open",
      weight: 1,
    };
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

const copyNodes = (nodes: NodeType[][]) => {
  const newNodes: NodeType[][] = [];

  nodes.forEach((row) => {
    const newRow: NodeType[] = [];
    row.forEach((node) => {
      newRow.push({
        coord: node.coord,
        distance: node.distance,
        state: node.state,
        type: node.type,
        direction: node.direction,
        previousNode: node.previousNode,
        weight: node.weight,
      });
    });
    newNodes.push(newRow);
  });

  return newNodes;
};

export { constructNodesArray, copyNodes };
