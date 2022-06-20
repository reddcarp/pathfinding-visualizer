import React from "react";
import { CoordType, NodeType } from "../../interfaces";

interface NodeProps {
  node: NodeType;
  handleNodeChange: (coord: CoordType) => void;
}

interface NodeState {}

class Node extends React.Component<NodeProps, NodeState> {
  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.props.handleNodeChange(this.props.node.coord);
  };

  shouldComponentUpdate(nextProps: NodeProps) {
    return nextProps.node.state !== this.props.node.state;
  }

  render() {
    // forbids override of a goal or start node
    if (this.props.node.state === "goal" || this.props.node.state === "start") {
      return <div id="node" state-type={this.props.node.state}></div>;
    }

    return (
      <div
        onClick={(e) => this.handleClick(e)}
        id="node"
        state-type={this.props.node.state}
      ></div>
    );
  }
}

export default Node;
