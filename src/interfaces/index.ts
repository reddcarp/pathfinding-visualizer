type NodeTrueType =
  | "open"
  | "start"
  | "goal"
  | "wall"
  | "weight-2"
  | "weight-5"
  | "weight-10";

type NodeStateType =
  | "visited"
  | "shortest-path"
  | "shortest-path-special"
  | "shortest-path-weight-2"
  | "shortest-path-weight-5"
  | "shortest-path-weight-10"
  | "looking"
  | undefined;

type Direction = "up" | "down" | "left" | "right";

interface CoordType {
  row: number;
  column: number;
}

interface NodeType {
  state?: NodeStateType;
  coord: CoordType;
  distance: number;
  previousNode?: NodeType;
  direction?: Direction;
  type: NodeTrueType;
  weight: number;
}

type PathfindingType = "BFS" | "Dijkstra" | "A*" | "DFS";
type MazeType = "Recursive-division";

export type {
  NodeStateType,
  NodeType,
  CoordType,
  PathfindingType,
  NodeTrueType,
  MazeType,
  Direction,
};
