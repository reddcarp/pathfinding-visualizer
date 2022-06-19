import React from "react";
import { NodeStateType } from "../../interfaces";

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
    console.log("rendered");
    return (
      <div id="state-selector-container">
        <div
          id="state-toggle"
          toggle-state={
            this.props.selectedState === "start" ? "toggled" : "none"
          }
          onClick={() => {
            this.setState({ selectedState: "start" });
            this.props.handleSelectedStateChange("start");
          }}
        >
          Start
        </div>
        <div
          id="state-toggle"
          toggle-state={
            this.props.selectedState === "goal" ? "toggled" : "none"
          }
          onClick={() => {
            this.setState({ selectedState: "goal" });
            this.props.handleSelectedStateChange("goal");
          }}
        >
          Goal
        </div>
      </div>
    );
  }
}

export default StateSelector;
