import { useState } from "react";
import { dijkstra } from "../../components/algorithms/dijkstra";
import {
  CoordType,
  NodeStateType,
  NodeType,
  PathfindingType,
} from "../../interfaces";
import { constructNodesArray } from "./helper";

const usePathfinding = (rows: number, columns: number) => {
  const [startNode, setStartNode] = useState<NodeType>({
    coord: { row: 0, column: 0 },
    state: "start",
  });
  const [goalNode, setGoalNode] = useState<NodeType>({
    coord: { row: 0, column: columns - 1 },
    state: "goal",
  });
  const [nodes, setNodes] = useState<NodeType[][]>(
    constructNodesArray(rows, columns, startNode, goalNode)
  );

  const [selectedState, setSlectedState] = useState<NodeStateType>("start");

  const handleSelectedStateChange = (state: NodeStateType) => {
    setSlectedState(state);
  };

  const handleNodeChange = (coord: CoordType) => {
    setNodes((prev) => {
      let selectedNode = prev[coord.row][coord.column];
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
        case "goal":
          newNodes[goalNode.coord.row][goalNode.coord.column] = {
            coord: goalNode.coord,
            state: "open",
          };
          setGoalNode({ coord: coord, state: selectedState });
          break;
        default:
          break;
      }

      return newNodes;
    });
  };

  const animateDijkstra = (visitedNodesInOrder: NodeType[]) => {};

  const handlePathfindingVisualization = (algo: PathfindingType) => {
    console.log("visualizing + " + algo);
    switch (algo) {
      case "Dijkstra":
        const visitedNodesInOrder = dijkstra();
        animateDijkstra(visitedNodesInOrder);
        break;
      default:
        break;
    }
  };

  return {
    handleNodeChange,
    nodes,
    handleSelectedStateChange,
    selectedState,
    handlePathfindingVisualization,
  };
};

export default usePathfinding;
