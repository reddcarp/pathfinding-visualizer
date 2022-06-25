interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  return (
    <div id="toast">
      <div id="toast-content-container">
        {message}
        <div id="circle-loader">
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Toast;
