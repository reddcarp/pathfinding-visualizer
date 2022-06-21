import React from "react";
import { CoordType, NodeType } from "../../interfaces";
import Row from "./Row";

interface GridProps {
  nodes: NodeType[][];
  handleMouseDown: (coord: CoordType) => void;
  handleMouseEnter: (coord: CoordType) => void;
  handleMouseUp: () => void;
}

interface GridState {}

class Grid extends React.PureComponent<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
  }

  render() {
    return (
      <div id="grid-container">
        <div id="grid" onMouseLeave={(e) => this.props.handleMouseUp()}>
          {this.props.nodes.map((rowNodesArray, idx) => (
            <Row
              handleMouseDown={this.props.handleMouseDown}
              handleMouseUp={this.props.handleMouseUp}
              handleMouseEnter={this.props.handleMouseEnter}
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
