import Tutorial from "./tutorial";

interface ModalProps {
  handleSetShowTutorial: (state: boolean) => void;
}

function Modal(props: ModalProps) {
  return (
    <div id="modal-backdrop">
      <div id="modal">
        <Tutorial closeAction={props.handleSetShowTutorial} />
      </div>
    </div>
  );
}

export default Modal;
