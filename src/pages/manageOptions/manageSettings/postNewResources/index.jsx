import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { SVG } from "@assets/svg";
import styles from "../styles.module.css";
import LabelStyle from "../change-password/styles.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LabeledInput } from "@components/input";
import ReactQuill from "react-quill";
import { OutlinedButton } from "@components/button";
import ImageCropper from "@components/imageCropper";
import {
  createResourcesApi,
  getSingleResourcesApi,
  updateResourcesApi,
} from "@api/manageoptions";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";

const NewPostResource = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const [files, setFiles] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [addParagraph, setAddParagraph] = useState(1);
  const [preview, setPreview] = useState(false);
  const [editorValue, setEditorValue] = useState(Array(addParagraph).fill(""));
  const [editorVisibility, setEditorVisibility] = useState(
    Array(addParagraph).fill(true)
  );
  const [postTitle, setPostTitle] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // basic formatting
    ["blockquote", "code-block"], // blockquote and code block
    [{ header: 1 }, { header: 2 }], // headers
    [{ list: "ordered" }, { list: "bullet" }], // ordered and unordered lists
    [{ script: "sub" }, { script: "super" }], // subscript and superscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent and indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // font size
    [{ color: [] }, { background: [] }], // text and background color
    [{ font: [] }], // font family
    [{ align: [] }], // text alignment
    ["link", "image", "video"], // link, image, and video
    ["clean"], // remove formatting
  ];

  // image cropper function start
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
        width: preview ? "auto" : 100,
        height: preview ? 600 : 100,
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
  // image cropper function end
  // Delete Text Editor Content
  const handleDeleteContent = (index) => {
    const updatedVisibility = [...editorVisibility];
    updatedVisibility[index] = false;
    setEditorVisibility(updatedVisibility);
    const updatedValues = [...editorValue];
    updatedValues[index] = "";
    setEditorValue(updatedValues);
  };
  // Delete Text Editor Content

  // Add more paragraph
  const handleAddParagraph = () => {
    setAddParagraph(addParagraph + 1);
    setEditorValue([...editorValue, ""]);
    setEditorVisibility([...editorVisibility, true]);
  };
  // Add more paragraph
  // handle get Editor value
  const handleEditorValue = (index, value) => {
    const updatedValues = [...editorValue];
    updatedValues[index] = value;
    setEditorValue(updatedValues);
  };

  // handle get Editor value

  // Get Value Post Title
  const handlePostTitle = (e) => {
    setPostTitle(e.target.value);
  };
  // Get Value Post Title

  const handleSubmit = async () => {
    const nonEmptyValues = editorValue.filter((value) => value.trim() !== "");
    const payload = {
      title: postTitle,
      attachment_file: newImage,
      description: nonEmptyValues,
    };

    const newFormData = new FormData();
    newFormData.set("title", payload.title);
    newFormData.set("attachment_file", payload.attachment_file);
    payload.description.forEach((desc) => {
      newFormData.append("description", desc);
    });

    if (
      payload.title &&
      payload.attachment_file &&
      payload.description.length > 0
    ) {
      const response = await createResourcesApi(newFormData);
      if (response.remote === "success") {
        dispatch(setSuccessToast("Add Resource SuccessFully"));
        navigate("/settings");
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
    } else {
      dispatch(setErrorToast("All fields are required"));
    }
  };

  const handleUpdate = async (resourceId) => {
    const nonEmptyValues = editorValue.filter((value) => value.trim() !== "");
    const payload = {
      title: postTitle,
      attachment_file: newImage,
      description: nonEmptyValues,
    };
    const newFormData = new FormData();
    if (payload.attachment_file.id) {
      delete payload.attachment_file;
    } else {
      newFormData.set("attachment_file", payload.attachment_file);
    }
    newFormData.set("title", payload.title);
    payload.description.forEach((desc) => {
      newFormData.append("description", desc);
    });

    if (payload.title && payload.description.length > 0) {
      const response = await updateResourcesApi(resourceId, newFormData);
      if (response.remote === "success") {
        dispatch(setSuccessToast("Update Resource SuccessFully"));
        navigate("/settings");
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
    } else {
      dispatch(setErrorToast("All fields are required"));
    }
  };
  const getSingleData = async () => {
    const response = await getSingleResourcesApi(resourceId);
    if (response.remote === "success") {
      setPostTitle(response.data.title);
      setNewImage(response.data.attachment);
      setEditorValue(response.data.description);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    if (resourceId) {
      getSingleData();
    }
  }, [resourceId]);
  return (
    <>
      {!preview ? (
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
              <IconButton LinkComponent={Link} to="/settings">
                <SVG.ArrowLeftIcon />
              </IconButton>{" "}
              <h2>Create a new post</h2>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              justifyContent="space-between"
              alignItems="center"
              className={`${styles.subtitle}`}
            ></Stack>
            <hr />
            <div className={`${styles.title} ${styles.spaceMy}`}>
              <LabeledInput
                placeholder="Post title"
                type="text"
                className={`${LabelStyle.formControl}`}
                onChange={handlePostTitle}
                value={postTitle}
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
                <Typography
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    "@media (max-width: 992px)": {
                      fontSize: "14px",
                    },
                    "@media (max-width: 480px)": {
                      fontSize: "14px",
                    },
                  }}
                >
                  Drag here or
                  <span style={{ color: "#274593" }}>
                    upload a post cover image
                  </span>
                </Typography>
              </label>
              {newImage && <>{thumbs}</>}
            </div>
            {editorValue.map((_, index) => (
              <div key={index}>
                <ReactQuill
                  theme="snow"
                  value={editorValue[index]}
                  modules={{
                    toolbar: [...toolbarOptions],
                  }}
                  onChange={(value) => handleEditorValue(index, value)}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    fontFamily: "'Poppins' !important",
                    background: "#F0F0F0",
                  }}
                />
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent="flex-end"
                  onClick={() => handleDeleteContent(index)}
                  sx={{
                    mt: 3,
                    position: "relative",
                    bottom: "4rem",
                    right: 0,
                    margin: "10px",
                  }}
                >
                  <IconButton size="large" sx={{ background: "#d5e3f7" }}>
                    <SVG.DeleteIcon />
                  </IconButton>
                </Stack>
              </div>
            ))}
          </CardContent>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"center"}
            sx={{ marginBottom: "8px", color: "#848484" }}
          >
            <Button
              variant="link"
              onClick={handleAddParagraph}
              sx={{
                fontFamily: "Poppins",
              }}
            >
              <SVG.AddCircleIcon
                style={{ marginRight: "8px", color: "#848484" }}
              />
              <Box component={"span"}> Add one more Paragraph</Box>
            </Button>
          </Stack>
          {resourceId ? (
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ mb: "50px" }}
              gap={2}
            >
              <OutlinedButton
                onClick={() => handleUpdate(resourceId)}
                title={
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <SVG.AddCircleIcon />
                    <span> Update POST</span>
                  </Stack>
                }
                sx={{
                  color: "#274593",
                  borderColor: "#274593",
                  display: "flex",
                  justifyContent: "center",
                  width: "205px",
                }}
              />
              <Button
                variant="link"
                onClick={() => setPreview(true)}
                sx={{
                  fontFamily: "Poppins",
                  color: "#848484",
                }}
              >
                <Box component={"span"}>Preview</Box>
              </Button>
            </Stack>
          ) : (
            <Stack
              alignItems={"center"}
              direction={"column"}
              justifyContent={"center"}
              sx={{ mb: "50px" }}
              gap={2}
            >
              <OutlinedButton
                onClick={handleSubmit}
                title={
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    sx={{ display: "flex", alignItems: "normal" }}
                  >
                    <SVG.EyeIcon />
                    <span>PUBLISH POST</span>
                  </Stack>
                }
                sx={{
                  color: "#274593",
                  width: "205px",
                  height: "44px",
                  border: "0px !important",
                  backgroundColor: "#D5E3F7",
                  "&:hover": {
                    backgroundColor: "#D5E3F7",
                  },
                  "@media (max-width: 990px)": {
                    fontSize: "16px",
                  },
                  "@media (max-width: 480px)": {
                    fontWeight: "600",
                    width: "187px",
                    height: "42px",
                    fontSize: "14px",
                  },
                }}
              />
              <Button
                variant="link"
                onClick={() => setPreview(true)}
                sx={{
                  fontFamily: "Poppins",
                  color: "#848484",
                }}
              >
                <Box component={"span"}>Preview</Box>
              </Button>
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
        </Card>
      ) : (
        <Stack direction={"column"} justifyContent={"center"} gap={2}>
          <Box display="flex" textAlign="center">
            <Button onClick={() => setPreview(false)}>
              <SVG.ArrowLeftIcon />
            </Button>
            <h2>Preview</h2>
          </Box>
          {thumbs}
          <div
            dangerouslySetInnerHTML={{
              __html: editorValue,
            }}
          />
        </Stack>
      )}
    </>
  );
};
export default NewPostResource;
