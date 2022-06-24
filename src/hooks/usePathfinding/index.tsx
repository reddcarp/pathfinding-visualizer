import { useState } from "react";
import { dijkstra } from "../../algorithms/dijkstra";
import { recursiveMazeGeneration } from "../../algorithms/maze";
import {
  CoordType,
  MazeType,
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
    // time during which the looking state is displayed
    let lookingTime = 5;
    // time between visited nodes' animation
    let animationTimeBetween = 5;
    // time between shortest path nodes' animation
    let shortestPathAnimationTimeBetween = 50;

    visitedNodesInOrder.forEach((node, idx) => {
      setTimeout(() => {
        setNodes((prev) => {
          let newNodes = [...prev];
          newNodes[node.coord.row][node.coord.column] = {
            coord: node.coord,
            state: "looking",
            distance: Infinity,
            type: node.type,
            weight: node.weight,
          };
          return newNodes;
        });
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
        }, lookingTime);
      }, (animationTimeBetween + lookingTime) * idx);
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
        }, shortestPathAnimationTimeBetween * idx);
      });
    }, (animationTimeBetween + lookingTime) * visitedNodesInOrder.length);
  };

  const handleClearNodesByType = (
    nodeTypes: NodeTrueType[],
    callback?: any
  ) => {
    setNodes((prev) => {
      const newNodes = [...prev];

      newNodes.forEach((row) => {
        row.forEach((node) => {
          if (nodeTypes.includes(node.type)) {
            newNodes[node.coord.row][node.coord.column] = {
              coord: node.coord,
              distance: Infinity,
              type: "open",
              weight: 1,
            };
          }
        });
      });

      if (callback) callback();
      return newNodes;
    });
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
  const handleClearAll = (callback?: any) => {
    handleClearPath(() =>
      handleClearNodesByType(
        ["wall", "weight-2", "weight-5", "weight-10"],
        () => {
          if (callback) callback();
        }
      )
    );
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

  const visualizeMazeGeneration = (mazeWallsInOrder: CoordType[]) => {
    handleClearAll(() => {
      const timeBetweenWalls = 10;

      mazeWallsInOrder.forEach((coord, idx) => {
        setTimeout(() => {
          setNodes((prev) => {
            let newNodes = [...prev];
            newNodes[coord.row][coord.column] = {
              coord: {
                column: coord.column,
                row: coord.row,
              },
              distance: Infinity,
              type: "wall",
              weight: 1,
            };
            return newNodes;
          });
        }, timeBetweenWalls * idx);
      });
    });
  };
  const launchMazeVisualization = (algo: MazeType) => {
    switch (algo) {
      case "Recursive-division":
        const mazeWallsInOrder = recursiveMazeGeneration(
          nodes,
          startNode,
          goalNode
        );
        visualizeMazeGeneration(mazeWallsInOrder);
        break;
      default:
        break;
    }
  };
  const handleGenerateMaze = (algo: MazeType) => {
    launchMazeVisualization(algo);
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
    handleClearNodesByType,
    handleGenerateMaze,
  };
};

export default usePathfinding;
