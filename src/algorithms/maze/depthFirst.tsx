import { copyNodes } from "../../hooks/usePathfinding/helper";
import { CoordType, NodeType } from "../../interfaces";

const initNodesArrayAllWalls = (nodes: NodeType[][]) => {
  for (let row = 1; row < nodes.length - 1; row += 2) {
    for (let col = 1; col < nodes[0].length - 1; col += 2) {
      // if (nodes[row][col].type !== "start" && nodes[row][col].type !== "goal")
      nodes[row][col].type = "wall";
    }
  }
};

const getNext = (
  current: CoordType,
  dist: number,
  cols: number,
  rows: number,
  nodes: NodeType[][]
) => {
  const neighbors = 4;

  const top: CoordType = { row: current.row - dist, column: current.column };
  const bottom: CoordType = { row: current.row + dist, column: current.column };
  const right: CoordType = { row: current.row, column: current.column + dist };
  const left: CoordType = { row: current.row, column: current.column - dist };

  const possibleNodes: CoordType[] = [top, bottom, left, right];
  const goodIndices: any[] = [Array(neighbors)];
  let nGood = 0;

  for (let i = 0; i < neighbors; i++) {
    const n = possibleNodes[i];
    const good =
      n.row >= 0 &&
      n.row < rows &&
      n.column >= 0 &&
      n.column < cols &&
      nodes[n.row][n.column].type === "wall";
    goodIndices[i] = good;
    if (good) nGood++;
  }

  if (nGood === 0) return null;

  let rand = Math.floor(Math.random() * neighbors);
  while (!goodIndices[rand]) {
    rand = Math.floor(Math.random() * neighbors);
  }

  return possibleNodes[rand];
};

const depthFirstMazeGeneration = (
  nodes: NodeType[][],
  startNode: NodeType,
  goalNode: NodeType
) => {
  const cols = nodes[0].length;
  const rows = nodes.length;
  const pathsInOrder: CoordType[] = [];
  const localNodes = copyNodes(nodes);
  initNodesArrayAllWalls(localNodes);

  let current: CoordType | undefined;
  let next: CoordType | null;
  let history: CoordType[] = [];

  let nToVisit = ((cols - 1) * (rows - 1)) / 4;
  let nVisited = 1;

  current = { column: 0 + 1, row: 1 };
  localNodes[current.row][current.column].type = "open";
  pathsInOrder.push(current);

  while (nVisited < nToVisit) {
    if (!current) return pathsInOrder;
    next = getNext(current, 2, cols, rows, localNodes);
    if (next) {
      const nCol = (current.column + next.column) / 2;
      const nRow = (current.row + next.row) / 2;
      localNodes[nRow][nCol].type = "open";

      history.unshift(current);
      current = next;
      pathsInOrder.push({ column: nCol, row: nRow });
      pathsInOrder.push(current);
      localNodes[current.row][current.column].type = "open";

      nVisited++;
    } else if (history.length > 0) {
      current = history.shift();
    }
  }

  return pathsInOrder.filter((coord) => {
    if (
      coord.row === startNode.coord.row &&
      coord.column === startNode.coord.column
    )
      return false;
    if (
      coord.row === goalNode.coord.row &&
      coord.column === goalNode.coord.column
    )
      return false;
    return true;
  });
};

export { depthFirstMazeGeneration };
