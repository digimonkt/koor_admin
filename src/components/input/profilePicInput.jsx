// import { OutlinedButton } from "@components/button";
import { Avatar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "@assets/svg";
import ImageCropper from "@components/imageCropper";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@utils/enum";

const ProfilePicInputComponent = ({
  title,
  handleSave,
  image,
  loading,
  handleSaveCroppedImg,
}) => {
  const { role } = useSelector((state) => state.auth);
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
    handleSaveCroppedImg(file);
    setFiles([]);
  };

  const thumbs = (
    <Avatar
      sx={{
        width: 100,
        height: 100,
        color: "#CACACA",
        "&.MuiAvatar-circular": {
          background: "#F0F0F0",
          borderRadius: "0px",
        },
      }}
      src={newImage instanceof File ? URL.createObjectURL(newImage) : newImage}
      onLoad={() => {
        URL.revokeObjectURL(newImage);
      }}
    />
  );
  useEffect(() => {
    setFiles([]);
  }, [image]);
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <>
      <div className="add-content">
        <h2>{title}</h2>
        <Stack
          direction="row"
          spacing={2}
          className="mt-4"
          sx={{
            "@media (max-width: 320px)": {
              display: "block",
              textAlign: "-webkit-center",
            },
          }}
        >
          {!newImage ? (
            <Avatar
              alt="profileImage"
              sx={{
                width: 100,
                height: 100,
                color: "#CACACA",
                "&.MuiAvatar-colorDefault": {
                  background: "#F0F0F0",
                  borderRadius: "0px",
                },
              }}
            >
              <SVG.UserIcon />
            </Avatar>
          ) : (
            <>{thumbs}</>
          )}
          <Stack
            direction="column"
            spacing={4}
            sx={{
              "@media (max-width: 320px)": {
                marginLeft: "0px !important",
                marginTop: "10px !important",
              },
            }}
          >
            <div className="dropimg-userprofile">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                  Drag here or{" "}
                  <span
                    style={{
                      color:
                        role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593",
                    }}
                  >
                    upload a photo
                  </span>
                </p>
              </div>
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
