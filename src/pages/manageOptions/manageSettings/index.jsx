import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./change-password";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { getResourcesApi, resourcesDeleteApi } from "@api/manageoptions";
import { transformResourcesResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";
import AddJobPoint from "./addJobPoint";
const StyledButton = styled(IconButton)(() => ({
  background: "#D5E3F7",
  width: "30px",
  height: "30px",
  color: "#274593",
  "&:hover": {
    background: "#b4d2fe",
  },
}));
const ManageSettingsComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardList, setCardList] = useState([]);
  const [deleting, setDeleting] = useState("");
  const [limit, setLimit] = useState(2);
  const [checkLimit, setCheckLimit] = useState("");
  const handleNewJob = () => {
    navigate("/settings/create-new-post");
  };
  const resourcesList = async () => {
    const response = await getResourcesApi(limit);
    if (response.remote === "success") {
      setCheckLimit(response.data.next);
      const formateData = transformResourcesResponse(response.data.results);
      setCardList(formateData);
    }
  };
  const handleUpdateResource = (id) => {
    navigate(`/settings/create-new-post/${id}`);
  };

  const handleDeleteResource = async () => {
    const response = await resourcesDeleteApi(deleting);
    if (response.remote === "success") {
      const newResources = cardList.filter((res) => res.id !== deleting);
      setCardList(newResources);
      setDeleting("");
      dispatch(setSuccessToast("Resource Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  function handleShowMore() {
    setLimit(limit + 2);
  }

  const removeImagesFromHTMLArray = (htmlArray) => {
    const imgRegex = /<img[^>]+>/g;
    return htmlArray.map((html) => html.replace(imgRegex, ""));
  };

  useEffect(() => {
    resourcesList();
  }, [limit]);

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 10,
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
            <h2>Content management</h2>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            justifyContent="space-between"
            alignItems="center"
            className={`${styles.subtitle}`}
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
            <h3>Resources</h3>
            <div onClick={() => handleNewJob()}>
              <OutlinedButton
                title={
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <SVG.EditNoteIcon /> <span>create a new post</span>
                  </Stack>
                }
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",
                    border: "1px solid #274593",
                    color: "#274593",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    padding: "10px 30px",
                  },
                }}
              />
            </div>
          </Stack>
          <Grid container spacing={2.5}>
            {cardList.map((item, index) => (
              <Grid item lg={6} xs={12} key={index}>
                <Card
                  sx={{
                    "&.MuiCard-root": {
                      boxShadow: "none",
                      borderRadius: "10px",
                      border: "1px solid #CACACA",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      "&.MuiCardContent-root": {
                        p: {
                          xs: 2,
                          sm: 1,
                          md: 2.5,
                          lg: 2.5,
                          xl: 2.5,
                        },
                      },
                    }}
                  >
                    <Grid container spacing={2.5}>
                      <Grid item lg={6} xs={12}>
                        <div className={`${styles.imageBox}`}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}${item.imgUrl}`}
                            alt=""
                          />
                          {item.playIcon}
                        </div>
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <div className={`${styles.settingDescription}`}>
                          <h2>{item.title}</h2>

                          {removeImagesFromHTMLArray(item.description)?.map(
                            (html, innerIndex) => (
                              <div
                                key={innerIndex}
                                dangerouslySetInnerHTML={{
                                  __html: html?.slice(0, 300) + "......",
                                }}
                              />
                            )
                          )}

                          <Stack
                            direction="row"
                            spacing={1.5}
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              mt: {
                                lg: 1.5,
                                xs: 1.5,
                              },
                            }}
                          >
                            <StyledButton>
                              <SVG.EyeIcon />
                            </StyledButton>
                            <StyledButton onClick={() => setDeleting(item.id)}>
                              <SVG.DeleteIcon />
                            </StyledButton>
                            <StyledButton
                              onClick={() => handleUpdateResource(item.id)}
                            >
                              <SVG.EditIcon />
                            </StyledButton>
                          </Stack>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {checkLimit !== null ? (
              <Grid item lg={12} xs={12}>
                <div
                  className={`${styles.showButton}`}
                  onClick={handleShowMore}
                >
                  <OutlinedButton
                    title={
                      <>
                        <SVG.ArrowDownIcon style={{ marginRight: "8px" }} />
                        show more
                      </>
                    }
                    sx={{
                      "&.MuiButton-outlined": {
                        borderRadius: "73px",
                        border: "1px solid #274593",
                        color: "#274593",
                        fontWeight: "500",
                        fontSize: "16px",
                        fontFamily: "Bahnschrift",
                        padding: "10px 30px",
                      },
                    }}
                  >
                    <span className="d-inline-flex me-2">
                      <SVG.ArrowDownIcon />
                    </span>
                  </OutlinedButton>
                </div>
                <Divider sx={{ borderColor: "#CACACA" }} />
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          <div className={`${styles.title} ${styles.spaceMy}`}>
            <h2>Change password</h2>
          </div>
          <ChangePassword />
          <div className={`${styles.title} ${styles.spaceMy}`}>
            <h2>Set Job Points</h2>
          </div>
          <AddJobPoint />
        </CardContent>
      </Card>
      <DialogBox open={!!deleting} handleClose={() => setDeleting("")}>
        <DeleteCard
          title="Delete Resource"
          content="Are you sure you want to delete resource?"
          handleCancel={() => setDeleting("")}
          handleDelete={handleDeleteResource}
        />
      </DialogBox>
    </>
  );
};
export default ManageSettingsComponent;
