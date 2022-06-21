import React from "react";
import { PathfindingType } from "../../interfaces";

interface HeaderProps {
  handlePathfindingVisualization: (algo: PathfindingType) => void;
  handleClearPath: () => void;
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
      </div>
    );
  }
}

export default Header;
