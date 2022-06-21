import { useState } from "react";
import { dijkstra } from "../../algorithms/dijkstra";
import {
  CoordType,
  NodeTrueType,
  NodeType,
  PathfindingType,
} from "../../interfaces";
import { constructNodesArray } from "./helper";

const usePathfinding = (rows: number, columns: number) => {
  const INITIAL_NODES_ROW = Math.floor(rows / 2);
  const INITIAL_START_NODE_COLUMN = Math.floor(columns / 5);
  const INITIAL_GOAL_NODE_COLUMN = Math.floor(
    columns - INITIAL_START_NODE_COLUMN - 1
  );

  const [startNode, setStartNode] = useState<NodeType>({
    coord: { row: INITIAL_NODES_ROW, column: INITIAL_START_NODE_COLUMN },
    distance: Infinity,
    type: "start",
    weight: 1,
  });
  const [goalNode, setGoalNode] = useState<NodeType>({
    coord: { row: INITIAL_NODES_ROW, column: INITIAL_GOAL_NODE_COLUMN },
    distance: Infinity,
    type: "goal",
    weight: 1,
  });
  const [nodes, setNodes] = useState<NodeType[][]>(
    constructNodesArray(rows, columns, startNode, goalNode)
  );

  const [selectedNodeType, setSelectedNodeType] =
    useState<NodeTrueType>("start");
  const [isMousePressed, setIsMousePressed] = useState(false);

  const handleSelectedNodeType = (type: NodeTrueType) => {
    setSelectedNodeType(type);
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
    if (selectedNodeType === "goal" || selectedNodeType === "start") {
      setIsMousePressed(false);
    } else {
      setIsMousePressed(true);
    }
  };
  const handleNodeChange = (coord: CoordType) => {
    const typeSplit = selectedNodeType.split("-");
    const weight = typeSplit[0] === "weight" ? parseInt(typeSplit[1]) : 1;

    setNodes((prev) => {
      let selectedNode = prev[coord.row][coord.column];
      let newNodes = [...prev];
      newNodes[coord.row][coord.column] = {
        coord: selectedNode.coord,
        distance: Infinity,
        type: selectedNodeType,
        weight: weight,
      };

      switch (selectedNodeType) {
        case "start":
          newNodes[startNode.coord.row][startNode.coord.column] = {
            coord: startNode.coord,
            distance: Infinity,
            type: "open",
            weight: startNode.weight,
          };
          setStartNode({
            coord: coord,
            distance: Infinity,
            type: selectedNodeType,
            weight: startNode.weight,
          });
          break;
        case "goal":
          newNodes[goalNode.coord.row][goalNode.coord.column] = {
            coord: goalNode.coord,
            distance: Infinity,
            type: "open",
            weight: goalNode.weight,
          };
          setGoalNode({
            coord: coord,
            distance: Infinity,
            type: selectedNodeType,
            weight: goalNode.weight,
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
            state: "visited",
            distance: Infinity,
            type: node.type,
            weight: node.weight,
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
              state: node.state,
              distance: Infinity,
              direction: node.direction,
              type: node.type,
              weight: node.weight,
            };
            return newNodes;
          });
        }, 50 * idx);
      });
    }, 10 * visitedNodesInOrder.length);
  };

  const handleClearPath = (callback?: any) => {
    setNodes((prev) => {
      const newNodes = [...prev];

      newNodes.forEach((row) => {
        row.forEach((node) => {
          if (node.state !== undefined) {
            newNodes[node.coord.row][node.coord.column] = {
              coord: node.coord,
              distance: Infinity,
              type: node.type,
              weight: node.weight,
            };
          }
        });
      });

      if (callback) callback();
      return newNodes;
    });
  };
  const launchAppropriateVisualization = (algo: PathfindingType) => {
    setTimeout(() => {
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
    }, 10);
  };
  const handlePathfindingVisualization = (algo: PathfindingType) => {
    handleClearPath(launchAppropriateVisualization(algo));
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    nodes,
    handleSelectedNodeType,
    selectedNodeType,
    handleClearPath,
    handlePathfindingVisualization,
  };
};

export default usePathfinding;
