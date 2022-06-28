import { NodeType } from "../../interfaces";
import { _astar } from "./aStar";

const dijkstra = (
  nodes: NodeType[][],
  startNode: NodeType,
  goalNode: NodeType
) => {
  return _astar(nodes, startNode, goalNode, () => undefined);
};

export { dijkstra };
