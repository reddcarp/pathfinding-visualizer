import { useState } from "react";
import { CoordType } from "../../interfaces";
import { constructNodesArray } from "./helper";

const usePathfinding = (rows: number, columns: number) => {
  const [nodes, setNodes] = useState(constructNodesArray(rows, columns));

  const handleNodeChange = (coord: CoordType) => {
    setNodes((prev) => {
      let previousNode = prev[coord.row][coord.column];
      let newNodes = [...prev];
      newNodes[coord.row][coord.column] = {
        coord: previousNode.coord,
        state: "start",
      };
      return newNodes;
    });
  };

  return { handleNodeChange, nodes };
};

export default usePathfinding;
