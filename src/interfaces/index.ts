type NodeStateType =
  | "open"
  | "visited"
  | "start"
  | "goal"
  | "wall"
  | "shortest-path";

type Direction = "up" | "down" | "left" | "right";

interface CoordType {
  row: number;
  column: number;
}

interface NodeType {
  state: NodeStateType;
  coord: CoordType;
  distance: number;
  previousNode?: NodeType;
  direction?: Direction;
}

type PathfindingType = "BFS" | "Dijkstra" | "A*" | "DFS";

export type { NodeStateType, NodeType, CoordType, PathfindingType };
