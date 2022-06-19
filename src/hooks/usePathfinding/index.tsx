import { useState } from "react";
import { CoordType, NodeStateType, NodeType } from "../../interfaces";
import { constructNodesArray } from "./helper";

const usePathfinding = (rows: number, columns: number) => {
  const [startNode, setStartNode]: [NodeType, any] = useState({
    coord: { row: 0, column: 0 },
    state: "start",
  });
  const [goalNode, setGoalNode]: [NodeType, any] = useState({
    coord: { row: 0, column: columns - 1 },
    state: "goal",
  });
  const [nodes, setNodes] = useState(
    constructNodesArray(rows, columns, startNode, goalNode)
  );

  const [selectedState, setSlectedState]: [NodeStateType, any] =
    useState("start");

  const handleSelectedStateChange = (state: NodeStateType) => {
    setSlectedState(state);
  };

  const handleNodeChange = (coord: CoordType) => {
    setNodes((prev) => {
      console.log(
        "handleNodeChange called from " + coord.row + "," + coord.column
      );
      let selectedNode = prev[coord.row][coord.column];
      if (selectedNode.state === "start") {
        return prev;
      }
      let newNodes = [...prev];
      newNodes[coord.row][coord.column] = {
        coord: selectedNode.coord,
        state: selectedState,
      };

      switch (selectedState) {
        case "start":
          newNodes[startNode.coord.row][startNode.coord.column] = {
            coord: startNode.coord,
            state: "open",
          };
          setStartNode({ coord: coord, state: selectedState });
          break;
        default:
          break;
      }

      return newNodes;
    });
  };

  return { handleNodeChange, nodes, handleSelectedStateChange };
};

export default usePathfinding;