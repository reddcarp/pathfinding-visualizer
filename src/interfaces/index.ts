type NodeStateType =
  | "open"
  | "visited"
  | "start"
  | "goal"
  | "wall"
  | "shortest-path";

interface CoordType {
  row: number;
  column: number;
}

interface NodeType {
  state: NodeStateType;
  coord: CoordType;
  distance: number;
  previousNode?: NodeType;
}

type PathfindingType = "BFS" | "Dijkstra" | "A*" | "DFS";

export type { NodeStateType, NodeType, CoordType, PathfindingType };
