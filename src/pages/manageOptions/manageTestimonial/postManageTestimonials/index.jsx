import { useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "@pages/manageOptions/manageSettings/styles.module.css";
import { Avatar, Card, CardContent, IconButton, Stack } from "@mui/material";
import ReactQuill from "react-quill";
import ImageCropper from "@components/imageCropper";
import { LabeledInput } from "@components/input";
import { Link, useNavigate } from "react-router-dom";
import { createTestimonialApi } from "@api/manageTestimonial";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";

const PostTestimonials = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientPosition, setClientPosition] = useState("");
  const [newImage, setNewImage] = useState("");
  const [paragraph, setParagraph] = useState("");

  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  const handleUpdateImage = (file) => {
    setNewImage(file);
    setFiles([]);
  };
  const thumbs = (
    <Avatar
      sx={{
        width: 100,
        height: 100,
        color: "#CACACA",
        borderRadius: "0",
      }}
      src={
        newImage instanceof File
          ? URL.createObjectURL(newImage)
          : process.env.REACT_APP_BACKEND_URL + newImage.path
      }
      onLoad={() => {
        URL.revokeObjectURL(newImage);
      }}
    />
  );
  const handlePostTitle = (e) => {
    setPostTitle(e);
  };
  const handleClientName = (e) => {
    setClientName(e);
  };
  const handleCompanyName = (e) => {
    setCompanyName(e);
  };
  const handlePosition = (e) => {
    setClientPosition(e);
  };

  const handleParagraph = (e) => {
    setParagraph(e);
  };

  const handleAddTestimonial = async () => {
    const newFormData = new FormData();
    newFormData.set("title", postTitle);
    newFormData.set("client_name", clientName);
    newFormData.set("client_company", companyName);
    newFormData.set("client_position", clientPosition);
    newFormData.set("description", paragraph);
    newFormData.set("testimonial_image", newImage);
    if (
      postTitle &&
      clientName &&
      companyName &&
      clientPosition &&
      paragraph &&
      newImage
    ) {
      const response = await createTestimonialApi(newFormData);
      if (response.remote === "success") {
        dispatch(setSuccessToast("Add Testimonial SuccessFully"));
        navigate("/manage-testimonials");
      } else {
        dispatch(setErrorToast("Something went wrong"));
        console.log(response.error);
      }
    } else {
      dispatch(setErrorToast("All fields are required"));
    }
  };

  return (
    <Card
      sx={{
        "&.MuiCard-root": {
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
          marginBottom: "100px",
        },
      }}
    >
      <CardContent
        sx={{
          "&.MuiCardContent-root": {
            p: {
              xs: 2,
              sm: 1,
              md: 3.75,
              lg: 3.75,
              xl: 3.75,
            },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          className={`${styles.title}`}
          sx={{
            mb: {
              xs: 1,
              sm: 1,
              md: 3.75,
              lg: 3.75,
              xl: 3.75,
            },
          }}
        >
          <IconButton LinkComponent={Link} to="/manage-testimonials">
            <SVG.ArrowLeftIcon />
          </IconButton>{" "}
          <h2>Testimonials</h2>
        </Stack>
        <hr />
        <div className={`${styles.title} ${styles.spaceMy}`}>
          <LabeledInput
            placeholder="Post title"
            type="text"
            onChange={(e) => handlePostTitle(e.target.value)}
            value={postTitle}
          />
        </div>
        <hr />
        <div className={`${styles.title} ${styles.spaceMy}`}>
          <LabeledInput
            placeholder="Client Name"
            type="text"
            onChange={(e) => handleClientName(e.target.value)}
            value={clientName}
          />
        </div>
        <hr />
        <div className={`${styles.title} ${styles.spaceMy}`}>
          <LabeledInput
            placeholder="Company Name "
            type="text"
            onChange={(e) => handleCompanyName(e.target.value)}
            value={companyName}
          />
        </div>
        <hr />
        <div className={`${styles.title} ${styles.spaceMy}`}>
          <LabeledInput
            placeholder="Client position "
            type="text"
            onChange={(e) => handlePosition(e.target.value)}
            value={clientPosition}
          />
        </div>

        <div className="drag-drop">
          <label>
            <input
              type="file"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "none",
              }}
              accept="image/*"
              onChange={handleFiles}
            />
            <p style={{ textAlign: "center", cursor: "pointer" }}>
              Drag here or
              <span style={{ color: "blue" }}> upload a post cover image</span>
            </p>
          </label>
          {newImage && <>{thumbs}</>}
        </div>
        <div>
          <ReactQuill
            theme="snow"
            value={paragraph}
            style={{
              width: "100%",
              marginTop: "20px",
              background: "#F0F0F0",
            }}
            onChange={(value) => handleParagraph(value)}
          />
        </div>
      </CardContent>
      <Stack direction={"row"} justifyContent={"center"}>
        <OutlinedButton
          onClick={handleAddTestimonial}
          title={
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <SVG.AddCircleIcon />
              <span> Add Testimonials</span>
            </Stack>
          }
          sx={{
            color: "#274593",
            borderColor: "#274593",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Stack>

      {files.length ? (
        <ImageCropper
          open={files[0]}
          handleClose={() => {
            setFiles([]);
          }}
          handleSave={handleUpdateImage}
          image={files[0]}
        />
      ) : (
        ""
      )}
    </Card>
  );
};

export default PostTestimonials;
