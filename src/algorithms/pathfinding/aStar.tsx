import { copyNodes } from "../../hooks/usePathfinding/helper";
import {
  Direction,
  NodeStateType,
  NodeTrueType,
  NodeType,
} from "../../interfaces";

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

// using the manhattan heuristic since we can only move
// up, down, left and right
const manhattanDistance = (node: NodeType, goalNode: NodeType) => {
  const h =
    Math.abs(node.coord.row - goalNode.coord.row) +
    Math.abs(node.coord.column - goalNode.coord.column);

  return h;
};

const updateUnvisitedNeighbors = (
  node: NodeType,
  nodes: NodeType[][],
  goalNode: NodeType,
  heuristic: (node: NodeType, goalNode: NodeType) => any
) => {
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
      neighbor.hvalue = heuristic(neighbor, goalNode);
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

const sortNodesByClosest = (unvisitedNodes: NodeType[]) => {
  unvisitedNodes.sort((a, b) => {
    // used to put the goal node at the beginning
    if (a.hvalue === 0) return -1;
    if (b.hvalue === 0) return 1;

    // case without a heuristic
    if (!a.hvalue || !b.hvalue) return a.distance - b.distance;

    if (a.hvalue + a.weight === b.hvalue + b.weight) {
      return a.distance - b.distance;
    }

    return a.hvalue + a.weight - (b.hvalue + b.weight);
  });
};

const _astar = (
  nodes: NodeType[][],
  startNode: NodeType,
  goalNode: NodeType,
  heuristic: (node: NodeType, goalNode: NodeType) => any
) => {
  const newNodes = copyNodes(nodes);
  const visitedNodesInOrder: NodeType[] = [];
  const shortestPathNodesInOrder: NodeType[] = [];
  newNodes[startNode.coord.row][startNode.coord.column].distance = 0;
  newNodes[startNode.coord.row][startNode.coord.column].direction = "right";
  const unvisitedNodes = getAllNodes(newNodes);

  while (unvisitedNodes.length > 0) {
    sortNodesByClosest(unvisitedNodes);
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
    updateUnvisitedNeighbors(closestNode, newNodes, goalNode, heuristic);
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

const aStar = (
  nodes: NodeType[][],
  startNode: NodeType,
  goalNode: NodeType
) => {
  return _astar(nodes, startNode, goalNode, manhattanDistance);
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

export { aStar, _astar };
