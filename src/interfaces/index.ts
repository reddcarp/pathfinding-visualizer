type NodeStateType = "open" | "visited" | "looking" | "start" | "goal";

interface CoordType {
  row: number;
  column: number;
}

interface NodeType {
  state: NodeStateType;
  coord: CoordType;
}

export type { NodeStateType, NodeType, CoordType };
