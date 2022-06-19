import { useState } from "react";
import { CoordType, NodeStateType, NodeType } from "../../interfaces";
import { constructNodesArray } from "./helper";

const usePathfinding = (rows: number, columns: number) => {
  const [startNode, setStartNode]: [NodeType, any] = useState({
    coord: { row: 0, column: 0 },
    state: "start",
  });
  const [nodes, setNodes] = useState(
    constructNodesArray(rows, columns, startNode)
  );

  const handleNodeChange = (coord: CoordType, state: NodeStateType) => {
    setNodes((prev) => {
      let previousNode = prev[coord.row][coord.column];
      let newNodes = [...prev];
      newNodes[coord.row][coord.column] = {
        coord: previousNode.coord,
        state: "start",
      };

      switch (state) {
        case "start":
          newNodes[startNode.coord.row][startNode.coord.column] = {
            coord: startNode.coord,
            state: "open",
          };
          setStartNode({ coord: coord, state: state });
          break;
        default:
          break;
      }

      return newNodes;
    });
  };

  return { handleNodeChange, nodes };
};

export default usePathfinding;
