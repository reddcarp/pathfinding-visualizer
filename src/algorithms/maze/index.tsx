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
    2,
    nodes.length - 3,
    2,
    nodes[0].length - 3,
    "vertical",
    false,
    nodes[0].length,
    nodes.length
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
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: "horizontal" | "vertical",
  surroundingWalls: boolean,
  maxCol: number,
  maxRow: number
) => {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }

  if (!surroundingWalls) {
    // top row
    let row = 0;
    for (let col = 0; col < maxCol; col++) {
      wallsInOrder.push({ column: col, row: row });
    }

    // right col
    let col = maxCol - 1;
    for (row = 0; row < maxRow; row++) {
      wallsInOrder.push({ column: col, row: row });
    }

    // bottom row
    row = maxRow - 1;
    for (col = maxCol - 1; col >= 0; col--) {
      wallsInOrder.push({ column: col, row: row });
    }

    // left col
    col = 0;
    for (row = maxRow - 1; row >= 0; row--) {
      wallsInOrder.push({ column: col, row: row });
    }

    surroundingWalls = true;
  }

  // drawing the horizontal wall
  if (orientation === "horizontal") {
    let possibleRows: number[] = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }

    let possibleCols: number[] = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }

    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];

    drawHorizontalWall(
      wallsInOrder,
      currentRow,
      colRandom,
      colStart,
      colEnd,
      maxCol
    );

    if (currentRow - 2 - rowStart > colEnd - colStart) {
      _recursiveMazeGeneration(
        wallsInOrder,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        maxCol,
        maxRow
      );
    } else {
      _recursiveMazeGeneration(
        wallsInOrder,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        maxCol,
        maxRow
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      _recursiveMazeGeneration(
        wallsInOrder,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        maxCol,
        maxRow
      );
    } else {
      _recursiveMazeGeneration(
        wallsInOrder,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        maxCol,
        maxRow
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }

    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }

    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

    drawVerticalWall(
      wallsInOrder,
      currentCol,
      rowRandom,
      rowStart,
      rowEnd,
      maxRow
    );

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      _recursiveMazeGeneration(
        wallsInOrder,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        maxCol,
        maxRow
      );
    } else {
      _recursiveMazeGeneration(
        wallsInOrder,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
        maxCol,
        maxRow
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      _recursiveMazeGeneration(
        wallsInOrder,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        maxCol,
        maxRow
      );
    } else {
      _recursiveMazeGeneration(
        wallsInOrder,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        maxCol,
        maxRow
      );
    }
  }
};

const drawHorizontalWall = (
  wallsInOrder: CoordType[],
  wallIdx: number,
  pathIdx: number,
  colStart: number,
  colEnd: number,
  maxCol: number
) => {
  const trueColStart = colStart === 0 ? colStart : colStart - 1;
  const trueColEnd = colEnd === maxCol ? colEnd - 1 : colEnd + 1;

  for (let i = trueColStart; i <= trueColEnd; i++) {
    if (i === pathIdx) continue;
    wallsInOrder.push({ column: i, row: wallIdx });
  }
};

const drawVerticalWall = (
  wallsInOrder: CoordType[],
  wallIdx: number,
  pathIdx: number,
  rowStart: number,
  rowEnd: number,
  maxRow: number
) => {
  const trueRowStart = rowStart === 0 ? rowStart : rowStart - 1;
  const trueRowEnd = rowEnd === maxRow ? rowEnd - 1 : rowEnd + 1;

  for (let i = trueRowStart; i <= trueRowEnd; i++) {
    if (i === pathIdx) continue;
    wallsInOrder.push({ column: wallIdx, row: i });
  }
};

export { recursiveMazeGeneration };
