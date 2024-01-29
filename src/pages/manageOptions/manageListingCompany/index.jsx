import {
  Card,
  CardContent,
  Grid,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import styles from "@pages/manageOptions/manageSettings/styles.module.css";
import { styled } from "@mui/material/styles";
import { SVG } from "@assets/svg";
import ImageCropper from "@components/imageCropper";
import React, { useEffect, useState } from "react";
import { OutlinedButton } from "@components/button";
import {
  addCategoryLogoApi,
  deleteCompanyLogoApi,
  getCompanyListingApi,
} from "@api/manageoptions";
import { transformCompanyListResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import Loader from "@components/loader";

const StyledButton = styled(IconButton)(() => ({
  background: "#D5E3F7",
  width: "30px",
  height: "30px",
  color: "#274593",
  position: "absolute",
  top: "5px",
  right: "5px",
  "&:hover": {
    background: "#b4d2fe",
  },
}));

const ManageListingCompany = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [deleting, setDeleting] = useState("");
  const [companyLogoList, setCompanyLogoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const thumbs = (
    <Avatar
      sx={{
        width: "auto",
        height: "100%",
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

  //* image cropper function start
  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  const handleUpdateImage = (file) => {
    setNewImage(file);
    setFiles([]);
  };
  //* image cropper function end

  //* get All listing  company start
  const getCompanyLogoList = async () => {
    setLoading(true);
    const response = await getCompanyListingApi();
    if (response.remote === "success") {
      const formateData = transformCompanyListResponse(response.data);
      setCompanyLogoList(formateData);
      setLoading(false);
    }
  };
  // *Add Company  Logo start
  const handleAddLogo = async () => {
    const payload = {
      category_logo: newImage,
    };
    const newFormData = new FormData();
    newFormData.set("category_logo", payload.category_logo);
    const response = await addCategoryLogoApi(payload);
    if (response.remote === "success") {
      const updateData = [...companyLogoList];
      updateData.push({
        id: response.data.id,
        imgUrl: response.data.path,
      });
      setCompanyLogoList([...updateData]);
      setNewImage("");
      setFiles([]);
      dispatch(setSuccessToast("Add company image SuccessFully"));
    } else {
      if (response.error.errors.category_logo) {
        dispatch(setErrorToast("Field can not be blank"));
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
    }
  };
  // *Add Company  Logo End
  const handleDelete = async () => {
    const response = await deleteCompanyLogoApi(deleting);
    if (response.remote === "success") {
      const newLogo = companyLogoList.filter((res) => res.id !== deleting);
      setCompanyLogoList(newLogo);
      setDeleting("");
      dispatch(setSuccessToast("Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  useEffect(() => {
    getCompanyLogoList();
  }, []);
  //* get All listing  company end

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
            spacing={2}
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
                  <span style={{ color: "blue" }}>
                    {" "}
                    upload a post Company Image
                  </span>
                </p>
              </label>
              {newImage && <>{thumbs}</>}
            </div>
            <OutlinedButton
              onClick={handleAddLogo}
              title={<>Add</>}
              sx={{
                "&.MuiButton-outlined": {
                  borderRadius: "10px !important",
                  border: "1px solid #274593",
                  color: "#274593",
                  fontWeight: "500",
                  fontSize: "16px",
                  fontFamily: "Bahnschrift",
                  padding: "10px 30px",
                  width: "30%",
                },
              }}
            ></OutlinedButton>
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
            <h3>Listed Companies</h3>
          </Stack>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <Grid container spacing={2.5}>
              {companyLogoList.map((logo, index) => (
                <Grid item xs={6} sm={5} lg={4} xl={2} key={index}>
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
                          p: 0.5,
                        },
                      }}
                    >
                      <div className={`${styles.imageBox}`}>
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}${logo.imgUrl}`}
                          height={240}
                          style={{ objectFit: "contain" }}
                        />
                        <StyledButton>
                          <SVG.DeleteIcon
                            onClick={() => setDeleting(logo.id)}
                          />
                        </StyledButton>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      <ImageCropper
        open={files[0]}
        handleClose={() => {
          setFiles([]);
        }}
        handleSave={handleUpdateImage}
        image={files[0]}
      />
      <DialogBox open={!!deleting} handleClose={() => setDeleting("")}>
        <DeleteCard
          title="Delete Resource"
          content="Are you sure you want to delete resource?"
          handleCancel={() => setDeleting("")}
          handleDelete={handleDelete}
        />
      </DialogBox>
    </>
  );
};

export default ManageListingCompany;
