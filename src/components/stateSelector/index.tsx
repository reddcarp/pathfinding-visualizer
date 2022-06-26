import React from "react";
import { NodeTrueType } from "../../interfaces";
import MultiOption from "./MultiOption";
import Option from "./Option";

import rightArrow from "../../images/arrow-right.svg";
import target from "../../images/target.svg";
import wall from "../../images/wall.svg";
import eraser from "../../images/eraser.svg";

import weight2 from "../../images/weight-2.svg";
import weight5 from "../../images/weight-5.svg";
import weight10 from "../../images/weight-10.svg";

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
          svg={rightArrow}
          stateName="start"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Goal Node"
          svg={target}
          stateName="goal"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Wall Node"
          svg={wall}
          stateName="wall"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <MultiOption
          displayNames={["Weight Node", "Weight Node", "Weight Node"]}
          svgs={[weight2, weight5, weight10]}
          stateNames={["weight-2", "weight-5", "weight-10"]}
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
        <Option
          displayName="Erase Nodes"
          svg={eraser}
          stateName="open"
          selectedNodeType={this.props.selectedNodeType}
          handleSelectedNodeType={this.props.handleSelectedNodeType}
        />
      </div>
    );
  }
}

export default StateSelector;
