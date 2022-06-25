interface SubPageActionProps {
  text?: string;
  action: any;
  type: "primary" | "secondary";
}

function SubPageAction(props: SubPageActionProps) {
  if (!props.text) return <div></div>;

  return (
    <div
      style={props.type === "primary" ? { fontSize: 20 } : { fontSize: 16 }}
      onClick={() => props.action()}
      id="sub-page-action"
    >
      {props.text}
    </div>
  );
}

export default SubPageAction;
