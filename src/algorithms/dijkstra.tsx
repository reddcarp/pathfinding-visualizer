import { copyNodes } from "../hooks/usePathfinding/helper";
import {
  Direction,
  NodeStateType,
  NodeTrueType,
  NodeType,
} from "../interfaces";

const getAllNodes = (nodes: NodeType[][]) => {
  const unvisitedNodes: NodeType[] = [];

  nodes.forEach((row) => {
    row.forEach((node) => {
      unvisitedNodes.push(node);
    });
  });

  return unvisitedNodes;
};

const getNodePositionRelativeToAnotherNode = (
  referenceNode: NodeType,
  node: NodeType
) => {
  const referenceCoord = referenceNode.coord;
  const coord = node.coord;

  if (coord.row > referenceCoord.row) return "down";
  if (coord.row < referenceCoord.row) return "up";
  if (coord.column > referenceCoord.column) return "right";
  if (coord.column < referenceCoord.column) return "left";
  return "right";
};

// turning 90° has a cost of 1
const getNeighborRotationDistance = (
  node: NodeType,
  neighborRelativePosition: Direction
) => {
  const direction = node.direction;
  // in front
  if (direction === neighborRelativePosition) return 0;
  if (direction === "up" || direction === "down") {
    // 90° rotation
    if (
      neighborRelativePosition === "right" ||
      neighborRelativePosition === "left"
    ) {
      return 1;
    }
    // 180° rotation
    return 2;
  }
  if (direction === "right" || direction === "left") {
    // 90° rotation
    if (
      neighborRelativePosition === "up" ||
      neighborRelativePosition === "down"
    ) {
      return 1;
    }
    // 180° rotation
    return 2;
  }
  return 0;
};

const updateUnvisitedNeighbors = (node: NodeType, nodes: NodeType[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(nodes, node);
  unvisitedNeighbors.forEach((neighbor) => {
    const neighborDirection: Direction = getNodePositionRelativeToAnotherNode(
      node,
      neighbor
    );
    // remove rotationDistance to remove cost of 90° rotations
    let tempDistance =
      node.distance +
      neighbor.weight +
      getNeighborRotationDistance(node, neighborDirection);
    if (tempDistance < neighbor.distance) {
      neighbor.distance = tempDistance;
      neighbor.previousNode = node;
      neighbor.direction = neighborDirection;
    }
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
  newNodes[startNode.coord.row][startNode.coord.column].direction = "right";
  const unvisitedNodes = getAllNodes(newNodes);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) break;

    // it's a wall, we can't go through it
    if (closestNode.type === "wall") continue;

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
      // not setting it if it is the goal node
      closestNode.direction = undefined;
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
      // setting the proper state
      currentNode.state = getShortestPathState(currentNode.type);

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

const getShortestPathState = (type: NodeTrueType): NodeStateType => {
  switch (type) {
    case "goal":
      return "shortest-path-special";
    case "start":
      return "shortest-path-special";
    case "weight-2":
      return "shortest-path-weight-2";
    case "weight-5":
      return "shortest-path-weight-5";
    case "weight-10":
      return "shortest-path-weight-10";
    default:
      return "shortest-path";
  }
};

const getDirection = (from: NodeType, to: NodeType) => {
  if (from.coord.column < to.coord.column) return "right";
  if (from.coord.column > to.coord.column) return "left";
  if (from.coord.row < to.coord.row) return "down";
  return "up";
};

export { dijkstra };
