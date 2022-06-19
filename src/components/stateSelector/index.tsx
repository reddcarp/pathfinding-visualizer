import React from "react";
import { NodeStateType } from "../../interfaces";

interface StateSelectorProps {
  handleSelectedStateChange: (state: NodeStateType) => void;
}

interface StateSelectorState {
  selectedState: NodeStateType;
}

class StateSelector extends React.PureComponent<
  StateSelectorProps,
  StateSelectorState
> {
  constructor(props: StateSelectorProps) {
    super(props);

    this.state = {
      selectedState: "start",
    };
  }

  render() {
    return (
      <div id="state-selector-container">
        <div
          id="state-toggle"
          toggle-state={
            this.state.selectedState === "start" ? "toggled" : "none"
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
            this.state.selectedState === "goal" ? "toggled" : "none"
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
