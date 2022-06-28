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
        <Action
          actionToPerform={() => this.props.handleClearPath()}
          displayedName="Clear Path"
        />
        <Action
          actionToPerform={() => this.props.handleClearNodesByType(["wall"])}
          displayedName="Clear walls"
        />
        <Action
          actionToPerform={() =>
            this.props.handleClearNodesByType([
              "weight-2",
              "weight-5",
              "weight-10",
            ])
          }
          displayedName="Clear weights"
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
