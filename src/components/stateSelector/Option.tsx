import React from "react";
import { NodeStateType } from "../../interfaces";

interface OptionProps {
  selectedState: NodeStateType;
  stateName: NodeStateType;
  displayName: string;
  handleSelectedStateChange: (state: NodeStateType) => void;
}

interface OptionState {}

class Option extends React.PureComponent<OptionProps, OptionState> {
  render() {
    return (
      <div
        id="state-toggle"
        toggle-state={
          this.props.selectedState === this.props.stateName ? "toggled" : "none"
        }
        onClick={() => {
          this.setState({ selectedState: this.props.stateName });
          this.props.handleSelectedStateChange(this.props.stateName);
        }}
      >
        {this.props.displayName}
      </div>
    );
  }
}

export default Option;
