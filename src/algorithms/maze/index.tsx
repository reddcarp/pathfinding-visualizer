import { CoordType, NodeType } from "../../interfaces";

// TODO: JUST PASS the colum and row values
const recursiveMazeGeneration = (
  nodes: NodeType[][],
  startNode: NodeType,
  goalNode: NodeType
) => {
  const wallsInOrder: CoordType[] = [];
  _recursiveMazeGeneration(
    wallsInOrder,
    { row: nodes.length, column: nodes[0].length },
    { row: 0, column: 0 }
  );
  return wallsInOrder.filter((coord) => {
    if (
      coord.column === startNode.coord.column &&
      coord.row === startNode.coord.row
    )
      return false;
    else if (
      coord.column === goalNode.coord.column &&
      coord.row === goalNode.coord.row
    )
      return false;
    return true;
  });
};

const _recursiveMazeGeneration = (
  wallsInOrder: CoordType[],
  boxSize: CoordType,
  offset: CoordType
) => {
  const row = boxSize.row;
  const column = boxSize.column;

  // can't place a whale if there is only 2 nodes of width
  // that would mean two walls back to back
  if (row < 2 || column < 2) return;

  const isHorizontal = determineIsHorizontal(column, row);
  // const isHorizontal = false;

  // starting coord of where the wall will be drawn from
  const wallCoord = { column: offset.column, row: offset.row };
  if (isHorizontal) wallCoord.row += randomInRange(0, row - 1);
  else wallCoord.column += randomInRange(0, column - 1);

  const holeCoord: CoordType = { column: wallCoord.column, row: wallCoord.row };
  if (isHorizontal) holeCoord.column += randomInRange(0, column - 1);
  else holeCoord.row += randomInRange(0, row - 1);

  const dir = isHorizontal ? 1 : 2;

  const wallLength = isHorizontal ? column : row;
  const drawDirection = isHorizontal
    ? { column: 1, row: 0 }
    : { column: 0, row: 1 };

  buildWall(wallsInOrder, wallCoord, drawDirection, wallLength, holeCoord);

  // first recursion (top/left portion)
  let newOffset = { column: offset.column, row: offset.row };
  let newBoxSize = isHorizontal
    ? { column: column, row: wallCoord.row - (offset.row + 1) }
    : { column: wallCoord.column - (offset.column + 1), row: row };
  _recursiveMazeGeneration(wallsInOrder, newBoxSize, newOffset);

  // second recursion(bottom/right portion)
  newOffset = isHorizontal
    ? { column: offset.column, row: wallCoord.row + 1 }
    : { column: wallCoord.column + 1, row: offset.row };
  newBoxSize = isHorizontal
    ? { column: column, row: offset.row + row - wallCoord.row - 1 }
    : { column: offset.column + column - wallCoord.column - 1, row: row };
  _recursiveMazeGeneration(wallsInOrder, newBoxSize, newOffset);
};

const determineIsHorizontal = (column: number, row: number) => {
  if (column < row) return true;
  else if (row < column) return false;
  return Math.random() > 0.5;
};

const randomInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const buildWall = (
  wallsInOrder: CoordType[],
  wallCoord: CoordType,
  drawDirection: CoordType,
  wallLength: number,
  holeCoord: CoordType
) => {
  for (let i = 0; i < wallLength; i++) {
    // we skip where the hole is supposed to be
    if (
      wallCoord.column === holeCoord.column &&
      wallCoord.row === holeCoord.row
    ) {
      wallCoord = {
        column: wallCoord.column + drawDirection.column,
        row: wallCoord.row + drawDirection.row,
      };
      continue;
    }

    wallsInOrder.push(wallCoord);
    wallCoord = {
      column: wallCoord.column + drawDirection.column,
      row: wallCoord.row + drawDirection.row,
    };
  }
};

export { recursiveMazeGeneration };
