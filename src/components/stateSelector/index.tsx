import React from "react";
import { NodeStateType } from "../../interfaces";
import Option from "./Option";

interface StateSelectorProps {
  handleSelectedStateChange: (state: NodeStateType) => void;
  selectedState: NodeStateType;
}

interface StateSelectorState {}

class StateSelector extends React.PureComponent<
  StateSelectorProps,
  StateSelectorState
> {
  constructor(props: StateSelectorProps) {
    super(props);
  }

  render() {
    return (
      <div id="state-selector-container">
        <Option
          displayName="Start"
          stateName="start"
          selectedState={this.props.selectedState}
          handleSelectedStateChange={this.props.handleSelectedStateChange}
        />
        <Option
          displayName="Goal"
          stateName="goal"
          selectedState={this.props.selectedState}
          handleSelectedStateChange={this.props.handleSelectedStateChange}
        />
      </div>
    );
  }
}

export default StateSelector;
