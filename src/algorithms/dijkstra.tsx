import { copyNodes } from "../hooks/usePathfinding/helper";
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
    neighbor.previousNode = node;
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
  const newNodes = copyNodes(nodes);
  const visitedNodesInOrder: NodeType[] = [];
  const shortestPathNodesInOrder: NodeType[] = [];
  newNodes[startNode.coord.row][startNode.coord.column].distance = 0;
  const unvisitedNodes = getAllNodes(newNodes);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) break;

    // it's a wall, we can't go through it
    if (closestNode.state === "wall") continue;

    // nowhere to go
    if (closestNode.distance === Infinity) {
      break;
    }
    closestNode.state = "visited";
    visitedNodesInOrder.push(closestNode);

    if (
      closestNode.coord.row === goalNode.coord.row &&
      closestNode.coord.column === goalNode.coord.column
    ) {
      break;
    }
    updateUnvisitedNeighbors(closestNode, newNodes);
  }

  // creating the shortestPath array in order
  const lastNode = visitedNodesInOrder[visitedNodesInOrder.length - 1];
  if (
    lastNode &&
    lastNode.coord.row === goalNode.coord.row &&
    lastNode.coord.column === goalNode.coord.column
  ) {
    let currentNode: NodeType | undefined = lastNode;
    while (currentNode !== undefined) {
      shortestPathNodesInOrder.unshift(currentNode);

      let nextNode = currentNode;
      currentNode = currentNode.previousNode;

      // setting the direction of the node
      // ie: where it points to (it's father)
      if (currentNode)
        currentNode.direction = getDirection(currentNode, nextNode);
    }
  }

  return [visitedNodesInOrder, shortestPathNodesInOrder];
};

const getDirection = (from: NodeType, to: NodeType) => {
  if (from.coord.column < to.coord.column) return "right";
  if (from.coord.column > to.coord.column) return "left";
  if (from.coord.row < to.coord.row) return "down";
  return "up";
};

export { dijkstra };
