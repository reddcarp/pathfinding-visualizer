import { useState } from "react";
import { dijkstra } from "../../algorithms/dijkstra";
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
    distance: Infinity,
  });
  const [goalNode, setGoalNode] = useState<NodeType>({
    coord: { row: 0, column: columns - 1 },
    state: "goal",
    distance: Infinity,
  });
  const [nodes, setNodes] = useState<NodeType[][]>(
    constructNodesArray(rows, columns, startNode, goalNode)
  );

  const [selectedState, setSlectedState] = useState<NodeStateType>("start");
  const [isMousePressed, setIsMousePressed] = useState(false);

  const handleSelectedStateChange = (state: NodeStateType) => {
    setSlectedState(state);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };
  const handleMouseEnter = (coord: CoordType) => {
    if (isMousePressed) {
      handleNodeChange(coord);
    }
  };
  const handleMouseDown = (coord: CoordType) => {
    handleNodeChange(coord);

    // we dont want the mousePressed behavior for the goal and start node
    if (selectedState === "goal" || selectedState === "start") {
      setIsMousePressed(false);
    } else {
      setIsMousePressed(true);
    }
  };

  const handleNodeChange = (coord: CoordType) => {
    setNodes((prev) => {
      let selectedNode = prev[coord.row][coord.column];
      let newNodes = [...prev];
      newNodes[coord.row][coord.column] = {
        coord: selectedNode.coord,
        state: selectedState,
        distance: Infinity,
      };

      switch (selectedState) {
        case "start":
          newNodes[startNode.coord.row][startNode.coord.column] = {
            coord: startNode.coord,
            state: "open",
            distance: Infinity,
          };
          setStartNode({
            coord: coord,
            state: selectedState,
            distance: Infinity,
          });
          break;
        case "goal":
          newNodes[goalNode.coord.row][goalNode.coord.column] = {
            coord: goalNode.coord,
            state: "open",
            distance: Infinity,
          };
          setGoalNode({
            coord: coord,
            state: selectedState,
            distance: Infinity,
          });
          break;
        default:
          break;
      }

      return newNodes;
    });
  };

  const animateDijkstra = (
    visitedNodesInOrder: NodeType[],
    shortestPathNodesInOrder: NodeType[]
  ) => {
    visitedNodesInOrder.forEach((node, idx) => {
      setTimeout(() => {
        setNodes((prev) => {
          let newNodes = [...prev];
          newNodes[node.coord.row][node.coord.column] = {
            coord: node.coord,
            state: node.state,
            distance: Infinity,
          };
          return newNodes;
        });
      }, 10 * idx);
    });

    // shortest path animation
    setTimeout(() => {
      shortestPathNodesInOrder.forEach((node, idx) => {
        setTimeout(() => {
          setNodes((prev) => {
            let newNodes = [...prev];
            newNodes[node.coord.row][node.coord.column] = {
              coord: node.coord,
              state: "shortest-path",
              distance: Infinity,
            };
            return newNodes;
          });
        }, 50 * idx);
      });
    }, 10 * visitedNodesInOrder.length);
  };

  const handlePathfindingVisualization = (algo: PathfindingType) => {
    switch (algo) {
      case "Dijkstra":
        const [visitedNodesInOrder, shortestPathNodesInOrder] = dijkstra(
          nodes,
          startNode,
          goalNode
        );
        animateDijkstra(visitedNodesInOrder, shortestPathNodesInOrder);
        break;
      default:
        break;
    }
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    nodes,
    handleSelectedStateChange,
    selectedState,
    handlePathfindingVisualization,
  };
};

export default usePathfinding;
