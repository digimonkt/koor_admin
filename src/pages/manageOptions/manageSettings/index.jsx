import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";
// import { CARD_LIST } from "./helper";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "./change-password";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { getResourcesApi, resourcesDeleteApi } from "@api/manageoptions";
import { transformResourcesResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";
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
  const handleNewJob = () => {
    navigate("/settings/create-new-post");
  };
  const resourcesList = async () => {
    const response = await getResourcesApi();
    if (response.remote === "success") {
      const formateData = transformResourcesResponse(response.data.results);
      setCardList(formateData);
    } else {
      console.log(response.error);
    }
  };
  const handleUpdateResource = (id) => {
    console.log(id);
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
  useEffect(() => {
    resourcesList();
  }, []);
  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
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
                  <>
                    <SVG.EditNoteIcon /> create a new post
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
              ></OutlinedButton>
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
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
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
            <Grid item lg={12} xs={12}>
              <div className={`${styles.showButton}`}>
                <OutlinedButton
                  title={
                    <>
                      <SVG.ArrowDownIcon />
                      show more
                    </>
                  }
                  sx={{
                    "&.MuiButton-outlined": {
                      bgcolor: "#D5E3F7",
                      color: "#274593",
                      borderColor: "#D5E3F7",
                      hoverBgColor: "#b4d2fe",
                    },
                    "&:hover": {
                      color: "#b4d2fe",
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
          </Grid>

          <div className={`${styles.title} ${styles.spaceMy}`}>
            <h2>Change password</h2>
          </div>
          <ChangePassword />
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
