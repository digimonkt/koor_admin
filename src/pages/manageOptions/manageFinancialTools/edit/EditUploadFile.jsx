import { Button, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "@assets/svg";
import { styled } from "@mui/material/styles";
const StyledButton = styled(Button)(() => ({
  borderRadius: 20,
  background: "#D5E3F7",
  color: "#274593",
  fontSize: 16,
  fontFamily: "Bahnschrift",
  fontWeight: 600,
  boxShadow: "none",
  "&:hover": {
    background: "#b4d2fe",
    boxShadow: "none",
  },
}));
const StyledIconButton = styled(IconButton)(() => ({
  background: "#D5E3F7",
  color: "#274593",
  width: 30,
  height: 30,
  "&:hover": {
    background: "#b4d2fe",
    boxShadow: "none",
  },
}));
const EditUploadFile = (props) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };
  const thumbs = files.map((file) => (
    <div key={file.name} className="reupload">
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt=""
        />
        <Stack direction="row" spacing={1.25} alignItems="center">
          <StyledButton variant="contained" component="label">
            <span className="me-2 d-inline-flex">
              <SVG.DownlodingIcon />
            </span>
            Reuplaod
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              {...getInputProps()}
            />
          </StyledButton>
          <StyledIconButton onClick={removeFile(file)}>
            <SVG.DeleteIcon />
          </StyledIconButton>
        </Stack>
      </Stack>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <section className="uploadfiles">
        {thumbs.length === 0 && (
          <div {...getRootProps({ className: "dropzone uploadbox" })}>
            <input {...getInputProps()} />
            <p>
              Drag here or <span>{props.title}</span>
            </p>
          </div>
        )}
        <div>{thumbs}</div>
      </section>
    </>
  );
};
export default EditUploadFile;
