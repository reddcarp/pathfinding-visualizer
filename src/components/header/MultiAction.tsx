import React from "react";

interface MultiActionProps {
  name: string;
  displayedNames: string[];
  actionToPerform: any[];
}

interface MultiActionState {
  hovering: boolean;
}

class MultiAction extends React.Component<MultiActionProps, MultiActionState> {
  constructor(props: MultiActionProps) {
    super(props);

    this.state = {
      hovering: false,
    };
  }

  shouldComponentUpdate(
    nextProps: MultiActionProps,
    nextState: MultiActionState
  ) {
    return nextState.hovering !== this.state.hovering;
  }

  render() {
    return (
      <div
        id="multi-action"
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
      >
        {this.props.name}
        {this.state.hovering && (
          <div id="list">
            {this.props.displayedNames.map((name, idx) => (
              <div
                key={name}
                id="list-item"
                onClick={() => {
                  this.setState({ hovering: false });
                  this.props.actionToPerform[idx]();
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MultiAction;
