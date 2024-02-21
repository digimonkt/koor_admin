import { Grid, IconButton } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "@assets/svg";
import { setErrorToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";

function AttachmentDragNDropInputComponent({
  files,
  handleDrop,
  deleteFile,
  single,
}) {
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (e, error) => {
      if (error.length && error[0]?.errors) {
        dispatch(setErrorToast("File must be less then 5 MB"));
      } else if (e.length && handleDrop) {
        handleDrop(e);
      }
    },
    multiple: !single,
    maxFiles: single ? 1 : 10,
    maxSize: 5 * 1024 * 1024,
    onError: (e) => console.log({ e }),
  });
  const acceptedFileItems = (files || []).map((file) => {
    return (
      <li key={file.path}>
        <div className="text-tracate">
          <IconButton
            sx={{
              background: "#D5E3F7",
              color: "#274593",
              "&:hover": {
                background: "#bcd2f1",
              },
              mr: 2,
            }}
          >
            <SVG.AttachIcon />
          </IconButton>
          {file.title ? file.title : file.path}
        </div>
        <IconButton
          onClick={() => deleteFile(file)}
          disableFocusRipple
          sx={{ color: "#274593" }}
        >
          <SVG.DeleteIcon />
        </IconButton>
      </li>
    );
  });
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} xs={12}>
          <div {...getRootProps({ className: "dropzone styles_attachment" })}>
            <input {...getInputProps()} />
            <div className="text-center">
              <p>
                Drag here or{" "}
                <span style={{ color: "#274593" }}>upload an attachment</span>
              </p>
              {!single && <small>Max 10 files, each one under 5MB</small>}
            </div>
          </div>
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          xs={12}
          className="attachment-box inline-attacment"
        >
          <ul>{acceptedFileItems}</ul>
        </Grid>
      </Grid>
    </>
  );
}

export default AttachmentDragNDropInputComponent;
