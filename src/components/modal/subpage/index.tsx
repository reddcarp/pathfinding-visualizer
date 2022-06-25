import SubPageAction from "./SubPageAction";

interface SubPageProps {
  leftFooterButtonText?: string;
  leftFooterButtonAction?: any;
  rightFooterButtonText?: string;
  rightFooterButtonAction?: any;
  closeButtonAction: any;
  children: any;
}

function SubPage(props: SubPageProps) {
  return (
    <div id="sub-page">
      <div id="sub-page-header">
        <SubPageAction
          type="primary"
          action={() => props.closeButtonAction(false)}
          text="X"
        />
      </div>
      <div id="sub-page-content">{props.children}</div>
      <div id="sub-page-footer">
        <SubPageAction
          type="secondary"
          action={props.leftFooterButtonAction}
          text={props.leftFooterButtonText}
        />
        <SubPageAction
          type="secondary"
          action={props.rightFooterButtonAction}
          text={props.rightFooterButtonText}
        />
      </div>
    </div>
  );
}

export default SubPage;
