import React from "react";
import { NodeTrueType } from "../../interfaces";

interface OptionProps {
  selectedNodeType: NodeTrueType;
  stateName: NodeTrueType;
  displayName: string;
  svg: any;
  handleSelectedNodeType: (state: NodeTrueType) => void;
}

interface OptionState {}

class Option extends React.Component<OptionProps, OptionState> {
  shouldComponentUpdate(nextProps: OptionProps) {
    if (this.props.selectedNodeType !== nextProps.selectedNodeType) {
      if (this.props.selectedNodeType === this.props.stateName) {
        return true;
      }
      if (this.props.stateName === nextProps.selectedNodeType) {
        return true;
      }
    }
    return false;
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
          this.props.handleSelectedNodeType(this.props.stateName);
        }}
      >
        <img src={this.props.svg} alt={this.props.displayName} />
        {this.props.displayName}
      </div>
    );
  }
}

export default Option;
