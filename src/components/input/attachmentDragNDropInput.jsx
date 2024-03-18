import { Grid, IconButton } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "@assets/svg";
import { getKeysByValue, mimeTypes } from "@utils/common";
// import { setErrorToast } from "@redux/slice/toast";
// import { useDispatch } from "react-redux";

function AttachmentDragNDropInputComponent({
  files,
  handleDrop,
  deleteFile,
  single,
}) {
  // const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (e) => {
      // if (error.length && error[0]?.errors) {
      //   dispatch(setErrorToast("File must be less then 5 MB"));
      // }
      if (e.length && handleDrop) {
        const renamedFiles = e.map((file) => {
          console.log(
            file.name.replace(/\.[^/.]+$/, "").slice(0, 40) +
              getKeysByValue(mimeTypes, file.type)
          );
          const renamedFile = new File(
            [file],
            file.name.replace(/\.[^/.]+$/, "").slice(0, 40) +
              getKeysByValue(mimeTypes, file.type),
            {
              type: file.type,
            }
          );

          return renamedFile;
        });

        handleDrop(renamedFiles);
      }
    },
    multiple: !single,
    maxFiles: single ? 1 : 10,
    maxSize: 200 * 1024 * 1024,
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
          {file.name || file.title || file.path || "Untitled File"}
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
              {!single && <small>File name could be 40 character long</small>}
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
