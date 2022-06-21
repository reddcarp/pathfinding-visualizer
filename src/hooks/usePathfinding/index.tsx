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
  const [startNode, setStartNode] = useState<NodeType>({
    coord: { row: 0, column: 0 },
    distance: Infinity,
    type: "start",
  });
  const [goalNode, setGoalNode] = useState<NodeType>({
    coord: { row: 0, column: columns - 1 },
    distance: Infinity,
    type: "goal",
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
    setNodes((prev) => {
      let selectedNode = prev[coord.row][coord.column];
      let newNodes = [...prev];
      newNodes[coord.row][coord.column] = {
        coord: selectedNode.coord,
        distance: Infinity,
        type: selectedNodeType,
      };

      switch (selectedNodeType) {
        case "start":
          newNodes[startNode.coord.row][startNode.coord.column] = {
            coord: startNode.coord,
            distance: Infinity,
            type: "open",
          };
          setStartNode({
            coord: coord,
            distance: Infinity,
            type: selectedNodeType,
          });
          break;
        case "goal":
          newNodes[goalNode.coord.row][goalNode.coord.column] = {
            coord: goalNode.coord,
            distance: Infinity,
            type: "open",
          };
          setGoalNode({
            coord: coord,
            distance: Infinity,
            type: selectedNodeType,
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
              direction: node.direction,
              type: node.type,
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
    handleSelectedNodeType,
    selectedNodeType,
    handlePathfindingVisualization,
  };
};

export default usePathfinding;
