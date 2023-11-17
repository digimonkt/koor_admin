import React, { useCallback, useEffect, useState } from "react";
import styles from "./postJobs.module.css";
import { JobFormControl } from "./style";
import {
  DateInput,
  CheckboxInput,
  LabeledInput,
  SelectInput,
  AttachmentDragNDropInput,
  ProfilePicInput,
} from "@components/input";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyInput from "./currencyInput";
import { PAY_PERIOD, SUBMITTING_STATUS_ENUM } from "@utils/enum";
import { useFormik } from "formik";

import {
  Card,
  CardContent,
  Divider,
  FormGroup,
  Grid,
  Stack,
  Radio,
  FormControlLabel,
  RadioGroup,
  IconButton,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCitiesByCountry,
  getEducationLevels,
  getCategories,
  getSubCategories,
  getLanguages,
  getSkills,
  getEmployers,
} from "@redux/slice/choices";
import { Link, useSearchParams } from "react-router-dom";
import { FilledButton } from "@components/button";
import { ErrorMessage } from "@components/caption";
import SelectWithSearch from "@components/input/selectWithsearch";
import { manageEmployer } from "@api/employers";
import { useDebounce } from "usehooks-ts";
import {
  GetSuggestedAddressAPI,
  createJobAPI,
  getCountriesName,
  getJobDetailsByIdAPI,
  updateEmployerJobAPI,
} from "@api/jobs";
import { validateCreateJobInput } from "@pages/manageJobsAndTenders/validator";
import dayjs from "dayjs";
import { DATABASE_DATE_FORMAT } from "@utils/constants/constants";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";

