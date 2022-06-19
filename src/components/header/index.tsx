import React from "react";
import { PathfindingType } from "../../interfaces";

interface HeaderProps {
  handlePathfindingVisualization: (algo: PathfindingType) => void;
}

interface HeaderState {}

class Header extends React.PureComponent<HeaderProps, HeaderState> {
  render() {
    return (
      <div id="header">
        <button
          onClick={() => this.props.handlePathfindingVisualization("Dijkstra")}
        >
          Launch function
        </button>
      </div>
    );
  }
}

export default Header;
