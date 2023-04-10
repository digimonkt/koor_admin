import React from "react";
import Dialog from "@mui/material/Dialog";

const DialogBox = ({ open, handleClose, className, children, ...rest }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className={`modal-box ${className}`}
        fullWidth
        maxWidth="sm"
        {...rest}
      >
        <div>{children}</div>
      </Dialog>
    </>
  );
};
export default DialogBox;
