import React from "react";
import { MazeType, NodeTrueType, PathfindingType } from "../../interfaces";
import Action from "./Action";
import MultiAction from "./MultiAction";

interface HeaderProps {
  handlePathfindingVisualization: (algo: PathfindingType) => void;
  handleClearPath: () => void;
  handleClearNodesByType: (nodeTypes: NodeTrueType[]) => void;
  handleGenerateMaze: (algo: MazeType) => void;
  handleSetShowTutorial: (state: boolean) => void;
  handleClearAll: () => void;
}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  shouldComponentUpdate(nextProps: HeaderProps) {
    return false;
  }

  render() {
    return (
      <div id="header">
        <b id="header-title">Pathfinding visualizer</b>
        <MultiAction
          name="Visualize"
          displayedNames={["Dijkstra", "A*"]}
          actionToPerform={[
            () => this.props.handlePathfindingVisualization("Dijkstra"),
            () => this.props.handlePathfindingVisualization("A*"),
          ]}
        />
        <Action
          actionToPerform={() =>
            this.props.handleGenerateMaze("Recursive-division")
          }
          displayedName="Generate Maze"
        />
        <MultiAction
          name="Clear"
          displayedNames={["Path", "Walls", "Weights", "All"]}
          actionToPerform={[
            () => this.props.handleClearPath(),
            () => this.props.handleClearNodesByType(["wall"]),
            () =>
              this.props.handleClearNodesByType([
                "weight-2",
                "weight-5",
                "weight-10",
              ]),
            () => this.props.handleClearAll(),
          ]}
        />

        <div id="header-end">
          <Action
            actionToPerform={() => this.props.handleSetShowTutorial(true)}
            displayedName="Help"
          />
        </div>
      </div>
    );
  }
}

export default Header;
