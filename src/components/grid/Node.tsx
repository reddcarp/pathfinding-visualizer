import React from "react";
import { CoordType, NodeType } from "../../interfaces";

interface NodeProps {
  node: NodeType;
  handleMouseDown: (coord: CoordType) => void;
  handleMouseEnter: (coord: CoordType) => void;
  handleMouseUp: () => void;
}

interface NodeState {}

class Node extends React.Component<NodeProps, NodeState> {
  shouldComponentUpdate(nextProps: NodeProps) {
    return nextProps.node.state !== this.props.node.state;
  }

  render() {
    // forbids override of a goal or start node
    if (this.props.node.state === "goal" || this.props.node.state === "start") {
      return (
        <div id="outer-node" state-type={this.props.node.state}>
          <div id="node" state-type={this.props.node.state}></div>
        </div>
      );
    }

    return (
      <div id="outer-node" state-type={this.props.node.state}>
        <div
          onMouseDown={(e) => this.props.handleMouseDown(this.props.node.coord)}
          onMouseUp={() => this.props.handleMouseUp()}
          onMouseEnter={(e) =>
            this.props.handleMouseEnter(this.props.node.coord)
          }
          id="node"
          state-type={this.props.node.state}
        ></div>
      </div>
    );
  }
}

export default Node;
