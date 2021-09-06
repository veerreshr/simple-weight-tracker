import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MuiAlert from "@material-ui/lab/Alert";
import { useStoreState, useStoreActions } from "easy-peasy";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Toast() {
  const { open, message, severity } = useStoreState((state) => state.toast);
  const removeToast = useStoreActions((actions) => actions.removeToast);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    removeToast();
  };
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      {severity === "error" ? (
        <>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </>
      ) : (
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}

export default Toast;
