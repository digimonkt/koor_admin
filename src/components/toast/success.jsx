import { Alert, Snackbar } from "@mui/material";
import React from "react";

function SuccessToastComponent({
  message,
  duration,
  open,
  handleClose,
  vertical,
  horizontal,
}) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: vertical || "top",
        horizontal: horizontal || "center",
      }}
      open={open}
      autoHideDuration={duration || 2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessToastComponent;
