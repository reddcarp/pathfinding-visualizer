import React from "react";
import { CoordType, NodeStateType, NodeType } from "../../interfaces";
import Row from "./Row";

interface GridProps {
  nodes: NodeType[][];
  handleNodeChange: (coord: CoordType, state: NodeStateType) => void;
}

interface GridState {}

class Grid extends React.PureComponent<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
  }

  render() {
    return (
      <div id="grid-container">
        <div id="grid">
          {this.props.nodes.map((rowNodesArray, idx) => (
            <Row
              handleNodeChange={this.props.handleNodeChange}
              key={idx}
              rowid={idx}
              rowNodesArray={rowNodesArray}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Grid;
