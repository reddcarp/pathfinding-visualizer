import React from "react";
import { ReactSVG } from "react-svg";

import { NodeTrueType } from "../../interfaces";

interface MultiOptionProps {
  selectedNodeType: NodeTrueType;
  stateNames: NodeTrueType[];
  displayNames: string[];
  svgPaths: string[];
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
      let statePool = this.props.stateNames;

      if (statePool.includes(lastProp.selectedNodeType)) {
        // case where we get deselected
        if (!statePool.includes(nextProps.selectedNodeType)) {
          this.firstClick = true;
          return true;
        }
        // case where our index changes
        this.firstClick = false;
        return true;
      }
      // case where we need to get selected
      else if (statePool.includes(nextProps.selectedNodeType)) {
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
        <ReactSVG src={this.props.svgPaths[this.state.index]} />
        {this.props.displayNames[this.state.index]}
      </div>
    );
  }
}

export default MultiOption;
