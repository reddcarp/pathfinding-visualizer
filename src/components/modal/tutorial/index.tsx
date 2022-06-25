import { useState } from "react";
import SubPage from "../subpage";

import p1Image from "../../../images/tutorial/pathfinding.png";
import p2Image1 from "../../../images/tutorial/node_selector.png";

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
            Moving up, down,left or right has a cost of 1.
          </div>
          <img style={{ marginTop: 50 }} src={p1Image} alt="pathfinding" />
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
          <img src={p2Image1} alt="node type selection" />
        </SubPage>
      )}
    </>
  );
}

export default Tutorial;
