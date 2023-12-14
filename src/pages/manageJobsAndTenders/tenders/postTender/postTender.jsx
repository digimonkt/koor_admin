import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./postTender.module.css";
import {
  DateInput,
  LabeledInput,
  AttachmentDragNDropInput,
  ProfilePicInput,
  QuillInput,
} from "@components/input";
import CurrencyInput from "./currencyInput";
import { useFormik } from "formik";

import {
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTenderTags,
  getCountries,
  getTenderCategories,
  getCitiesByCountry,
  getTenderSector,
  getTenderOpportunityType,
  getEmployers,
} from "@redux/slice/choices";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { OutlinedButton, SolidButton } from "@components/button";
import { ErrorMessage } from "@components/caption";
import { useDebounce } from "usehooks-ts";
import {
  GetSuggestedAddressAPI,
  createTenderAPI,
  getCountriesName,
  getTenderDetailsByIdAPI,
  updateTenderAPI,
} from "@api/jobs";
import { validateCreateTenderInput } from "@pages/manageJobsAndTenders/validator";
import dayjs from "dayjs";
import { DATABASE_DATE_FORMAT } from "@utils/constants/constants";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import SelectWithSearch from "@components/input/selectWithsearch";
import { manageEmployer } from "@api/employers";

const PostNewJob = () => {
  const {
    countries,
    sectors,
    cities,
    tags,
    tenderCategories,
    opportunityTypes,
    employers,
  } = useSelector(({ choice }) => choice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [instructions, setInstructions] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tenderId, setTenderId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [employersData, setEmployersData] = useState(employers.data);
  const [searchCountry, setSearchCountry] = useState("");
  const debouncedSearchEmployerValue = useDebounce(searchTerm, 500);
  const debouncedSearchCountryValue = useDebounce(searchCountry, 500);
  const [countriesData, setCountriesData] = useState(countries.data);
  const [companyLogo, setCompanyLogo] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [selectedValue, setSelectedValue] = React.useState("exist");
  const handleChange = event => {
    setSelectedValue(event.target.value);
    formik.setFieldValue("companyType", selectedValue);
  };

  const formik = useFormik({
    initialValues: {
      companyType: "exist",
      existCompany: { label: "", value: "" },
      company: "",
      companyLogo: [],
      companyLogoRemove: [],
      title: "",
      budgetCurrency: "usd",
      budgetAmount: 0,
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
      websiteLink: "",
      contactWhatsapp: "",
      isContactEmail: false,
      contactEmail: "",
      cc1: "",
      cc2: "",
      isContactWhatsapp: false,
      applicationInstruction: "",
      isApplyThroughEmail: false,
      isApplyThroughKoor: false,
      isApplyThroughWebsite: false,
    },
    validationSchema: validateCreateTenderInput,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        company_type: selectedValue,
        company: values.company,
        company_logo_item: values.companyLogo,
        employer_id: values.existCompany.value,
        title: values.title,
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetAmount,
        description: values.description,
        country: values.country.value,
        city: values.city.value,
        sector: values.sectors.value,
        tender_type: values.opportunityType.value,
        tender_category: values.categories.map(e => e.value),
        deadline: dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        address: values.address,
        start_date: values.startDate
          ? dayjs(values.startDate).format(DATABASE_DATE_FORMAT)
          : "",
        attachments: values.attachments,
        attachments_remove: values.attachmentsRemove,
        application_instruction: values.applicationInstruction,
        tag: values.tag.value,
        contact_email: values?.contactEmail || "",
        cc1: values?.cc1 || "",
        cc2: values?.cc2 || "",
        contact_whatsapp: values.isContactWhatsapp
          ? values.contactWhatsapp
          : "",
        apply_through_koor: values.isApplyThroughKoor || "false",
        apply_through_email: values.isApplyThroughEmail || "false",
        apply_through_website: values.isApplyThroughWebsite || "false",
        website_link: values.website,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        if (!payload[key]) {
          delete payload[key];
        } else if (key === "attachments") {
          payload.attachments.forEach(attachment => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        } else if (payload[key].forEach) {
          payload[key].forEach(data => newFormData.append(key, data));
        } else if (payload[key]) {
          newFormData.append(key, payload[key]);
        }
      }

      let res;
      if (!tenderId) {
        // createTender
        res = await createTenderAPI(newFormData);
        if (res.remote === "success") {
          dispatch(setSuccessToast("Job Post Successfully"));
          setSuggestedAddress([]);
          setSearchValue("");
          setSuggestedAddress([]);
          setCompanyLogo();
          resetForm();
          navigate("/manage-tenders");
        } else {
          dispatch(setErrorToast("Something went wrong"));
        }
      } else {
        // updateTenders
        res = await updateTenderAPI(tenderId, newFormData);
        if (res.remote === "success") {
          dispatch(setSuccessToast("Tender Updated Successfully"));
          navigate("/manage-tenders");
        } else {
          dispatch(setErrorToast("Something went wrong"));
        }
      }
    },
  });

  const getEmployerList = async () => {
    const limitParam = 10;
    const response = await manageEmployer({
      search: searchTerm,
      limit: limitParam,
    });
    if (response.remote === "success") {
      setEmployersData(response.data.results);
    }
  };

  const getTenderDetailsById = useCallback(async tenderId => {
    const response = await getTenderDetailsByIdAPI({ tenderId });
    if (response.remote === "success") {
      const { data } = response;
      if (data.address) {
        setSearchValue(data.address);
      }
      if (data.companyLogo) {
        setCompanyLogo(data.companyLogo);
      }
      if (!data.user?.id) {
        setSelectedValue("new");
        formik.setFieldValue("companyType", "new");
      } else {
        setSelectedValue("exist");
        formik.setFieldValue("companyType", "exist");
      }
      formik.setFieldValue("description", data.description || "");
      setEditorValue(data.description);
      formik.setFieldValue(
        "applicationInstruction",
        data.applicationInstruction || "",
      );
      formik.setFieldValue("company", data.company || "");
      setInstructions(data.applicationInstruction || "");
      formik.setFieldValue("existCompany", {
        value: data.user?.id || "",
        label: data.user?.name || data.user?.email || "",
      });
      formik.setFieldValue("address", data.address || "");
      formik.setFieldValue("title", data.title || "");
      formik.setFieldValue("budgetCurrency", data.budgetCurrency);
      formik.setFieldValue(
        "budgetAmount",
        parseInt(data.budgetAmount.replace(/,/g, ""), 10),
      );
      formik.setFieldValue("country", {
        value: data.country.id || "",
        label: data.country.title || "",
      });
      formik.setFieldValue("city", {
        value: data.city.id || "",
        label: data.city.title || "",
      });
      formik.setFieldValue(
        "categories",
        data.categories.map(category => ({
          value: category.id || "",
          label: category.title || "",
        })),
      );
      formik.setFieldValue("sectors", {
        value: data.sectors.id || "",
        label: data.sectors.title || "",
      });
      formik.setFieldValue("opportunityType", {
        value: data.opportunityType.id || "",
        label: data.opportunityType.title || "",
      });
      formik.setFieldValue("tag", {
        value: data?.tag[0]?.id || "",
        label: data?.tag[0]?.title || "",
      });
      formik.setFieldValue("deadline", dayjs(data.deadline));
      formik.setFieldValue("startDate", dayjs(data.startDate));
      formik.setFieldValue("attachments", data?.attachments);
      formik.setFieldValue(
        "isApplyThroughEmail",
        Boolean(data.isApplyThroughEmail) || false,
      );
      formik.setFieldValue(
        "isContactEmail",
        Boolean(data.contactEmail) || false,
      );
      formik.setFieldValue(
        "isApplyThroughKoor",
        Boolean(data.isApplyThroughKoor) || false,
      );
      formik.setFieldValue("contactEmail", data?.contactEmail || "");
      formik.setFieldValue("cc1", data?.cc1 || "");
      formik.setFieldValue("cc2", data?.cc2 || "");
      formik.setFieldValue("contactWhatsapp", data?.contactWhatsapp || "");
      formik.setFieldValue("website", data?.website || "");
      formik.setFieldValue(
        "isApplyThroughWebsite",
        Boolean(data.isApplyThroughWebsite || false),
      );
    }
  }, []);

  // Address
  const getSuggestedAddress = async search => {
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

  const handleProfilePicSave = async file => {
    formik.setFieldValue("companyLogo", file);
  };

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
    if (!employers.data.length) {
      dispatch(getEmployers());
    }
  }, []);

  useEffect(() => {
    if (tenderId) {
      getTenderDetailsById(tenderId);
    }
  }, [tenderId]);
  useEffect(() => {
    getEmployerList();
  }, [debouncedSearchEmployerValue, !formik.values.existCompany]);
  useEffect(() => {
    getCountryList();
  }, [debouncedSearchCountryValue, !formik.values.country]);
  useEffect(() => {
    const newTenderId = searchParams.get("tenderId");
    if (newTenderId && tenderId !== newTenderId) setTenderId(newTenderId);
  }, [searchParams.get("tenderId")]);
  console.log({ formik });
  return (
    <div className="job-application">
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 3,
          },
        }}>
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px 25px 25px",
            },
          }}>
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
                <RadioGroup value={selectedValue} onChange={handleChange}>
                  <FormControlLabel
                    sx={{ width: "180px" }}
                    value="exist"
                    control={<Radio />}
                    label="Select Company"
                    onChange={formik.handleChange}
                    onBlur={() => formik.setFieldValue("companyType", "exist")}
                    checked={selectedValue === "exist"}
                  />
                  <FormControlLabel
                    sx={{ width: "180px" }}
                    value="new"
                    control={<Radio />}
                    label="Create Company"
                    onBlur={() => formik.setFieldValue("companyType", "new")}
                    onChange={formik.handleChange}
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
                            options={(employersData || []).map(employer => ({
                              value: employer.id,
                              label: employer.name || employer.email,
                            }))}
                            title={"select the options"}
                            onBlur={formik.handleBlur}
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
                            onKeyUp={e => setSearchTerm(e.target.value)}
                          />
                          {formik.errors.existCompany &&
                          formik.errors.existCompany ? (
                            <ErrorMessage>
                              {formik.errors.existCompany.value}
                            </ErrorMessage>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} xs={12} className="mt-2">
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
                          {formik.touched.company && formik.errors.company ? (
                            <ErrorMessage>{formik.errors.company}</ErrorMessage>
                          ) : null}
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
                            }}>
                            <CardContent
                              sx={{
                                "&.MuiCardContent-root": {
                                  padding: "30px",
                                },
                              }}>
                              <ProfilePicInput
                                title="Your organization logo"
                                textColor="#274593"
                                color="#274593"
                                bgColor="rgba(40, 71, 146, 0.1)"
                                // handleSave={handleProfilePicSave}
                                image={companyLogo}
                                loading={false}
                                newLogo={handleProfilePicSave}
                                handleSaveCroppedImg={file =>
                                  formik.setFieldValue("companyLogo", [file])
                                }
                              />
                              {formik.touched.company &&
                              formik.errors.company ? (
                                <ErrorMessage>
                                  {formik.errors.company}
                                </ErrorMessage>
                              ) : null}
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
                <Grid container spacing={2} className="mt-0">
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
                      type="number"
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
                      <QuillInput
                        className="form-control-area"
                        placeholder="Write more details to attract the right candidates."
                        value={editorValue}
                        onChange={value =>
                          formik.setFieldValue("description", value)
                        }
                      />
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
                          options={(countriesData || []).map(country => ({
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
                          onKeyUp={e => setSearchCountry(e.target.value)}
                        />
                        {formik.touched.country && formik.errors.country ? (
                          <ErrorMessage>
                            {formik.errors.country.value}
                          </ErrorMessage>
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
                          ).map(city => ({
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
                        onBlur={e => formik.getFieldProps("address").onBlur}
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                      {debouncedSearchValue &&
                        searchValue !== formik.values.address && (
                          <div className={styles.search_results_box}>
                            {suggestedAddress.map(address => {
                              return (
                                <div
                                  key={address.description}
                                  className={styles.search_results}
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "address",
                                      address.description,
                                    );
                                    setSearchValue(address.description);
                                  }}>
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
                          multiple={true}
                          defaultValue=""
                          title="Select a Job category"
                          options={tenderCategories.data.map(category => ({
                            value: category.id,
                            label: category.title,
                          }))}
                          onChange={(_, value) => {
                            if (value) {
                              formik.setFieldValue("categories", value);
                            } else {
                              formik.setFieldValue("categories", []);
                            }
                          }}
                          value={formik.values.categories.map(e => e)}
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
                        <label>Sector</label>
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
                          options={(sectors.data || []).map(employer => ({
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
                        <label>Type</label>
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
                            opportunityType => ({
                              value: opportunityType.id,
                              label: opportunityType.title,
                            }),
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
                        <label>Tag</label>
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
                          options={(tags?.data || [])?.map(tag => ({
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
                          style={{ display: "flex", flexDirection: "column" }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="mb-2">
                            <label className="mb-1 d-inline-block">
                              Start Date{" "}
                              <span className="required-field">*</span>
                            </label>
                          </Stack>
                          <DateInput
                            onChange={e => formik.setFieldValue("startDate", e)}
                            type="date"
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
                          style={{ display: "flex", flexDirection: "column" }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="mb-2">
                            <label className="mb-1 d-inline-block">
                              Deadline<span className="required-field">*</span>{" "}
                            </label>
                          </Stack>
                          <DateInput
                            onChange={e => formik.setFieldValue("deadline", e)}
                            type="date"
                            value={formik.values.deadline}
                            onBlur={formik.getFieldProps("deadline").onBlur}
                            minDate={formik.values.startDate}
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
                  <h2 className="mt-3">Ways to apply</h2>
                </Grid>
                <Grid item xl={4} lg={4} sm={4} xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      sx={{ width: "200px" }}
                      control={<Switch />}
                      label="Apply through Koor"
                      checked={formik.values.isApplyThroughKoor}
                      {...formik.getFieldProps("isApplyThroughKoor")}
                    />
                    {formik.touched.isApplyThroughKoor &&
                    formik.errors.isApplyThroughKoor ? (
                      <ErrorMessage>
                        {formik.errors.isApplyThroughKoor}
                      </ErrorMessage>
                    ) : null}
                    <FormControlLabel
                      sx={{ width: "165px" }}
                      control={<Switch />}
                      label="Apply by email"
                      checked={formik.values.isApplyThroughEmail}
                      {...formik.getFieldProps("isApplyThroughEmail")}
                    />
                    {formik.touched.isApplyThroughEmail &&
                    formik.errors.isApplyThroughEmail ? (
                      <ErrorMessage>
                        {formik.errors.isApplyThroughEmail}
                      </ErrorMessage>
                    ) : null}
                  </FormGroup>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} sm={4} xs={12}>
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
                  <Grid item xl={4} lg={4} sm={4} xs={12}>
                    <input
                      className="add-form-control"
                      placeholder="CC email address"
                      type="email"
                      {...formik.getFieldProps("cc1")}
                    />
                    {formik.touched.cc1 && formik.errors.cc1 ? (
                      <ErrorMessage>{formik.errors.cc1}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} sm={4} xs={12}>
                    <input
                      className="add-form-control"
                      placeholder="Another CC email address"
                      type="email"
                      {...formik.getFieldProps("cc2")}
                    />
                    {formik.touched.cc2 && formik.errors.cc2 ? (
                      <ErrorMessage>{formik.errors.cc2}</ErrorMessage>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} xs={12} className="mt-3">
                  <label>
                    Application Instructions
                    <span className="required-field">*</span>
                  </label>
                  <QuillInput
                    className="form-control-area"
                    type="textarea"
                    placeholder="Write a brief text overview of your application process. You can also include links, emails, etc."
                    value={instructions}
                    onChange={value =>
                      formik.setFieldValue("applicationInstruction", value)
                    }
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
                      sx={{ width: "255px" }}
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
                    {...formik.getFieldProps("websiteLink")}
                  />
                  {formik.touched.websiteLink && formik.errors.websiteLink ? (
                    <ErrorMessage>{formik.errors.websiteLink}</ErrorMessage>
                  ) : null}
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <h2 className="mt-2 mb-3">Attach files</h2>
                  {formik.errors?.attachments ? (
                    <ErrorMessage>{formik.errors?.attachments}</ErrorMessage>
                  ) : null}
                  <AttachmentDragNDropInput
                    files={formik.getFieldProps("attachments").value}
                    handleDrop={file => {
                      const currentAttachments = formik.values.attachments;
                      if (file.length + currentAttachments.length > 10) {
                        formik.setFieldError(
                          "attachments",
                          `Maximum 10 files allowed. you can upload only ${
                            10 - currentAttachments.length
                          } remaining`,
                        );
                      } else {
                        const filesTaken = file.slice(
                          0,
                          10 - currentAttachments.length,
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
                            attachment => attachment.path !== file.path,
                          ),
                        );
                      } else {
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (_, i) => i !== index,
                          ),
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} xs={12} className="mb-3">
                  <Divider
                    sx={{ borderColor: "#CACACA", opacity: "1", my: 2 }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ flexWrap: "wrap" }}>
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
                    />
                    <SolidButton
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
                      className="resetButton"
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
