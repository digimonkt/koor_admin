import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./postTender.module.css";
import {
  DateInput,
  LabeledInput,
  SelectInput,
  AttachmentDragNDropInput,
} from "@components/input";
import CurrencyInput from "./currencyInput";
import { PAY_PERIOD } from "@utils/enum";
import { useFormik } from "formik";

import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTenderTags,
  getCountries,
  getTenderCategories,
  getCitiesByCountry,
  getTenderSector,
  getTenderOpportunityType,
} from "@redux/slice/choices";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { FilledButton, OutlinedButton } from "@components/button";
import { ErrorMessage } from "@components/caption";
import { useDebounce } from "usehooks-ts";
import {
  GetSuggestedAddressAPI,
  createTenderAPI,
  getCountriesName,
  // updateEmployerJobAPI,
} from "@api/jobs";
import { validateCreateTenderInput } from "@pages/manageJobsAndTenders/validator";
import dayjs from "dayjs";
import { DATABASE_DATE_FORMAT } from "@utils/constants/constants";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import SelectWithSearch from "@components/input/selectWithsearch";

const PostNewJob = () => {
  const {
    countries,
    sectors,
    cities,
    tags,
    tenderCategories,
    opportunityTypes,
  } = useSelector(({ choice }) => choice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tenderId, setTenderId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const debouncedSearchCountryValue = useDebounce(searchCountry, 500);
  const [countriesData, setCountriesData] = useState(countries.data);

  const formik = useFormik({
    initialValues: {
      title: "",
      budgetCurrency: "usd",
      budgetAmount: 0,
      budgetPayPeriod: PAY_PERIOD.month,
      description: "",
      country: { label: "", value: "" },
      city: { label: "", value: "" },
      address: "",
      categories: [],
      sectors: { label: "", value: "" },
      opportunityType: { label: "", value: "" },
      tag: { label: "", value: "" },
      startDate: "",
      deadline: "",
      attachments: [],
      attachmentsRemove: [],
    },
    validationSchema: validateCreateTenderInput,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        title: values.title,
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetAmount,
        budget_pay_period: values.budgetPayPeriod,
        description: values.description,
        country: values.country.value,
        city: values.city.value,
        sector: values.sectors.value,
        tender_type: values.opportunityType.value,
        tender_category: values.categories,
        deadline: dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        address: values.address,
        start_date: values.startDate
          ? dayjs(values.startDate).format(DATABASE_DATE_FORMAT)
          : "",
        attachments: values.attachments,
        attachments_remove: values.attachmentsRemove,
        tag: values.tag.value,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        if (key === "attachments") {
          payload.attachments.forEach((attachment) => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        } else if (payload[key].forEach) {
          payload[key].forEach((data) => newFormData.append(key, data));
        } else if (payload[key]) {
          newFormData.append(key, payload[key]);
        }
      }
      const res = await createTenderAPI(newFormData);
      if (res.remote === "success") {
        dispatch(setSuccessToast("Job Post Successfully"));
        setSuggestedAddress([]);
        setSearchValue("");
        resetForm();
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
    },
  });

  // Address
  const getSuggestedAddress = async (search) => {
    const res = await GetSuggestedAddressAPI(search);
    if (res.remote === "success") {
      setSuggestedAddress(res.data.predictions);
    }
  };
  const getCountryList = async () => {
    const limitParam = 10;
    const response = await getCountriesName({
      search: searchCountry,
      limit: limitParam,
    });
    if (response.remote === "success") {
      setCountriesData(response.data.results);
    }
  };
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCitiesByCountry({ countryId: formik.values.country?.value }));
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (
      debouncedSearchValue &&
      debouncedSearchValue !== formik.values.address
    ) {
      getSuggestedAddress(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  // Load Redux State
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!opportunityTypes.data.length) {
      dispatch(getTenderOpportunityType());
    }
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
    if (!tenderCategories.data.length) {
      dispatch(getTenderCategories());
    }
    if (!tags.data.length) {
      dispatch(getTenderTags());
    }
  }, []);
  useEffect(() => {
    getCountryList();
  }, [debouncedSearchCountryValue, !formik.values.country]);
  useEffect(() => {
    const newTenderId = searchParams.get("tenderId");
    if (newTenderId && tenderId !== newTenderId) setTenderId(newTenderId);
  }, [searchParams.get("tenderId")]);
  console.log({ cities });
  return (
    <div className="job-application">
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 3,
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px 25px 25px",
            },
          }}
        >
          <div className="job-content">
            <h2>
              {tenderId ? "Update tender" : "Post new tender"}
              <span className="right-pull">
                <IconButton LinkComponent={Link} to={"/manage-tenders"}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xl={8} lg={8} xs={12}>
                    <LabeledInput
                      title="Title of your tender"
                      className="add-form-control"
                      placeholder="Bed And Breakfast Temporary Accommodation"
                      required
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <ErrorMessage>{formik.errors.title}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4}>
                    <CurrencyInput
                      currency="USD"
                      title="Budget"
                      optionsValues={{
                        currency: formik.getFieldProps("budgetCurrency"),
                        input: formik.getFieldProps("budgetAmount"),
                      }}
                      errors={{
                        currency: formik.touched.budgetCurrency
                          ? formik.errors.budgetCurrency
                          : "",
                        input: formik.touched.budgetAmount
                          ? formik.errors.budgetAmount
                          : "",
                        payPeriod: formik.touched.budgetPayPeriod
                          ? formik.errors.budgetPayPeriod
                          : "",
                      }}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <div>
                      <label>
                        Description <span className="required-field">*</span>
                      </label>
                      <textarea
                        className="form-control-area"
                        placeholder="Write more details to attract the right candidates."
                        {...formik.getFieldProps("description")}
                      ></textarea>
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                      <ErrorMessage>{formik.errors.description}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={8} lg={8} xs={12}>
                    <label>
                      Location <span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} sm={6} xs={12}>
                        <SelectWithSearch
                          placeholder="Country"
                          sx={{
                            borderRadius: "10px",
                            background: "#F0F0F0",
                            fontFamily: "Poppins",

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
                          defaultValue=""
                          options={(countriesData || []).map((country) => ({
                            value: country.id,
                            label: country.title,
                          }))}
                          title={"select the options"}
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("country", value);
                            } else {
                              setSearchCountry("");
                              formik.setFieldValue("country", {
                                value: "",
                                label: "",
                              });
                            }
                          }}
                          value={formik.values.country}
                          onKeyUp={(e) => setSearchCountry(e.target.value)}
                        />
                        {formik.touched.country && formik.errors.country ? (
                          <ErrorMessage>{formik.errors.country}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} sm={6} xs={12}>
                        <SelectWithSearch
                          sx={{
                            borderRadius: "10px",
                            background: "#F0F0F0",
                            fontFamily: "Poppins",

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
                          options={(
                            cities.data[formik.values.country.value] || []
                          ).map((city) => ({
                            value: city.id,
                            label: city.title,
                          }))}
                          title={
                            formik.values.city ? "city" : "Select country first"
                          }
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("city", value);
                            } else {
                              // setSearchCountry("");
                              formik.setFieldValue("city", {
                                value: "",
                                label: "",
                              });
                            }
                          }}
                          value={formik.values.city}
                          // onKeyUp={(e) => setSearchCountry(e.target.value)}
                        />
                        {formik.touched.city && formik.errors.city ? (
                          <ErrorMessage>
                            {formik.errors.city.value}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={4} lg={4} sm={12} xs={12}>
                    <label>
                      Working place address{" "}
                      <span className="required-field">*</span>
                    </label>
                    <div className={styles.positionReltive}>
                      <input
                        type="text"
                        placeholder="Address"
                        className="add-form-control"
                        name={formik.getFieldProps("address").name}
                        onBlur={(e) => formik.getFieldProps("address").onBlur}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                      {debouncedSearchValue &&
                        searchValue !== formik.values.address && (
                          <div className={styles.search_results_box}>
                            {suggestedAddress.map((address) => {
                              return (
                                <div
                                  key={address.description}
                                  className={styles.search_results}
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "address",
                                      address.description
                                    );
                                    setSearchValue(address.description);
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
                  <Grid item xl={12} lg={12} sm={12} xs={12}>
                    <label>
                      Category <span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      <Grid item xl={5} lg={5} sm={12} xs={12}>
                        <SelectInput
                          multiple
                          defaultValue=""
                          placeholder="Select a Job category"
                          options={tenderCategories.data.map((category) => ({
                            value: category.id,
                            label: category.title,
                          }))}
                          name={"categories"}
                          value={formik.values.categories || []}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.categories &&
                        formik.errors.categories ? (
                          <ErrorMessage>
                            {formik.errors.categories}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} sm={6} xs={12}>
                        <label>
                          Sector <span className="required-field">*</span>
                        </label>
                        <SelectWithSearch
                          sx={{
                            borderRadius: "10px",
                            background: "#F0F0F0",
                            fontFamily: "Poppins",

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
                          defaultValue=""
                          options={(sectors.data || []).map((employer) => ({
                            value: employer.id,
                            label: employer.title,
                          }))}
                          title="Select a Sector"
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("sectors", value);
                            } else {
                              formik.setFieldValue("sectors", {
                                value: "",
                                label: "",
                              });
                            }
                          }}
                          value={formik.values.sectors}
                        />
                        {formik.touched.sectors && formik.errors.sectors ? (
                          <ErrorMessage>{formik.errors.sectors}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} sm={6} xs={12}>
                        <label>
                          Type <span className="required-field">*</span>
                        </label>
                        <SelectWithSearch
                          title="Select a type of opportunity"
                          defaultValue=""
                          sx={{
                            borderRadius: "10px",
                            background: "#F0F0F0",
                            fontFamily: "Poppins",

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
                          options={(opportunityTypes.data || []).map(
                            (opportunityType) => ({
                              value: opportunityType.id,
                              label: opportunityType.title,
                            })
                          )}
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("opportunityType", value);
                            } else {
                              formik.setFieldValue("opportunityType", {
                                value: "",
                                label: "",
                              });
                            }
                          }}
                          value={formik.values.opportunityType}
                        />
                        {formik.touched.opportunityType &&
                        formik.errors.opportunityType ? (
                          <ErrorMessage>
                            {formik.errors.opportunityType}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>
                          Tag <span className="required-field">*</span>
                        </label>
                        <SelectWithSearch
                          defaultValue=""
                          sx={{
                            borderRadius: "10px",
                            background: "#F0F0F0",
                            fontFamily: "Poppins",

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
                          title="Select a Tag"
                          options={(tags.data || []).map((tag) => ({
                            value: tag.id,
                            label: tag.title,
                          }))}
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("tag", value);
                            } else {
                              formik.setFieldValue("tag", {
                                value: "",
                                label: "",
                              });
                            }
                          }}
                          value={formik.values.tag}
                        />
                        {formik.touched.tag && formik.errors.tag ? (
                          <ErrorMessage>{formik.errors.tag}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={3} lg={3} xs={12} className="mt-2">
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="mb-2"
                          >
                            <label className="mb-1 d-inline-block">
                              Start Date{" "}
                              <span className="required-field">*</span>
                            </label>
                          </Stack>
                          <DateInput
                            onChange={(e) =>
                              formik.setFieldValue("startDate", e)
                            }
                            value={formik.values.startDate}
                            onBlur={formik.getFieldProps("startDate").onBlur}
                            minDate={dayjs()}
                          />
                          {formik.touched.startDate &&
                          formik.errors.startDate ? (
                            <ErrorMessage>
                              {formik.errors.startDate}
                            </ErrorMessage>
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item xl={3} lg={3} xs={12} className="mt-2">
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="mb-2"
                          >
                            <label className="mb-1 d-inline-block">
                              Deadline<span className="required-field">*</span>{" "}
                            </label>
                          </Stack>
                          <DateInput
                            onChange={(e) =>
                              formik.setFieldValue("deadline", e)
                            }
                            value={formik.values.deadline}
                            onBlur={formik.getFieldProps("deadline").onBlur}
                            minDate={formik.values.startDate || dayjs()}
                          />
                          {formik.touched.deadline && formik.errors.deadline ? (
                            <ErrorMessage>
                              {formik.errors.deadline}
                            </ErrorMessage>
                          ) : null}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                </Grid>

                <Grid item xl={12} lg={12} xs={12}>
                  <h2 className="mt-2 mb-3">Attach files</h2>
                  {formik.errors?.attachments ? (
                    <ErrorMessage>{formik.errors?.attachments}</ErrorMessage>
                  ) : null}
                  <AttachmentDragNDropInput
                    files={formik.getFieldProps("attachments").value}
                    handleDrop={(file) => {
                      const currentAttachments = formik.values.attachments;
                      if (file.length + currentAttachments.length > 10) {
                        formik.setFieldError(
                          "attachments",
                          `Maximum 10 files allowed. you can upload only ${
                            10 - currentAttachments.length
                          } remaining`
                        );
                      } else {
                        const filesTaken = file.slice(
                          0,
                          10 - currentAttachments.length
                        );
                        formik.setFieldValue("attachments", [
                          ...currentAttachments,
                          ...filesTaken,
                        ]);
                      }
                    }}
                    deleteFile={(file, index) => {
                      if (file.id) {
                        formik.setFieldValue("attachmentsRemove", [
                          ...formik.values.attachmentsRemove,
                          file.id,
                        ]);
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (attachment) => attachment.path !== file.path
                          )
                        );
                      } else {
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (_, i) => i !== index
                          )
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Divider
                    sx={{ borderColor: "#CACACA", opacity: "1", my: 2 }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ flexWrap: "wrap" }}
                  >
                    <OutlinedButton
                      title="Cancel"
                      sx={{
                        "&.MuiButton-outlined": {
                          borderRadius: "73px",
                          border: "0px",
                          color: "#848484 !important",
                          fontWeight: "500",
                          fontSize: "16px",
                          fontFamily: "Bahnschrift",
                          padding: "6px 50px",

                          "&:hover": {
                            background: "rgba(40, 71, 146, 0.1)",
                            color: "#274593",
                          },
                          "@media (max-width: 992px)": {
                            padding: "5px 15px",
                            fontSize: "14px",
                          },
                          "@media (max-width: 480px)": {
                            fontSize: "14px !important",
                            marginBottom: "10px",
                            width: "100%",
                          },
                        },
                      }}
                      disabled={formik.isSubmitting}
                      onClick={() => navigate("/employer/manage-tenders")}
                    />
                    <FilledButton
                      sx={{
                        fontSize: "16px !important",
                        "@media (max-width: 480px)": {
                          fontSize: "14px !important",
                          width: "100%",
                        },
                      }}
                      title={
                        formik.isSubmitting
                          ? tenderId
                            ? "Updating..."
                            : "Posting..."
                          : tenderId
                          ? "Update the tender"
                          : "POST THE TENDER"
                      }
                      type="submit"
                      disabled={formik.isSubmitting}
                    />
                  </Stack>
                </Grid>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostNewJob;
