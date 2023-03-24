import { Grid, IconButton } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "@assets/svg";

function AttachmentDragNDropInputComponent({
  files,
  handleDrop,
  deleteFile,
  single,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop || (() => {}),
    multiple: !single,
    maxFiles: single ? 1 : 10,
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
          <SVG.DeleteICon />
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
