import React from "react";

interface ActionProps {
  displayedName: string;
  actionToPerform: any;
}

interface ActionState {}

class Action extends React.Component<ActionProps, ActionState> {
  shouldComponentUpdate(nextProps: ActionProps) {
    return false;
  }

  render() {
    return (
      <div id="action" onClick={() => this.props.actionToPerform()}>
        {this.props.displayedName}
      </div>
    );
  }
}

export default Action;
