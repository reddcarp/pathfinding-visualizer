import React from "react";
import { NodeTrueType } from "../../interfaces";

interface MultiOptionProps {
  selectedNodeType: NodeTrueType;
  stateNames: NodeTrueType[];
  displayNames: string[];
  handleSelectedNodeType: (state: NodeTrueType) => void;
}

interface MultiOptionState {
  index: number;
}

class MultiOption extends React.Component<MultiOptionProps, MultiOptionState> {
  firstClick = true;

  constructor(props: MultiOptionProps) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  shouldComponentUpdate(nextProps: MultiOptionProps) {
    let lastProp = this.props;

    if (lastProp.selectedNodeType !== nextProps.selectedNodeType) {
      // case where we need to get deselected
      if (
        !lastProp.stateNames.includes(nextProps.selectedNodeType) &&
        lastProp.stateNames.includes(lastProp.selectedNodeType)
      ) {
        this.firstClick = true;
        return true;
      }

      // case where we need to get selected
      if (
        !lastProp.stateNames.includes(lastProp.selectedNodeType) &&
        lastProp.stateNames.includes(nextProps.selectedNodeType)
      ) {
        this.firstClick = false;
        return true;
      }

      // case where we need to change our selection
      if (lastProp.stateNames.includes(lastProp.selectedNodeType)) {
        this.firstClick = false;
        return true;
      }
    }
    return false;
  }

  render() {
    let isActivated = this.props.stateNames.includes(
      this.props.selectedNodeType
    );

    return (
      <div
        id="state-toggle"
        toggle-state={isActivated ? "toggled" : "none"}
        onClick={() => {
          this.setState(
            (state) => {
              if (this.firstClick) {
                return state;
              }
              return {
                index: (state.index + 1) % this.props.stateNames.length,
              };
            },
            () =>
              this.props.handleSelectedNodeType(
                this.props.stateNames[this.state.index]
              )
          );
        }}
      >
        {this.props.displayNames[this.state.index]}
      </div>
    );
  }
}

export default MultiOption;
