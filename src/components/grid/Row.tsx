import React from "react";
import { CoordType, NodeType } from "../../interfaces";
import Node from "./Node";

interface RowProps {
  rowNodesArray: NodeType[];
  rowid: number;
  handleMouseDown: (coord: CoordType) => void;
  handleMouseEnter: (coord: CoordType) => void;
  handleMouseUp: () => void;
}

interface RowState {}

class Row extends React.PureComponent<RowProps, RowState> {
  constructor(props: RowProps) {
    super(props);
  }

  render() {
    return (
      <div id="row">
        {this.props.rowNodesArray.map((node, idx) => (
          <Node
            handleMouseDown={this.props.handleMouseDown}
            handleMouseUp={this.props.handleMouseUp}
            handleMouseEnter={this.props.handleMouseEnter}
            key={this.props.rowid + "," + idx}
            node={node}
          />
        ))}
      </div>
    );
  }
}

export default Row;
