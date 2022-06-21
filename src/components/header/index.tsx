import React from "react";
import { NodeTrueType, PathfindingType } from "../../interfaces";

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
        <button
          onClick={() => this.props.handlePathfindingVisualization("Dijkstra")}
        >
          Launch function
        </button>
        <button onClick={() => this.props.handleClearPath()}>Clear path</button>
        <button onClick={() => this.props.handleClearNodesByType(["wall"])}>
          Clear walls
        </button>
        <button
          onClick={() =>
            this.props.handleClearNodesByType([
              "weight-2",
              "weight-5",
              "weight-10",
            ])
          }
        >
          Clear weights
        </button>
      </div>
    );
  }
}

export default Header;
