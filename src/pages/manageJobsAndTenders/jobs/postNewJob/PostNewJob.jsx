import React, { useEffect, useState } from "react";
import styles from "./postJobs.module.css";
import { JobFormControl } from "./style";
import {
  DateInput,
  CheckboxInput,
  LabeledInput,
  SelectInput,
  AttachmentDragNDropInput,
} from "@components/input";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyInput from "./currencyInput";
import { PAY_PERIOD } from "@utils/enum";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCitiesByCountry,
  getEducationLevels,
  // getWorldCities,
  getWorldCities,
  getCategories,
  // getJobSubCategories,
  getLanguages,
  getSkills,
} from "@redux/slice/choices";
import { Link } from "react-router-dom";
import { FilledButton } from "@components/button";
import { ErrorMessage } from "@components/caption";

const PostNewJob = () => {
  const {
    countries,
    educationLevels,
    categories,
    languages,
    skills,
    cities,
    worldCities,
  } = useSelector(({ choice }) => choice);
  console.log({ worldCities });
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState("selectCompany");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
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
  }, []);

  // !! formik  validation start
  const formik = useFormik({
    initialValues: {
      title: "",
      budgetCurrency: "usd",
      budgetAmount: 0,
      budgetPayPeriod: PAY_PERIOD.month,
      description: "",
      country: "",
      city: "",
      address: "",
      jobCategories: "",
      jobSubCategory: "",
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
      duration: 0,
      experience: "",
      countryCodeContactWhatsapp: "",
      contactWhatsapp: "",
      highestEducation: "",
      languages: [{ language: "" }, { language: "" }, { language: "" }],
      skills: [],
      attachments: [],
      attachmentsRemove: [],
    },
    onSubmit: async (values, { resetForm }) => {
      console.log({ values });
    },
  });
  // !! formik  validation end
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCitiesByCountry({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getWorldCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  const [searchValue, setSearchValue] = useState("");
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
              Post a new job
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
                    value="selectCompany"
                    control={<Radio />}
                    label="Select Company"
                  />
                  <FormControlLabel
                    value="option2"
                    control={<Radio />}
                    label="new Company"
                  />
                </RadioGroup>
                {selectedValue === "selectCompany" && (
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
                          <SelectInput
                            className="mb-3"
                            defaultValue=""
                            placeholder="Select a Skill"
                            options={skills.data.map((skill) => ({
                              value: skill.id,
                              label: skill.title,
                            }))}
                            name="skills[0]"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} xs={12}>
                      <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                    </Grid>
                  </>
                )}
                {selectedValue === "option2" && (
                  <>
                    <Grid xl={12} lg={12} xs={12}>
                      <h2 className="mt-3"> New company</h2>
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
                            name={"address"}
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                          />
                        </Grid>

                        <Grid item xl={4} lg={4} xs={12}>
                          <label className="mb-2">
                            Add Company Logo
                            <span className="required-field">*</span>
                          </label>
                          <AttachmentDragNDropInput handleDrop={(file) => {}} />
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
                      optionsValues={{
                        currency: "budgetCurrency",
                        input: "budgetAmount",
                        payPeriod: "budgetPayPeriod",
                      }}
                      title="Budget"
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
                        <SelectInput
                          placeholder="Country"
                          defaultValue=""
                          options={countries.data.map((country) => ({
                            value: country.id,
                            label: country.title,
                          }))}
                          {...formik.getFieldProps("country")}
                        />
                        {formik.touched.country && formik.errors.country ? (
                          <ErrorMessage>{formik.errors.country}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          placeholder={
                            formik.values.country
                              ? "City"
                              : "Select Country first"
                          }
                          disabled={!formik.values.country}
                          options={(
                            cities.data[formik.values.country] || []
                          ).map((country) => ({
                            value: country.id,
                            label: country.title,
                          }))}
                          {...formik.getFieldProps("city")}
                        />
                        {formik.touched.city && formik.errors.city ? (
                          <ErrorMessage>{formik.errors.city}</ErrorMessage>
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
                        name={"address"}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                    </div>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>
                      Job Category
                      <span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Job category"
                          options={categories.data.map((jobCategory) => ({
                            value: jobCategory.id,
                            label: jobCategory.title,
                          }))}
                          name={"jobCategories"}
                          value={formik.values.jobCategories || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.jobCategories &&
                        formik.errors.jobCategories ? (
                          <ErrorMessage>
                            {formik.errors.jobCategories}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder={"Select Category first"}
                          options={countries.data.map((country) => ({
                            value: country.id,
                            label: country.title,
                          }))}
                        />
                        {formik.touched.jobSubCategory &&
                        formik.errors.jobSubCategory ? (
                          <ErrorMessage>
                            {formik.errors.jobSubCategory}
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
                        onChange={(e) => formik.setFieldValue("startDate", e)}
                        value={formik.values.startDate}
                        onBlur={formik.getFieldProps("startDate").onBlur}
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
                        onChange={(e) => formik.setFieldValue("deadline", e)}
                        value={formik.values.deadline}
                        onBlur={formik.getFieldProps("deadline").onBlur}
                      />
                      {formik.touched.deadline && formik.errors.deadline ? (
                        <ErrorMessage>{formik.errors.deadline}</ErrorMessage>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid xl={12} lg={12} xs={12}>
                    <h2 className="mt-3">Additional ways to apply</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <JobFormControl
                      control={<CheckboxInput />}
                      label="Apply by email"
                      {...formik.getFieldProps("isContactEmail")}
                    />
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
                    xs={12}
                    sx={{
                      marginTop: "41px",
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
                    xs={12}
                    sx={{
                      marginTop: "41px",
                    }}
                  >
                    <input
                      className="add-form-control"
                      placeholder="Another CC email address"
                      {...formik.getFieldProps("cc2")}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-2">Preferences</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <label>Education level</label>
                    <SelectInput
                      defaultValue=""
                      placeholder="Choose an education level"
                      options={educationLevels.data.map((educationLevel) => ({
                        value: educationLevel.id,
                        label: educationLevel.title,
                      }))}
                      {...formik.getFieldProps("highestEducation")}
                    />
                    {formik.touched.highestEducation &&
                    formik.errors.highestEducation ? (
                      <ErrorMessage>
                        {formik.errors.highestEducation}
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
                    files={formik.getFieldProps("attachments").value}
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
                  <FilledButton title={"POST THE JOB"} type="submit" />
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
