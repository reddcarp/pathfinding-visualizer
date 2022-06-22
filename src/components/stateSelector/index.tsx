import React from "react";
import { NodeTrueType } from "../../interfaces";
import MultiOption from "./MultiOption";
import Option from "./Option";

interface StateSelectorProps {
  handleSelectedNodeType: (type: NodeTrueType) => void;
  selectedNodeType: NodeTrueType;
}

interface StateSelectorState {}

class StateSelector extends React.Component<
  StateSelectorProps,
  StateSelectorState
> {
  shouldComponentUpdate(nextProps: StateSelectorProps) {
    return nextProps.selectedNodeType !== this.props.selectedNodeType;
  }

  render() {
    return (
      <div id="state-selector-container">
        <Option
          displayName="Start Node"
          svgPath="../../images/arrow-right.svg"
          stateName="start"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Goal Node"
          svgPath="../../images/target.svg"
          stateName="goal"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Wall Node"
          svgPath="../../images/arrow-down.svg"
          stateName="wall"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <MultiOption
          displayNames={["Weight Node", "Weight Node", "Weight Node"]}
          stateNames={["weight-2", "weight-5", "weight-10"]}
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Erase Nodes"
          svgPath="../../images/arrow-down.svg"
          stateName="open"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
      </div>
    );
  }
}

export default StateSelector;
