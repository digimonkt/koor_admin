import { Divider, FormLabel, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";
import Cbutton from "@components/button/cButton";
import { SVG } from "@assets/svg";
import { useFormik } from "formik";
import { validatePlanForm } from "@pages/auth/validator";
import { updatePlansAPI } from "@api/manageoptions";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Poppins",
  color: "#121212",
  fontSize: "16px",
  fontWeight: "300",
  marginBottom: 10,
  display: "block",

  "@media (max-width: 992px)": {
    fontSize: "14px",
  },

  "@media (max-width: 480px)": {
    fontSize: "12px",
  },
}));

const PackageManagement = ({ packageList, refreshList }) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState("Save changes");
  const filterPlanDataSet = (type) => {
    const planArr = packageList.filter((item) => item.title === type);
    return planArr?.[0];
  };
  const formik = useFormik({
    initialValues: {
      goldPlanId: "",
      goldPrice: "",
      goldCredit: "",
      goldBenefit: [],
      silverPlanId: "",
      silverPrice: "",
      silverCredit: "",
      silverBenefit: [],
      copperPlanId: "",
      copperPrice: "",
      copperCredit: "",
      copperBenefit: [],
    },
    validationSchema: validatePlanForm,
    onSubmit: async (values) => {
      setSubmitting("Submitting...");
      const payload = [
        {
          id: values.goldPlanId,
          title: "Gold",
          price: values.goldPrice,
          credit: values.goldCredit,
          benefit: values.goldBenefit,
        },
        {
          id: values.silverPlanId,
          title: "Silver",
          price: values.silverPrice,
          credit: values.silverCredit,
          benefit: values.silverBenefit,
        },
        {
          id: values.copperPlanId,
          title: "Copper",
          price: values.copperPrice,
          credit: values.copperCredit,
          benefit: values.copperBenefit,
        },
      ];
      const res = await updatePlansAPI(payload);
      if (res.remote === "success") {
        refreshList();
        setSubmitting("Save Changes");
        dispatch(setSuccessToast("Package Updated SuccessFully"));
      } else {
        dispatch(setErrorToast("Something Went Wrong"));
      }
    },
  });
  const fieldName = (planName, field) => {
    return planName.toLowerCase() + field;
  };

  useEffect(() => {
    formik.setFieldValue("goldPlanId", filterPlanDataSet("Gold").id);
    formik.setFieldValue("goldPrice", filterPlanDataSet("Gold").price);
    formik.setFieldValue("goldCredit", filterPlanDataSet("Gold").credit);
    formik.setFieldValue("goldBenefit", filterPlanDataSet("Gold").benefit);
    formik.setFieldValue("silverPlanId", filterPlanDataSet("Silver").id);
    formik.setFieldValue("silverPrice", filterPlanDataSet("Silver").price);
    formik.setFieldValue("silverCredit", filterPlanDataSet("Silver").credit);
    formik.setFieldValue("silverBenefit", filterPlanDataSet("Silver").benefit);
    formik.setFieldValue("copperPlanId", filterPlanDataSet("Copper").id);
    formik.setFieldValue("copperPrice", filterPlanDataSet("Copper").price);
    formik.setFieldValue("copperCredit", filterPlanDataSet("Copper").credit);
    formik.setFieldValue("copperBenefit", filterPlanDataSet("Copper").benefit);
  }, []);
  return (
    <>
      <div className="form-content">
        <form>
          {packageList?.map((item) => (
            <div className={`${styles.packageManagement}`} key={item.id}>
              <h3>{item.title}</h3>
              <Grid container spacing={2.5}>
                <Grid item lg={6} xs={12}>
                  <StyledFormLabel>Price</StyledFormLabel>
                  <Stack
                    direction="row"
                    spacing={1.875}
                    className={`${styles.formGroupBg}`}
                  >
                    <span>USD</span>
                    <input
                      className={`${styles.usdform}`}
                      {...formik.getFieldProps(fieldName(item.title, "Price"))}
                    />
                  </Stack>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <StyledFormLabel>Number of job posts</StyledFormLabel>
                  <input
                    placeholder="Number of job posts"
                    className={`${styles.textType}`}
                    {...formik.getFieldProps(fieldName(item.title, "Credit"))}
                  />
                </Grid>
              </Grid>
              <div className={`${styles.MT15}`}>
                <StyledFormLabel>Benefits</StyledFormLabel>
                <div>
                  <Grid container spacing={1.875}>
                    <Grid item lg={6} xs={12}>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <span>1</span>
                        <input
                          className={`${styles.textType}`}
                          value={
                            formik.getFieldProps(
                              fieldName(item.title, "Benefit")
                            ).value?.[0] || ""
                          }
                          onChange={(e) => {
                            const updatedArray = [
                              ...formik.getFieldProps(
                                fieldName(item.title, "Benefit")
                              ).value,
                            ];
                            updatedArray[0] = e.target.value;
                            formik.setFieldValue(
                              fieldName(item.title, "Benefit"),
                              updatedArray
                            );
                          }}
                          placeholder={item.placeholder}
                        />
                      </Stack>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <span>2</span>
                        <input
                          className={`${styles.textType}`}
                          value={
                            formik.getFieldProps(
                              fieldName(item.title, "Benefit")
                            ).value?.[1] || ""
                          }
                          onChange={(e) => {
                            const updatedArray = [
                              ...formik.getFieldProps(
                                fieldName(item.title, "Benefit")
                              ).value,
                            ];
                            updatedArray[1] = e.target.value;
                            formik.setFieldValue(
                              fieldName(item.title, "Benefit"),
                              updatedArray
                            );
                          }}
                          placeholder={item.placeholder}
                        />
                      </Stack>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <span>3</span>
                        <input
                          className={`${styles.textType}`}
                          value={
                            formik.getFieldProps(
                              fieldName(item.title, "Benefit")
                            ).value?.[2] || ""
                          }
                          onChange={(e) => {
                            const updatedArray = [
                              ...formik.getFieldProps(
                                fieldName(item.title, "Benefit")
                              ).value,
                            ];
                            updatedArray[2] = e.target.value;
                            formik.setFieldValue(
                              fieldName(item.title, "Benefit"),
                              updatedArray
                            );
                          }}
                          placeholder={item.placeholder}
                        />
                      </Stack>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <span>4</span>
                        <input
                          className={`${styles.textType}`}
                          value={
                            formik.getFieldProps(
                              fieldName(item.title, "Benefit")
                            ).value?.[3] || ""
                          }
                          onChange={(e) => {
                            const updatedArray = [
                              ...formik.getFieldProps(
                                fieldName(item.title, "Benefit")
                              ).value,
                            ];
                            updatedArray[3] = e.target.value;
                            formik.setFieldValue(
                              fieldName(item.title, "Benefit"),
                              updatedArray
                            );
                          }}
                          placeholder={item.placeholder}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{ my: 3.5, opacity: 1, borderColor: "#CACACA" }}
                  />
                </div>
              </div>
            </div>
          ))}
          <Stack direction="row" justifyContent="center" sx={{ mt: 3.75 }}>
            <div>
              <Cbutton
                type="button"
                bgcolor="#D5E3F7"
                color="#274593"
                bordercolor="#D5E3F7"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px"
                onClick={() => formik.handleSubmit()}
              >
                <span className="d-inline-flex me-2">
                  <SVG.PriorityIcon />
                </span>
                {submitting}
              </Cbutton>
            </div>
          </Stack>
        </form>
      </div>
    </>
  );
};
export default PackageManagement;
