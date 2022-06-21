type NodeTrueType = "open" | "start" | "goal" | "wall";

type NodeStateType = "visited" | "shortest-path" | undefined;

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
