import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";
import { CARD_LIST } from "./helper";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "./change-password";
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
  const navigate = useNavigate();
  const handleNewJob = () => {
    navigate("/settings/create-new-post");
  };
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
            {CARD_LIST.map((item, index) => (
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
                          <img src={item.imgUrl} alt="" />
                          {item.playIcon}
                        </div>
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <div className={`${styles.settingDescription}`}>
                          <h2>{item.title}</h2>
                          <p>{item.description}</p>
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
                            <StyledButton>
                              <SVG.DeleteIcon />
                            </StyledButton>
                            <StyledButton>
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
    </>
  );
};
export default ManageSettingsComponent;
