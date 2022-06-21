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
          displayName="Start"
          stateName="start"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Goal"
          stateName="goal"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Wall"
          stateName="wall"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <MultiOption
          displayNames={["Weight(2)", "Weight(5)", "Weight(10)"]}
          stateNames={["weight-2", "weight-5", "weight-10"]}
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Delete"
          stateName="open"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
      </div>
    );
  }
}

export default StateSelector;
