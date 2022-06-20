type NodeStateType = "open" | "visited" | "looking" | "start" | "goal";

interface CoordType {
  row: number;
  column: number;
}

interface NodeType {
  state: NodeStateType;
  coord: CoordType;
  distance: number;
}

type PathfindingType = "BFS" | "Dijkstra" | "A*" | "DFS";

export type { NodeStateType, NodeType, CoordType, PathfindingType };
