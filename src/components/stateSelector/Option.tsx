import React from "react";
import { NodeTrueType } from "../../interfaces";

interface OptionProps {
  selectedNodeType: NodeTrueType;
  stateName: NodeTrueType;
  displayName: string;
  handleSelectedNodeType: (state: NodeTrueType) => void;
}

interface OptionState {}

class Option extends React.Component<OptionProps, OptionState> {
  shouldComponentUpdate(nextProps: OptionProps) {
    return nextProps.selectedNodeType !== this.props.selectedNodeType;
  }

  render() {
    return (
      <div
        id="state-toggle"
        toggle-state={
          this.props.selectedNodeType === this.props.stateName
            ? "toggled"
            : "none"
        }
        onClick={() => {
          this.setState({ selectedState: this.props.stateName });
          this.props.handleSelectedNodeType(this.props.stateName);
        }}
      >
        {this.props.displayName}
      </div>
    );
  }
}

export default Option;
