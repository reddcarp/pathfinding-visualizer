import React from "react";
import { NodeTrueType } from "../../interfaces";
import Option from "./Option";

interface StateSelectorProps {
  handleSelectedNodeType: (type: NodeTrueType) => void;
  selectedNodeType: NodeTrueType;
}

interface StateSelectorState {}

class StateSelector extends React.PureComponent<
  StateSelectorProps,
  StateSelectorState
> {
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
      </div>
    );
  }
}

export default StateSelector;
