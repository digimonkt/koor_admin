import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "@pages/manageOptions/manageSettings/styles.module.css";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  getTestimonialListApi,
  testimonialDeleteApi,
} from "@api/manageTestimonial";
import { transformTestimonialResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
import Loader from "@components/loader";
const ManageTestimonials = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [checkLimit, setCheckLimit] = useState(null);
  const [deleting, setDeleting] = useState("");
  const [limit, setLimit] = useState(2);
  const [loading, setLoading] = useState(false);
  const handleNewJob = () => {
    navigate("/post-testimonials");
  };

  const handleUpdateTestimonial = (id) => {
    navigate(`/post-testimonials/${id}`);
  };
  const StyledButton = styled(IconButton)(() => ({
    background: "#D5E3F7",
    width: "30px",
    height: "30px",
    color: "#274593",
    "&:hover": {
      background: "#b4d2fe",
    },
  }));
  const testimonialList = async () => {
    setLoading(true);
    const response = await getTestimonialListApi(limit);
    if (response.remote === "success") {
      setCheckLimit(response.data.next);
      const formateData = transformTestimonialResponse(response.data.results);
      setTestimonialsList(formateData);
      setLoading(false);
    }
  };

  function handleShowMore() {
    setLimit(limit + 2);
  }
  const handleDeleteResource = async () => {
    const response = await testimonialDeleteApi(deleting);
    if (response.remote === "success") {
      const newTestimonial = testimonialsList.filter(
        (res) => res.id !== deleting
      );
      setTestimonialsList(newTestimonial);
      setDeleting("");
      dispatch(setSuccessToast("Testimonial Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  useEffect(() => {
    testimonialList();
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
            <h2>Testimonials</h2>
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
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <Grid container spacing={2.5}>
              {testimonialsList.map((item, index) => (
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
                              src={`${process.env.REACT_APP_BACKEND_URL}${item.imageUrl}`}
                              alt=""
                            />
                          </div>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <div className={`${styles.settingDescription}`}>
                            <h2>{item.clientName}</h2>

                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.description?.slice(0, 100) + "......",
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
                              <StyledButton
                                onClick={() => setDeleting(item.id)}
                              >
                                <SVG.DeleteIcon />
                              </StyledButton>
                              <StyledButton
                                onClick={() => handleUpdateTestimonial(item.id)}
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
              {checkLimit === null ? (
                ""
              ) : (
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
              )}
            </Grid>
          )}
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

export default ManageTestimonials;
