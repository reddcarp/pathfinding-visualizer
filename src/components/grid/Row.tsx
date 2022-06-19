import React from "react";
import { CoordType, NodeType } from "../../interfaces";
import Node from "./Node";

interface RowProps {
  rowNodesArray: NodeType[];
  rowid: number;
  handleNodeChange: (coord: CoordType) => void;
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
            handleNodeChange={this.props.handleNodeChange}
            key={this.props.rowid + "," + idx}
            node={node}
          />
        ))}
      </div>
    );
  }
}

export default Row;