const PostNewJob = () => {
  const {
    countries,
    educationLevels,
    categories,
    subCategories,
    languages,
    skills,
    cities,
    // worldCities,
    employers,
  } = useSelector(({ choice }) => choice);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState("exist");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    formik.setFieldValue("companyType", selectedValue);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyAttachments, setCompanyAttachments] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [employersData, setEmployersData] = useState(employers.data);
  const [countriesData, setCountriesData] = useState(countries.data);
  const debouncedSearchCountryValue = useDebounce(searchCountry, 500);
  const debouncedSearchEmployerValue = useDebounce(searchTerm, 500);
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [suggestedAddressValue, setSuggestedAddressValue] = useState("");
  const debouncedSearchValue = useDebounce(suggestedAddressValue, 500);
  const [submitting, setSubmitting] = useState(SUBMITTING_STATUS_ENUM.null);
  const [jobId, setJobId] = useState(null);
  const [searchParams] = useSearchParams();

  const getEmployerList = async () => {
    let limitParam = 10;
    if (jobId) {
      limitParam = 500;
    }
    const response = await manageEmployer({
      search: searchTerm,
      limit: limitParam,
    });
    if (response.remote === "success") {
      setEmployersData(response.data.results);
    }
  };
  const getCountryList = async () => {
    let limitParam = 10;
    if (jobId) {
      limitParam = 500;
    }
    const response = await getCountriesName({
      search: searchCountry,
      limit: limitParam,
    });
    if (response.remote === "success") {
      setCountriesData(response.data.results);
    }
  };

  // !! formik  validation start
  const formik = useFormik({
    initialValues: {
      companyType: "",
      existCompany: { label: "", value: "" },
      company: "",
      companyLogo: [],
      companyLogoRemove: [],
      title: "",
      budgetCurrency: "usd",
      budgetAmount: 0,
      budgetPayPeriod: PAY_PERIOD.month,
      description: "",
      country: { label: "", value: "" },
      city: { label: "", value: "" },
      address: "",
      jobCategories: { label: "", value: "" },
      jobSubCategory: { label: "", value: "" },
      isFullTime: false,
      isPartTime: false,
      hasContract: false,
      deadline: "",
      startDate: "",
      isContactEmail: false,
      contactEmail: "",
      cc1: "",
      cc2: "",
      isContactWhatsapp: false,
      applicationInstruction: "",
      isApplyThroughEmail: false,
      isApplyThroughKoor: false,
      isApplyThroughWebsite: false,
      duration: 0,
      experience: "",
      countryCodeContactWhatsapp: "",
      websiteLink: "",
      contactWhatsapp: "",
      highestEducation: { label: "", value: "" },
      languages: [{ language: "" }, { language: "" }, { language: "" }],
      skills: [],
      attachments: [],
      attachmentsRemove: [],
    },
    validationSchema: validateCreateJobInput,
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(SUBMITTING_STATUS_ENUM.loading);
      const payload = {
        company_type: selectedValue,
        company: values.company,
        company_logo_item: values.companyLogo,
        exist_company: values.existCompany,
        title: values.title,
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetAmount,
        budget_pay_period: values.budgetPayPeriod,
        description: values.description,
        country: values.country.value,
        city: values.city.value,
        address: values.address,
        job_category: values.jobCategories.value,
        job_sub_category: values.jobSubCategory.value,
        is_full_time: values.isFullTime,
        is_part_time: values.isPartTime,
        has_contract: values.hasContract,
        deadline: dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        start_date: values.startDate
          ? dayjs(values.startDate).format(DATABASE_DATE_FORMAT)
          : "",
        contact_email: values?.contactEmail || "",
        cc1: values?.cc1 || "",
        cc2: values?.cc2 || "",
        contact_whatsapp: values.isContactWhatsapp
          ? values.contactWhatsapp
          : "",
        apply_through_koor: values.isApplyThroughKoor || "false",
        apply_through_email: values.isApplyThroughEmail || "false",
        apply_through_website: values.isApplyThroughWebsite || "false",
        website_link: values.websiteLink,
        highest_education: values.highestEducation.value || "",
        language: values.languages,
        skill: values.skills,
        application_instruction: values.applicationInstruction,
        attachments: values.attachments,
        attachments_remove: values.attachmentsRemove,
        duration: values.duration,
        experience: values.experience,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        if (key === "language") {
          payload.language.forEach((language) => {
            if (language.language) {
              newFormData.append("language", JSON.stringify(language));
            }
          });
        } else if (key === "attachments") {
          payload.attachments.forEach((attachment) => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        } else if (key === "company_logo_item") {
          payload.company_logo_item.forEach((attachment) => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        } else {
          if (payload[key]) {
            if (payload[key].forEach) {
              payload[key].forEach((data) => {
                newFormData.append(key, data);
              });
            } else {
              if (payload[key]) newFormData.append(key, payload[key]);
            }
          }
        }
      }
      let res;
      if (!jobId) {
        // create
        res = await createJobAPI(newFormData);
        if (res.remote === "success") {
          // dispatch(setJobPostUpdate(true));
          setSubmitting(SUBMITTING_STATUS_ENUM.submitted);
          dispatch(setSuccessToast("Job Post Successfully"));
          resetForm();
          setSuggestedAddressValue("");
          setSuggestedAddress([]);
          setCompanyLogo();
          setCompanyAttachments("");
        } else {
          dispatch(setErrorToast("Something went wrong"));
          setSubmitting(SUBMITTING_STATUS_ENUM.error);
        }
      } else {
        // update
        res = await updateEmployerJobAPI(jobId, newFormData);
        if (res.remote === "success") {
          // dispatch(setJobPostUpdate(true));
          setSubmitting(SUBMITTING_STATUS_ENUM.updated);
          dispatch(setSuccessToast("Job Updated Successfully"));
        } else {
          setSubmitting(SUBMITTING_STATUS_ENUM.error);
          dispatch(setErrorToast("Something went wrong"));
        }
      }
    },
  });

  // !! formik  validation end
  const getSuggestedAddress = async (search) => {
    const res = await GetSuggestedAddressAPI(search);
    if (res.remote === "success") {
      setSuggestedAddress(res.data.predictions);
    }
  };
  const getJobDetailsById = useCallback(async (jobId) => {
    const response = await getJobDetailsByIdAPI({ jobId });
    if (response.remote === "success") {
      const { data } = response;
      if (!data.user?.id) {
        setSelectedValue("new");
      }
      setCompanyLogo(data.companyLogo);
      setCompanyAttachments(data.attachments);
      formik.setFieldValue("companyType", selectedValue);
      formik.setFieldValue("company", data.company);
      formik.setFieldValue("existCompany", {
        value: data.user?.id || "",
        label: data.user?.name || "",
      });
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("budgetCurrency", data.budgetCurrency);
      formik.setFieldValue(
        "budgetAmount",
        parseInt(data.budgetAmount.replace(/,/g, ""), 10)
      );
      formik.setFieldValue("budgetPayPeriod", data.budgetPayPeriod);
      formik.setFieldValue("description", data.description);
      formik.setFieldValue("country", {
        value: data.country.id,
        label: data.country.title,
      });
      // formik.setFieldValue("city", data.city.id);
      formik.setFieldValue("city", {
        value: data.city.id,
        label: data.city.title,
      });
      formik.setFieldValue("address", data.address);
      formik.setFieldValue("duration", data.duration);
      formik.setFieldValue("experience", data.experience);
      setSuggestedAddressValue(data.address);
      formik.setFieldValue("websiteLink", data.websiteLink);
      formik.setFieldValue("jobCategories", {
        value: data.jobCategories.id,
        label: data.jobCategories.title,
      });
      formik.setFieldValue("jobSubCategory", {
        value: data.jobSubCategory.id,
        label: data.jobSubCategory.title,
      });
      formik.setFieldValue(
        "isApplyThroughEmail",
        Boolean(data.isApplyThroughEmail)
      );
      formik.setFieldValue("isFullTime", data.isFullTime);
      formik.setFieldValue("isPartTime", data.isPartTime);
      formik.setFieldValue("hasContract", data.hasContract);
      formik.setFieldValue("deadline", dayjs(data.deadline));
      formik.setFieldValue("startDate", dayjs(data.startDate));
      formik.setFieldValue("isContactEmail", Boolean(data.contactEmail));
      formik.setFieldValue(
        "isApplyThroughKoor",
        Boolean(data.isApplyThroughKoor)
      );
      formik.setFieldValue("contactEmail", data.contactEmail);
      formik.setFieldValue("cc1", data.cc1);
      formik.setFieldValue("cc2", data.cc2);
      formik.setFieldValue("isContactWhatsapp", Boolean(data.contactWhatsapp));
      formik.setFieldValue("contactWhatsapp", data.contactWhatsapp);
      formik.setFieldValue(
        "applicationInstruction",
        data.applicationInstruction
      );
      formik.setFieldValue(
        "isApplyThroughWebsite",
        Boolean(data.isApplyThroughWebsite)
      );
      formik.setFieldValue(
        "languages",
        data.languages.map && data.languages.length
          ? [
              ...data.languages.map((language) => ({
                language: language.language.id,
              })),
              {
                language: "",
              },
              {
                language: "",
              },
            ]
          : [1, 2, 3].map(() => ({
              language: "",
            }))
      );
      formik.setFieldValue("highestEducation", {
        value: data.highestEducation.id,
        label: data.highestEducation.title,
      });
      formik.setFieldValue(
        "skills",
        data.skills.map ? data.skills.map((skill) => skill.id) : []
      );
      // formik.setFieldValue("attachments", data.attachments);
    }
  }, []);
  const handleProfilePicSave = async (file) => {
    formik.setFieldValue("companyLogo", file);
  };
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCitiesByCountry({ countryId: formik.values.country?.value }));
    }
  }, [formik.values.country]);

  useEffect(() => {
    getEmployerList();
  }, [debouncedSearchEmployerValue, !formik.values.existCompany, jobId]);

  useEffect(() => {
    getCountryList();
  }, [debouncedSearchCountryValue, !formik.values.country, jobId]);
  useEffect(() => {
    if (jobId) {
      getJobDetailsById(jobId);
    }
  }, [jobId]);
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!categories.data.length) {
      dispatch(getCategories());
    }
    if (!languages.data.length) {
      dispatch(getLanguages());
    }
    if (!educationLevels.data.length) {
      dispatch(getEducationLevels());
    }
    if (!skills.data.length) {
      dispatch(getSkills());
    }
    if (!employers.data.length) {
      dispatch(getEmployers());
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
    if (
      formik.values.jobCategories &&
      !subCategories.data[formik.values.jobCategories]?.length
    ) {
      dispatch(getSubCategories({ categoryId: formik.values.jobCategories }));
    }
  }, [formik.values.jobCategories]);
  useEffect(() => {
    const newJobId = searchParams.get("jobId");
    if (newJobId && jobId !== newJobId) setJobId(newJobId);
  }, [searchParams.get("jobId")]);

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
              {jobId ? "Edit Job" : "Post a new job"}
              <span className="right-pull">
                <IconButton LinkComponent={Link} to={"/manage-jobs"}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <form onSubmit={formik.handleSubmit}>
                <RadioGroup value={selectedValue} onChange={handleChange}>
                  <FormControlLabel
                    value="exist"
                    control={<Radio />}
                    label="Select Company"
                    checked={selectedValue === "exist"}
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="Create Company"
                    checked={selectedValue === "new"}
                  />
                </RadioGroup>
                {selectedValue === "exist" && (
                  <>
                    <Grid xl={12} lg={12} xs={12}>
                      <h2 className="mt-3">Select company</h2>
                    </Grid>
                    <Grid item xl={12} lg={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} xs={12}>
                          <label className="mb-2">
                            Select Company
                            <span className="required-field">*</span>
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
                            options={(employersData || []).map((employer) => ({
                              value: employer.id,
                              label: employer.name || employer.email,
                            }))}
                            title={"select the options"}
                            onChange={(_, value) => {
                              if (value) {
                                setSearchTerm(value.value);
                                formik.setFieldValue("existCompany", value);
                              } else {
                                setSearchTerm("");
                                formik.setFieldValue("existCompany", {
                                  value: "",
                                  label: "",
                                });
                              }
                            }}
                            value={formik.values.existCompany}
                            onKeyUp={(e) => setSearchTerm(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} xs={12}>
                      <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                    </Grid>
                  </>
                )}
                {selectedValue === "new" && (
                  <>
                    <Grid xl={12} lg={12} xs={12}>
                      <h2 className="mt-3"> New Company</h2>
                    </Grid>
                    <Grid item xl={12} lg={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} xs={12}>
                          <label className="mb-2">
                            Add Company Name
                            <span className="required-field">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Company Name"
                            className="add-form-control"
                            {...formik.getFieldProps("company")}
                          />
                        </Grid>

                        <Grid item xl={12} lg={12} xs={12}>
                          <label className="mb-2">
                            Add Company Logo
                            <span className="required-field">*</span>
                          </label>
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
                              <ProfilePicInput
                                title="Your organization logo"
                                textColor="#274593"
                                color="#274593"
                                bgColor="rgba(40, 71, 146, 0.1)"
                                // handleSave={handleProfilePicSave}
                                image={companyLogo}
                                loading={"loading"}
                                newLogo={handleProfilePicSave}
                                handleSaveCroppedImg={(file) =>
                                  formik.setFieldValue("companyLogo", [file])
                                }
                              />
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} xs={12}>
                      <Divider
                        sx={{ borderColor: "#CACACA", opacity: "1", my: 2 }}
                      />
                    </Grid>
                  </>
                )}
                <Grid container spacing={2}>
                  <Grid item xl={5} lg={5}>
                    <LabeledInput
                      title="Title of your job"
                      className="add-form-control"
                      placeholder="Online Research Participant (Work From Home/Part Time/Casual)…"
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <ErrorMessage>{formik.errors.title}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={3} lg={3}>
                    <LabeledInput
                      title="Experience in Years"
                      className="add-form-control"
                      placeholder="Experience in Years"
                      {...formik.getFieldProps("experience")}
                    />
                    {formik.touched.experience && formik.errors.experience ? (
                      <ErrorMessage>{formik.errors.experience}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4}>
                    <CurrencyInput
                      currency="USD"
                      title="Budget"
                      optionsValues={{
                        currency: formik.getFieldProps("budgetCurrency"),
                        input: formik.getFieldProps("budgetAmount"),
                        payPeriod: formik.getFieldProps("budgetPayPeriod"),
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
                        Description<span className="required-field">*</span>
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
                  <Grid item xl={9} lg={9} xs={12}>
                    <label>
                      Location<span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} xs={12}>
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
                          <ErrorMessage>
                            {formik.errors.country.value}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectWithSearch
                          sx={{
                            mt: 1,
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
                          title={
                            formik.values.country
                              ? "City"
                              : "Select Country first"
                          }
                          disabled={!formik.values.country}
                          options={(
                            cities.data[formik.values.country?.value] || [
                              "Select Country first",
                            ]
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
                        {formik.touched.city && formik.errors.city ? (
                          <ErrorMessage>
                            {formik.errors.city.value}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={3} lg={3} xs={12}>
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
                        onChange={(e) =>
                          setSuggestedAddressValue(e.target.value)
                        }
                        value={suggestedAddressValue}
                      />
                      {debouncedSearchValue &&
                        suggestedAddressValue !== formik.values.address && (
                          <div className={styles.search_results_box}>
                            {suggestedAddress?.map((address) => {
                              return (
                                <div
                                  key={address.description}
                                  className={styles.search_results}
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "address",
                                      address.description
                                    );
                                    setSuggestedAddressValue(
                                      address.description
                                    );
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
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>
                      Job Category
                      <span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectWithSearch
                          sx={{
                            mt: 1,
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
                          title="Select a Job category"
                          options={categories.data.map((jobCategory) => ({
                            value: jobCategory.id,
                            label: jobCategory.title,
                          }))}
                          name={"jobCategories"}
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("jobCategories", value);
                            } else {
                              formik.setFieldValue("jobCategories", {
                                value: "",
                                label: "",
                              });
                            }
                          }}
                          value={formik.values.jobCategories}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.jobCategories &&
                        formik.errors.jobCategories ? (
                          <ErrorMessage>
                            {formik.errors.jobCategories.value}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectWithSearch
                          sx={{
                            mt: 1,
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
                          title={
                            formik.values.jobCategories
                              ? "Job Sub Category"
                              : "Select Category first"
                          }
                          options={(
                            subCategories.data[
                              formik.values.jobCategories.label
                            ] || ["Select Category first"]
                          ).map((subCategory) => ({
                            value: subCategory.id,
                            label: subCategory.title,
                          }))}
                          disabled={!formik.values.jobCategories.value}
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("jobSubCategory", value);
                            } else {
                              formik.setFieldValue("jobSubCategory", {
                                value: "",
                                label: "",
                              });
                            }
                          }}
                          value={formik.values.jobSubCategory}
                        />
                        {formik.touched.jobSubCategory &&
                        formik.errors.jobSubCategory ? (
                          <ErrorMessage>
                            {formik.errors.jobSubCategory.value}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12} className="mt-2">
                    <label>Job type</label>
                    <FormGroup
                      row
                      sx={{ marginLeft: "7px", display: "flex", mt: 1 }}
                    >
                      <JobFormControl
                        className="update_checkbox"
                        control={<CheckboxInput sx={{ padding: "9px 5px" }} />}
                        label="Part Time"
                        checked={formik.values.isPartTime}
                        {...formik.getFieldProps("isPartTime")}
                      />
                      <JobFormControl
                        className="update_checkbox"
                        control={<CheckboxInput sx={{ padding: "9px 5px" }} />}
                        label="Full Time"
                        checked={formik.values.isFullTime}
                        {...formik.getFieldProps("isFullTime")}
                      />
                      <JobFormControl
                        className="update_checkbox"
                        control={<CheckboxInput sx={{ padding: "9px 5px" }} />}
                        label="Contract"
                        checked={formik.values.hasContract}
                        {...formik.getFieldProps("hasContract")}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xl={2} lg={2} xs={12} className="mt-2">
                    <LabeledInput
                      title="Duration in Month"
                      className="add-form-control"
                      placeholder="Months"
                      {...formik.getFieldProps("duration")}
                    />

                    {formik.touched.duration && formik.errors.duration ? (
                      <ErrorMessage>{formik.errors.duration}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={3} lg={3} xs={12} className="mt-2">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className="mb-2"
                      >
                        <label className="mb-1 d-inline-block">
                          Start Date
                        </label>
                      </Stack>
                      <DateInput
                        className="smallfont"
                        onChange={(e) => formik.setFieldValue("startDate", e)}
                        value={formik.values.startDate}
                        onBlur={formik.getFieldProps("startDate").onBlur}
                        minDate={dayjs()}
                      />
                      {formik.touched.startDate && formik.errors.startDate ? (
                        <ErrorMessage>{formik.errors.startDate}</ErrorMessage>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xl={3} lg={3} xs={12} className="mt-2">
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                        className="smallfont"
                        onChange={(e) => formik.setFieldValue("deadline", e)}
                        value={formik.values.deadline}
                        onBlur={formik.getFieldProps("deadline").onBlur}
                        minDate={formik.values.startDate}
                      />
                      {formik.touched.deadline && formik.errors.deadline ? (
                        <ErrorMessage>{formik.errors.deadline}</ErrorMessage>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-3">Ways to apply</h2>
                  </Grid>
                  <Grid item xl={12} lg={12} sm={12} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch />}
                        label="Apply through Koor"
                        checked={formik.values.isApplyThroughKoor}
                        {...formik.getFieldProps("isApplyThroughKoor")}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xl={4} lg={4} sm={4} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch />}
                        label="Apply by email"
                        checked={formik.values.isApplyThroughEmail}
                        {...formik.getFieldProps("isApplyThroughEmail")}
                      />
                    </FormGroup>
                    <input
                      className="add-form-control"
                      placeholder="Your email address"
                      {...formik.getFieldProps("contactEmail")}
                    />
                    {formik.touched.contactEmail &&
                    formik.errors.contactEmail ? (
                      <ErrorMessage>{formik.errors.contactEmail}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    lg={4}
                    sm={4}
                    xs={12}
                    sx={{
                      marginTop: "41px",
                      "@media (max-width: 480px)": {
                        marginTop: "0px",
                      },
                    }}
                  >
                    <input
                      className="add-form-control"
                      placeholder="CC email address"
                      {...formik.getFieldProps("cc1")}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    lg={4}
                    sm={4}
                    xs={12}
                    sx={{
                      marginTop: "41px",
                      "@media (max-width: 480px)": {
                        marginTop: "0px",
                      },
                    }}
                  >
                    <input
                      className="add-form-control"
                      placeholder="Another CC email address"
                      {...formik.getFieldProps("cc2")}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <LabeledInput
                      title="Application Instructions"
                      className="add-form-control"
                      placeholder="Write a brief text overview of your application process. You can also include links, emails, etc."
                      required
                      {...formik.getFieldProps("applicationInstruction")}
                    />
                    {formik.touched.applicationInstruction &&
                    formik.errors.applicationInstruction ? (
                      <ErrorMessage>
                        {formik.errors.applicationInstruction}
                      </ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch />}
                        label="Apply through your website"
                        checked={formik.values.isApplyThroughWebsite}
                        {...formik.getFieldProps("isApplyThroughWebsite")}
                      />
                    </FormGroup>
                    <LabeledInput
                      title=""
                      className="add-form-control"
                      placeholder="Paste a link to your website’s application form"
                      required
                      {...formik.getFieldProps("websiteLink")}
                    />
                    {formik.touched.websiteLink && formik.errors.websiteLink ? (
                      <ErrorMessage>{formik.errors.websiteLink}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-2">Preferences</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <label>Education level</label>
                    <SelectWithSearch
                      sx={{
                        mt: 1,
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
                      title="Choose an education level"
                      options={educationLevels.data.map((educationLevel) => ({
                        value: educationLevel.id,
                        label: educationLevel.title,
                      }))}
                      onChange={(_, value) => {
                        if (value) {
                          formik.setFieldValue("highestEducation", value);
                        } else {
                          formik.setFieldValue("highestEducation", {
                            value: "",
                            label: "",
                          });
                        }
                      }}
                      value={formik.values.highestEducation}
                    />
                    {formik.touched.highestEducation &&
                    formik.errors.highestEducation ? (
                      <ErrorMessage>
                        {formik.errors.highestEducation.value}
                      </ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <label className="mb-2">
                      Required languages
                      <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                      <span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      {[0, 1, 2].map((i) => {
                        return (
                          <Grid item xl={4} lg={4} xs={12} key={i}>
                            <SelectInput
                              placeholder="Select a Language"
                              className="mb-3"
                              options={languages.data.map((language) => ({
                                value: language.id,
                                label: language.title,
                              }))}
                              name={`languages[${i}].language`}
                              value={formik.values.languages[i].language || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />

                            {i === 0 ? (
                              <>
                                {formik.touched.languages &&
                                formik.errors.languages ? (
                                  <ErrorMessage>
                                    {formik.errors.languages}
                                  </ErrorMessage>
                                ) : null}
                              </>
                            ) : (
                              ""
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <label className="mb-2">
                    Job skills
                    <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                    <span className="required-field">*</span>
                  </label>
                  <Grid container spacing={2}>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        className="mb-3"
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={skills.data.map((skill) => ({
                          value: skill.id,
                          label: skill.title,
                        }))}
                        name="skills[0]"
                        value={formik.values.skills[0] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.skills && formik.errors.skills ? (
                        <ErrorMessage>{formik.errors.skills}</ErrorMessage>
                      ) : null}
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={skills.data.map((skill) => ({
                          value: skill.id,
                          label: skill.title,
                        }))}
                        name="skills[1]"
                        value={formik.values.skills[1] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={skills.data.map((skill) => ({
                          value: skill.id,
                          label: skill.title,
                        }))}
                        name="skills[2]"
                        value={formik.values.skills[2] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                </Grid>

                <Grid item xl={12} lg={12} xs={12}>
                  <h2 className="mt-3 mb-3">Attach files</h2>
                  <AttachmentDragNDropInput
                    files={
                      companyAttachments ||
                      formik.getFieldProps("attachments").value
                    }
                    handleDrop={(file) => {
                      formik.setValues({
                        ...formik.values,
                        attachments: [
                          ...formik.getFieldProps("attachments").value,
                          file[0],
                        ],
                      });
                    }}
                    deleteFile={(file) => {
                      if (file.id) {
                        formik.setFieldValue("attachmentsRemove", [
                          ...formik.values.attachmentsRemove,
                          file.id,
                        ]);
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (attachment) => attachment.id !== file.id
                          )
                        );
                        setCompanyAttachments(
                          companyAttachments.filter(
                            (attachment) => attachment.id !== file.id
                          )
                        );
                      } else {
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (attachment) => attachment.path !== file.path
                          )
                        );
                      }
                    }}
                  />
                  <FilledButton
                    disabled={submitting === SUBMITTING_STATUS_ENUM.loading}
                    title={
                      submitting === SUBMITTING_STATUS_ENUM.loading
                        ? jobId
                          ? "Updating..."
                          : "Posting..."
                        : jobId
                        ? "UPDATE THE JOB"
                        : "POST THE JOB"
                    }
                    type="submit"
                    className="mt-2"
                  />
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
