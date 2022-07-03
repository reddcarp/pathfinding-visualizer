import { useState } from "react";
import SubPage from "../subpage";

import p1Image from "../../../images/tutorial/pathfinding.png";
import p2Image from "../../../images/tutorial/node_selector.png";
import p2Gif from "../../../images/tutorial/WeightChange.gif";
import p3Gif from "../../../images/tutorial/WallPlacement.gif";
import p4Image from "../../../images/tutorial/algorithm_options.png";
import p5Image from "../../../images/tutorial/additional_commands.png";
import p6Image from "../../../images/tutorial/tutorial_option.png";

interface TutorialProps {
  closeAction: (state: boolean) => void;
}

function Tutorial(props: TutorialProps) {
  const [pageIdx, setPageIdx] = useState(0);

  const nextAction = () => {
    setPageIdx((prev) => prev + 1);
  };
  const previousAction = () => {
    setPageIdx((prev) => prev - 1);
  };
  const doneAction = () => {
    props.closeAction(false);
  };

  return (
    <>
      {pageIdx === 0 && (
        <SubPage
          closeButtonAction={props.closeAction}
          rightFooterButtonText="Next"
          rightFooterButtonAction={nextAction}
        >
          <div id="title">Pathfinding</div>
          <div id="text">
            This pathfinding visualizer is based on a 2D grid. <br />
            Moving up, down,left or right has a cost of 1. <br />A 90° turn has
            an additional cost of 1.
          </div>
          <img
            style={{ marginTop: 20, marginBottom: 20 }}
            src={p1Image}
            alt="pathfinding"
          />
        </SubPage>
      )}
      {pageIdx === 1 && (
        <SubPage
          closeButtonAction={props.closeAction}
          leftFooterButtonText="Previous"
          leftFooterButtonAction={previousAction}
          rightFooterButtonText="Next"
          rightFooterButtonAction={nextAction}
        >
          <div id="title">Node Selection</div>
          <div id="text">
            Use the following buttons to select the type of node to add to the
            grid.
          </div>
          <img
            style={{ marginTop: 10, width: "100%" }}
            src={p2Image}
            alt="node type selection"
          />
          <div style={{ marginTop: 34 }} id="text">
            With the weight node selected, clicking on it again will change the
            node's weight (as displayed on it)
          </div>
          <img
            style={{ marginTop: 13, marginBottom: 20, height: "30%" }}
            src={p2Gif}
            alt="weight selection"
          />
        </SubPage>
      )}
      {pageIdx === 2 && (
        <SubPage
          closeButtonAction={props.closeAction}
          leftFooterButtonText="Previous"
          leftFooterButtonAction={previousAction}
          rightFooterButtonText="Next"
          rightFooterButtonAction={nextAction}
        >
          <div id="title">Node Placement</div>
          <div id="text">
            Once a node type selected, click on the grid to place it <br />
            or click and drag to place multiple nodes.
          </div>
          <img
            style={{ marginTop: 10, marginBottom: 20, width: "100%" }}
            src={p3Gif}
            alt="wall placement"
          />
        </SubPage>
      )}
      {pageIdx === 3 && (
        <SubPage
          closeButtonAction={props.closeAction}
          leftFooterButtonText="Previous"
          leftFooterButtonAction={previousAction}
          rightFooterButtonText="Next"
          rightFooterButtonAction={nextAction}
        >
          <div id="title">Algorithm visualization</div>
          <div id="text">
            To visualize an algorithm, click on the desired option in the
            header, <br />
            the animation will then start.
          </div>
          <img
            style={{ marginTop: 20, marginBottom: 20, width: "100%" }}
            src={p4Image}
            alt="visualization options"
          />
        </SubPage>
      )}
      {pageIdx === 4 && (
        <SubPage
          closeButtonAction={props.closeAction}
          leftFooterButtonText="Previous"
          leftFooterButtonAction={previousAction}
          rightFooterButtonText="Next"
          rightFooterButtonAction={nextAction}
        >
          <div id="title">Clear commands</div>
          <div id="text">
            To clear a particular type of node, hover the clear option and click
            on the desired option in the list.
          </div>
          <img
            style={{ marginTop: 20, marginBottom: 20 }}
            src={p5Image}
            alt="aditionnal options"
          />
        </SubPage>
      )}
      {pageIdx === 5 && (
        <SubPage
          closeButtonAction={props.closeAction}
          leftFooterButtonText="Previous"
          leftFooterButtonAction={previousAction}
          rightFooterButtonText="Done"
          rightFooterButtonAction={doneAction}
        >
          <div id="title">Tutorial</div>
          <div id="text">
            To rewatch this tutorial you can click on the help option.
          </div>
          <img
            style={{ marginTop: 20, marginBottom: 20 }}
            src={p6Image}
            alt="Help options"
          />
        </SubPage>
      )}
    </>
  );
}

export default Tutorial;
