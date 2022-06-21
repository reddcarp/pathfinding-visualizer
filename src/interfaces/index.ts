type NodeTrueType =
  | "open"
  | "start"
  | "goal"
  | "wall"
  | "weight-2"
  | "weight-5"
  | "weight-10"
  | "none";

type NodeStateType =
  | "visited"
  | "shortest-path"
  | "shortest-path-special"
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
}

type PathfindingType = "BFS" | "Dijkstra" | "A*" | "DFS";

export type {
  NodeStateType,
  NodeType,
  CoordType,
  PathfindingType,
  NodeTrueType,
};
