import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { aStar } from "../../algorithms/pathfinding/aStar";
import { dijkstra } from "../../algorithms/pathfinding/dijkstra";
import { recursiveMazeGeneration } from "../../algorithms/maze";
import {
  CoordType,
  MazeType,
  NodeTrueType,
  NodeType,
  PathfindingType,
} from "../../interfaces";
import { useGridData } from "./useGridData";
import { constructNodesArray } from "./helper";

const usePathfinding = () => {
  const { initialNodes, rows, columns } = useGridData();

  const [startNode, setStartNode] = useState<NodeType>({
    coord: { row: Math.floor(rows / 2), column: Math.floor(columns / 5) },
    distance: Infinity,
    type: "start",
    weight: 1,
  });
  const [goalNode, setGoalNode] = useState<NodeType>({
    coord: { row: Math.floor(rows / 2), column: Math.floor(columns * (4 / 5)) },
    distance: Infinity,
    type: "goal",
    weight: 1,
  });
  const [nodes, setNodes] = useState<NodeType[][]>(initialNodes);

  useEffect(() => {
    const newStartNode: NodeType = {
      coord: { row: Math.floor(rows / 2), column: Math.floor(columns / 5) },
      distance: Infinity,
      type: "start",
      weight: 1,
    };
    setStartNode(() => newStartNode);

    const newGoalNode: NodeType = {
      coord: {
        row: Math.floor(rows / 2),
        column: Math.floor(columns * (4 / 5)),
      },
      distance: Infinity,
      type: "goal",
      weight: 1,
    };
    setGoalNode(() => newGoalNode);

    setNodes(() => {
      const newNodes = constructNodesArray(rows, columns);
      newNodes[newStartNode.coord.row][newStartNode.coord.column].type =
        "start";
      newNodes[newGoalNode.coord.row][newGoalNode.coord.column].type = "goal";
      return newNodes;
    });
  }, [rows, columns]);

  const [selectedNodeType, setSelectedNodeType] =
    useState<NodeTrueType>("start");
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isAnimationProcessing, setIsAnimationProcessing] = useState(false);
  const [showTutorial, setShowTutorial] = useCookies(["showTutorial"]);

  const handleSetShowTutorial = (state: boolean) => {
    if (state === false) {
      const currentDate = new Date();
      const tenYears = new Date(currentDate.getFullYear() + 10, 1, 1);
      setShowTutorial("showTutorial", "false", {
        path: "/",
        expires: tenYears,
      });
    } else {
      setShowTutorial("showTutorial", "true", { path: "/" });
    }
  };

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
    if (isAnimationProcessing) return;
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

  const animatePathfinding = (
    visitedNodesInOrder: NodeType[],
    shortestPathNodesInOrder: NodeType[]
  ) => {
    // time during which the looking state is displayed
    let lookingTime = 10;
    // time between visited nodes' animation
    let animationTimeBetween = 10;
    // time between shortest path nodes' animation
    let shortestPathAnimationTimeBetween = 25;

    // search animation
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

    // animation done
    setTimeout(
      () => setIsAnimationProcessing(false),
      (animationTimeBetween + lookingTime) * visitedNodesInOrder.length +
        shortestPathAnimationTimeBetween * shortestPathNodesInOrder.length
    );
  };

  const handleClearNodesByType = (
    nodeTypes: NodeTrueType[],
    callback?: any
  ) => {
    if (isAnimationProcessing) return;
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
    if (isAnimationProcessing) return;
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
    if (isAnimationProcessing) return;
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
      setIsAnimationProcessing(true);
      let visitedNodesInOrder, shortestPathNodesInOrder;
      switch (algo) {
        case "Dijkstra":
          [visitedNodesInOrder, shortestPathNodesInOrder] = dijkstra(
            nodes,
            startNode,
            goalNode
          );
          animatePathfinding(visitedNodesInOrder, shortestPathNodesInOrder);
          break;
        case "A*":
          [visitedNodesInOrder, shortestPathNodesInOrder] = aStar(
            nodes,
            startNode,
            goalNode
          );
          animatePathfinding(visitedNodesInOrder, shortestPathNodesInOrder);
          break;
        default:
          break;
      }
    }, 10);
  };
  const handlePathfindingVisualization = (algo: PathfindingType) => {
    if (isAnimationProcessing) return;
    handleClearPath(launchAppropriateVisualization(algo));
  };

  const visualizeMazeGeneration = (mazeWallsInOrder: CoordType[]) => {
    handleClearAll(() => {
      setIsAnimationProcessing(true);
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

      // animation done
      setTimeout(
        () => setIsAnimationProcessing(false),
        timeBetweenWalls * mazeWallsInOrder.length
      );
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
    if (isAnimationProcessing) return;
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
    handleClearAll,
    handlePathfindingVisualization,
    handleClearNodesByType,
    handleGenerateMaze,
    isAnimationProcessing,
    showTutorial,
    handleSetShowTutorial,
  };
};

export default usePathfinding;
