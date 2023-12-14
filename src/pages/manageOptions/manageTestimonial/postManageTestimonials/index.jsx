import { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "@pages/manageOptions/manageSettings/styles.module.css";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import ReactQuill, { Quill } from "react-quill";
import ImageCropper from "@components/imageCropper";
import { LabeledInput } from "@components/input";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createTestimonialApi,
  editTestimonialIdApi,
  // editTestimonialIdApi,
  getSingleTestimonialListApi,
} from "@api/manageTestimonial";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";

const PostTestimonials = () => {
  const params = useParams();
  const { id } = params;
  const testimonialId = id;
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

  const getFetchData = async () => {
    const response = await getSingleTestimonialListApi(testimonialId);
    if (response.remote === "success") {
      setPostTitle(response.data.title);
      setClientName(response.data.client_name);
      setCompanyName(response.data.client_company);
      setClientPosition(response.data.client_position);
      setNewImage(response.data.image);
      setParagraph(response.data.description);
    }
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
      }
    } else {
      dispatch(setErrorToast("All fields are required"));
    }
  };

  const handleUpdateTestimonial = async (testimonialId) => {
    const payload = {
      title: postTitle,
      client_name: clientName,
      client_company: companyName,
      client_position: clientPosition,
      description: paragraph,
      testimonial_image: newImage,
    };
    const newFormData = new FormData();
    if (payload.testimonial_image.id) {
      delete payload.testimonial_image;
    } else {
      newFormData.set("testimonial_image", payload.testimonial_image);
    }
    newFormData.set("title", postTitle);
    newFormData.set("client_name", clientName);
    newFormData.set("client_company", companyName);
    newFormData.set("client_position", clientPosition);
    newFormData.set("description", paragraph);
    if (
      postTitle &&
      clientName &&
      companyName &&
      clientPosition &&
      newImage &&
      paragraph
    ) {
      const response = await editTestimonialIdApi(testimonialId, newFormData);
      if (response.remote === "success") {
        dispatch(setSuccessToast("Add Testimonial SuccessFully"));
        navigate("/manage-testimonials");
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
    } else {
      dispatch(setErrorToast("All fields are required"));
    }
  };

  useEffect(() => {
    if (testimonialId) {
      getFetchData();
    }
  }, [testimonialId]);
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "Poppins",
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
  ];
  Quill.register(Font, true);
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
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <div className={`${styles.title} ${styles.spaceMy}`}>
              <LabeledInput
                placeholder="Post title"
                type="text"
                onChange={(e) => handlePostTitle(e.target.value)}
                value={postTitle}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={`${styles.title} ${styles.spaceMy}`}>
              <LabeledInput
                placeholder="Client Name"
                type="text"
                onChange={(e) => handleClientName(e.target.value)}
                value={clientName}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={`${styles.title} ${styles.spaceMy}`}>
              <LabeledInput
                placeholder="Company Name "
                type="text"
                onChange={(e) => handleCompanyName(e.target.value)}
                value={companyName}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={`${styles.title} ${styles.spaceMy}`}>
              <LabeledInput
                placeholder="Client position "
                type="text"
                onChange={(e) => handlePosition(e.target.value)}
                value={clientPosition}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={12}>
            <div
              className="drag-drop"
              style={{ flexDirection: "column", height: "auto" }}
            >
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
                  <span style={{ color: "blue" }}>
                    {" "}
                    upload a post cover image
                  </span>
                </p>
              </label>
              <Box sx={{ py: 1 }}>{newImage && <>{thumbs}</>}</Box>
            </div>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box className="react_editor">
              <ReactQuill
                theme="snow"
                value={paragraph}
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  background: "#F0F0F0",
                  fontFamily: "Poppins !important",
                }}
                onChange={(value) => handleParagraph(value)}
              />
            </Box>
          </Grid>
        </Grid>
        {testimonialId ? (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{ marginTop: "15px" }}
          >
            <OutlinedButton
              onClick={() => handleUpdateTestimonial(testimonialId)}
              title={
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <SVG.AddCircleIcon />
                  <span> Update Testimonials</span>
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
        ) : (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{ marginTop: "15px" }}
          >
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
        )}

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
      </CardContent>
    </Card>
  );
};

export default PostTestimonials;
