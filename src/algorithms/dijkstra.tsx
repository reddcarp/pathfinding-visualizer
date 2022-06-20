import { NodeType } from "../interfaces";

const getAllNodes = (nodes: NodeType[][]) => {
  const unvisitedNodes: NodeType[] = [];

  nodes.forEach((row) => {
    row.forEach((node) => {
      unvisitedNodes.push(node);
    });
  });

  return unvisitedNodes;
};

const updateUnvisitedNeighbors = (node: NodeType, nodes: NodeType[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(nodes, node);
  unvisitedNeighbors.forEach((neighbor) => {
    neighbor.distance = node.distance + 1;
  });
};

const getUnvisitedNeighbors = (nodes: NodeType[][], node: NodeType) => {
  const neighbors: NodeType[] = [];
  const row = node.coord.row;
  const column = node.coord.column;

  if (row > 0) neighbors.push(nodes[row - 1][column]);
  if (row < nodes.length - 1) neighbors.push(nodes[row + 1][column]);
  if (column > 0) neighbors.push(nodes[row][column - 1]);
  if (column < nodes[0].length - 1) neighbors.push(nodes[row][column + 1]);

  return neighbors.filter((node) => node.state !== "visited");
};

const sortNodesByDistance = (unvisitedNodes: NodeType[]) => {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

const dijkstra = (
  nodes: NodeType[][],
  startNode: NodeType,
  goalNode: NodeType
) => {
  const visitedNodesInOrder: NodeType[] = [];
  nodes[startNode.coord.row][startNode.coord.column].distance = 0;
  const unvisitedNodes = getAllNodes(nodes);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) return visitedNodesInOrder;

    // nowhere to go
    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }
    closestNode.state = "visited";
    visitedNodesInOrder.push(closestNode);

    // TODO: make start and goal node pointer to nodes node
    if (
      closestNode.coord.row === goalNode.coord.row &&
      closestNode.coord.column === goalNode.coord.column
    ) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, nodes);
  }

  return visitedNodesInOrder;
};

export { dijkstra };
