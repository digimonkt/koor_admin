import { OutlinedButton } from "@components/button";
import { Avatar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "@assets/svg";
import ImageCropper from "@components/imageCropper";

const ProfilePicInputComponent = ({
  title,
  color,
  bgColor,
  textColor,
  handleSave,
  image,
  loading,
}) => {
  const [files, setFiles] = useState([]);
  const [newImage, setNewImage] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  useEffect(() => {
    setNewImage(image);
  }, [image]);

  const handleUpdateImage = (file) => {
    setNewImage(file);
    setFiles([]);
  };

  const handleSaveImage = () => {
    if (newImage instanceof File) handleSave(newImage);
  };

  const thumbs = (
    <Avatar
      sx={{
        width: 100,
        height: 100,
        color: "#CACACA",
        "&.MuiAvatar-circular": {
          background: "#F0F0F0",
        },
      }}
      src={newImage instanceof File ? URL.createObjectURL(newImage) : newImage}
      onLoad={() => {
        URL.revokeObjectURL(newImage);
      }}
    />
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <>
      <div className="add-content">
        <h2>{title}</h2>
        <Stack direction="row" spacing={2} className="mt-4">
          {!newImage ? (
            <Avatar
              alt="profileImage"
              sx={{
                width: 100,
                height: 100,
                color: "#CACACA",
                "&.MuiAvatar-colorDefault": {
                  background: "#F0F0F0",
                },
              }}
            >
              <SVG.UserIcon />
            </Avatar>
          ) : (
            <>{thumbs}</>
          )}
          <Stack direction="column" spacing={4}>
            <div className="dropimg-userprofile">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} disabled={loading} />
                <p>
                  Drag here or{" "}
                  <span style={{ color: textColor }}>upload a photo</span>
                </p>
              </div>
            </div>
            <div className="text-center">
              <OutlinedButton
                title={
                  <>
                    {loading ? (
                      "Saving..."
                    ) : (
                      <>
                        <span className="me-2 d-inline-flex">
                          <SVG.CheckIcon />
                        </span>
                        Save photo
                      </>
                    )}
                  </>
                }
                disabled={loading}
                onClick={handleSaveImage}
                sx={{
                  "&.MuiButton-outlined": {
                    border: `1px solid ${color} !important`,
                    color: `${color} !important`,
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "6px 30px",
                    "&:hover": { background: bgColor },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </div>
          </Stack>
        </Stack>
      </div>
      <ImageCropper
        open={files[0]}
        handleClose={() => {
          setFiles([]);
        }}
        handleSave={handleUpdateImage}
        image={files[0]}
      />
    </>
  );
};
export default ProfilePicInputComponent;
