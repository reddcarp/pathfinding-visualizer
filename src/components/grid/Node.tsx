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
    return (
      nextProps.node.state !== this.props.node.state ||
      nextProps.node.type != this.props.node.type
    );
  }

  render() {
    // forbids override of a goal or start node
    if (this.props.node.type === "goal" || this.props.node.type === "start") {
      return (
        <div
          id="outer-node"
          node-type={this.props.node.type}
          state-type={this.props.node.state}
        >
          <div
            id="node"
            state-type={this.props.node.state}
            state-direction={this.props.node.direction}
            node-type={this.props.node.type}
          ></div>
        </div>
      );
    }

    return (
      <div
        id="outer-node"
        node-type={this.props.node.type}
        state-type={this.props.node.state}
      >
        <div
          onMouseDown={(e) => this.props.handleMouseDown(this.props.node.coord)}
          onMouseUp={() => this.props.handleMouseUp()}
          onMouseEnter={(e) =>
            this.props.handleMouseEnter(this.props.node.coord)
          }
          id="node"
          state-type={this.props.node.state}
          state-direction={this.props.node.direction}
          node-type={this.props.node.type}
        ></div>
      </div>
    );
  }
}

export default Node;
