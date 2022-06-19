import React from "react";
import { CoordType, NodeType } from "../../interfaces";

interface NodeProps {
  node: NodeType;
  handleNodeChange: (coord: CoordType) => void;
}

interface NodeState {}

class Node extends React.Component<NodeProps, NodeState> {
  constructor(props: NodeProps) {
    super(props);
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.props.handleNodeChange(this.props.node.coord);
  };

  shouldComponentUpdate(nextProps: NodeProps) {
    return nextProps.node.state !== this.props.node.state;
  }

  render() {
    console.log(
      "rendered node " +
        this.props.node.coord.row +
        "," +
        this.props.node.coord.column
    );

    return (
      <div
        onClick={(e) => this.handleClick(e)}
        id="node"
        state-type={this.props.node.state}
      >
        {this.props.node.coord.row},{this.props.node.coord.column}
      </div>
    );
  }
}

export default Node;
