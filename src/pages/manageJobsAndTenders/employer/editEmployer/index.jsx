import { updateEmployerProfileImageAPI, editEmployerAPI } from "@api/employers";
import { GetSuggestedAddressAPI } from "@api/jobs";
import { getUserDetailsApi } from "@api/manageoptions";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import ImageCropper from "@components/imageCropper";
import {
  // AttachmentDragNDropInput,
  LabeledInput,
} from "@components/input";
import SelectWithSearch from "@components/input/selectWithsearch";
import Loader from "@components/loader";
import { Avatar, Card, CardContent, Grid } from "@mui/material";
import {
  getCitiesByCountry,
  // getCitiesByCountry,
  getCountries,
  getTenderSector,
} from "@redux/slice/choices";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { ErrorMessage, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";

const EditEmployer = () => {
  const dispatch = useDispatch();
  const { id } = useParams("id");
  const [loading, setLoading] = useState(false);
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [suggestedAddressValue, setSuggestedAddressValue] = useState("");
  const [files, setFiles] = useState([]);
  const [newImage, setNewImage] = useState("");

  const handleUpdateImage = (file) => {
    setNewImage(file);
    setFiles([]);
  };

  const { sectors, cities, countries } = useSelector((state) => state.choice);
  const debouncedSearchValue = useDebounce(suggestedAddressValue, 500);
  const formik = useFormik({
    initialValues: {
      organizationName: "",
      organizationType: {
        label: "",
        value: "",
      },
      licenseId: "",
      country: {
        label: "",
        value: "",
      },
      city: {
        label: "",
        value: "",
      },
      address: "",
      description: "",
    },
    // validationSchema: validateEmployerAboutMe,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        organization_type: values.organizationType.value,
        organization_name: values.organizationName,
        country: values.country.value,
        city: values.city.value,
        address: values.address,
        description: values.description,
        license_id: values.licenseId,
      };

      const formData = new FormData();
      for (const key in payload) {
        if (key === "license") {
          if (payload[key] instanceof File) {
            formData.append(key, payload[key]);
          }
        } else {
          if (payload[key]) formData.append(key, payload[key]);
        }
      }

      const imgFormData = new FormData();
      imgFormData.append("profile_image", newImage);
      console.log(newImage);
      const res = await editEmployerAPI(id, formData);
      if (res.remote === "success") {
        const imgRes = await updateEmployerProfileImageAPI(id, imgFormData);
        if (imgRes) {
          dispatch(setSuccessToast("Employer updated successfully"));
          setLoading(false);
        }
      } else {
        dispatch(setErrorToast("Something went wrong"));
        setLoading(false);
      }
    },
  });

  const getSuggestedAddress = async (search) => {
    const res = await GetSuggestedAddressAPI(search);
    if (res.remote === "success") {
      setSuggestedAddress(res.data.predictions);
    }
  };

  const setFields = async () => {
    const res = await getUserDetailsApi(id);
    if (res.remote === "success") {
      formik.setFieldValue("organizationName", res.data.name);
      formik.setFieldValue("country", {
        label: res.data.profile.country.title || "",
        value: res.data.profile.country.id || "",
      });
      formik.setFieldValue("city", {
        label: res.data.profile.city.title || "",
        value: res.data.profile.city.id || "",
      });
      formik.setFieldValue("address", res.data.profile.address);
      setSuggestedAddressValue(res.data.profile.address);
      formik.setFieldValue("organizationType", {
        label: res.data.profile.organization_type.title || "",
        value: res.data.profile.organization_type.id || "",
      });
      formik.setFieldValue("description", res.data.profile.description);
      setNewImage(res.data.image);
      formik.setFieldValue("licenseId", res.data.profile.license_id);
    }
  };

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

  useEffect(() => {
    if (
      formik.values?.country?.value &&
      !cities.data[formik.values?.country?.value]?.length
    ) {
      dispatch(
        getCitiesByCountry({ countryId: formik.values?.country?.value })
      );
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
  }, []);

  useEffect(() => {
    if (
      debouncedSearchValue &&
      debouncedSearchValue !== formik.values.address
    ) {
      getSuggestedAddress(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    setFields();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFiles([
        Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        }),
      ]);
    }
  };

  return (
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
            padding: "30px",
            width: { sm: "100%", xl: "30%" },
          },
        }}
      >
        <div className="add-content">
          <h2 className="mb-4">About</h2>
          <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} className="mb-2">
                  <LabeledInput
                    title="Organization Name"
                    className="add-form-control"
                    placeholder="Organization Name"
                    label="Organization Name"
                    {...formik.getFieldProps("organizationName")}
                  />
                  {formik.touched.organizationName &&
                  formik.errors.organizationName ? (
                    <ErrorMessage>
                      {formik.errors.organizationName}
                    </ErrorMessage>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <label>
                    Organization Type
                    <span className="required-field">*</span>
                  </label>
                  <SelectWithSearch
                    sx={{
                      borderRadius: "10px",
                      background: "#F0F0F0",
                      fontFamily: "Poppins",
                      marginTop: "10px",
                      "& fieldset": {
                        border: "1px solid #cacaca",
                        borderRadius: "93px",
                        display: "none",
                        "&:hover": { borderColor: "#cacaca" },
                      },
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Poppins",
                        padding: "4px 9px",
                      },
                      "& .MuiFormLabel-root": {
                        fontSize: "16px",
                        color: "#848484",
                        fontFamily: "Poppins !important",
                        transform: "translate(14px, 12px) scale(1)",
                      },
                      "& .MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    }}
                    title="Type of the organization"
                    type="select"
                    options={sectors.data.map((sector) => ({
                      value: sector.id,
                      label: sector.title,
                    }))}
                    onChange={(_, value) => {
                      if (value) {
                        formik.setFieldValue("organizationType", value);
                      } else {
                        formik.setFieldValue("organizationType", {
                          value: "",
                          label: "",
                        });
                      }
                    }}
                    value={formik.values.organizationType}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>
                    Working place address{" "}
                    <span className="required-field">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      className="add-form-control"
                      name={formik.getFieldProps("address").name}
                      onBlur={(e) => formik.getFieldProps("address").onBlur}
                      onChange={(e) => setSuggestedAddressValue(e.target.value)}
                      value={suggestedAddressValue}
                    />
                    {debouncedSearchValue &&
                      suggestedAddressValue !== formik.values.address && (
                        <div>
                          {suggestedAddress?.map((address) => {
                            return (
                              <div
                                key={address.description}
                                onClick={() => {
                                  formik.setFieldValue(
                                    "address",
                                    address.description
                                  );
                                  setSuggestedAddressValue(address.description);
                                }}
                              >
                                {address.description}
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                  {formik.touched.address && formik.errors.address ? (
                    <ErrorMessage>{formik.errors.address}</ErrorMessage>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <label>
                    Country
                    <span className="required-field">*</span>
                  </label>
                  <SelectWithSearch
                    sx={{
                      borderRadius: "10px",
                      background: "#F0F0F0",
                      fontFamily: "Poppins",
                      marginTop: "10px",
                      "& fieldset": {
                        border: "1px solid #cacaca",
                        borderRadius: "93px",
                        display: "none",
                        "&:hover": { borderColor: "#cacaca" },
                      },
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Poppins",
                        padding: "4px 9px",
                      },
                      "& .MuiFormLabel-root": {
                        fontSize: "16px",
                        color: "#848484",
                        fontFamily: "Poppins !important",
                        transform: "translate(14px, 12px) scale(1)",
                      },
                      "& .MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    }}
                    title="Type of the country"
                    type="select"
                    options={countries.data.map((country) => ({
                      value: country.id,
                      label: country.title,
                    }))}
                    onChange={(_, value) => {
                      if (value) {
                        formik.setFieldValue("country", value);
                      } else {
                        formik.setFieldValue("country", {
                          value: "",
                          label: "",
                        });
                      }
                    }}
                    value={formik.values.country}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <label>
                    City
                    <span className="required-field">*</span>
                  </label>
                  <SelectWithSearch
                    sx={{
                      borderRadius: "10px",
                      background: "#F0F0F0",
                      fontFamily: "Poppins",
                      marginTop: "10px",
                      "& fieldset": {
                        border: "1px solid #cacaca",
                        borderRadius: "93px",
                        display: "none",
                        "&:hover": { borderColor: "#cacaca" },
                      },
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Poppins",
                        padding: "4px 9px",
                      },
                      "& .MuiFormLabel-root": {
                        fontSize: "16px",
                        color: "#848484",
                        fontFamily: "Poppins !important",
                        transform: "translate(14px, 12px) scale(1)",
                      },
                      "& .MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    }}
                    title="Type of the city"
                    type="select"
                    options={(
                      cities.data[formik.values.country.value] || []
                    ).map((city) => ({
                      value: city.id,
                      label: city.title,
                    }))}
                    onChange={(_, value) => {
                      if (value) {
                        formik.setFieldValue("city", value);
                      } else {
                        formik.setFieldValue("city", {
                          value: "",
                          label: "",
                        });
                      }
                    }}
                    value={formik.values.city}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LabeledInput
                    placeholder="Description"
                    title="Description"
                    type="textarea"
                    className="add-form-control"
                    {...formik.getFieldProps("description")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LabeledInput
                    placeholder="License ID"
                    title="License ID"
                    className="add-form-control"
                    {...formik.getFieldProps("licenseId")}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    className="dashedborder mb-3"
                  >
                    <AttachmentDragNDropInput
                      handleDrop={(e) => formik.setFieldValue("license", e)}
                      single
                      files={formik.values.license}
                      deleteFile={(e) => formik.setFieldValue("license", [])}
                    />
                  </Stack>
                  {formik.touched.license && formik.errors.license ? (
                    <ErrorMessage>{formik.errors.license}</ErrorMessage>
                  ) : null}
                  </Grid> */}
                <Grid item xs={12}>
                  <label>Your Organization Logo </label>
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
                          padding: "30px",
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
                            encType="multipart/form-data" // Add this line
                            accept="image/*"
                            onChange={handleFileChange}
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
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <div className="text-center mt-3">
                    <OutlinedButton
                      variant="outlined"
                      title={
                        loading ? (
                          <Loader loading={loading} />
                        ) : (
                          <>
                            <SVG.CheckBoxIcon />
                            &nbsp;Update Info
                          </>
                        )
                      }
                      type="submit"
                      disabled={loading}
                    ></OutlinedButton>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
        <ImageCropper
          open={files[0]}
          handleClose={() => {
            setFiles([]);
          }}
          handleSave={handleUpdateImage}
          image={files[0]}
        />
      </CardContent>
    </Card>
  );
};

export default EditEmployer;
