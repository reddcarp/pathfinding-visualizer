import React from "react";
import { NodeTrueType, PathfindingType } from "../../interfaces";
import Action from "./Action";

interface HeaderProps {
  handlePathfindingVisualization: (algo: PathfindingType) => void;
  handleClearPath: () => void;
  handleClearNodesByType: (nodeTypes: NodeTrueType[]) => void;
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
        <Action
          actionToPerform={() =>
            this.props.handlePathfindingVisualization("Dijkstra")
          }
          displayedName="Visualize Dijkstra"
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
          <Action actionToPerform={() => null} displayedName="Info" />
          <Action actionToPerform={() => null} displayedName="Help" />
        </div>
      </div>
    );
  }
}

export default Header;
