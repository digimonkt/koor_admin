import React from "react";
import { ErrorMessage } from "@components/caption";
import { Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "./styles.module.css";
import { validateChangePasswordForm } from "../../../auth/validator";
import { useFormik } from "formik";
import { setSuccessToast } from "@redux/slice/toast";
import { ChangeAdminPassword } from "@api/auth";
import { useDispatch } from "react-redux";
import { LabeledInput } from "@components/input";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validateChangePasswordForm,
    onSubmit: async values => {
      const payload = {
        old_password: values.currentPassword,
        password: values.newPassword,
      };
      const response = await ChangeAdminPassword(payload);
      if (response.remote === "success") {
        dispatch(setSuccessToast("Password Change  SuccessFully"));
      } else {
        formik.setErrors({ confirmPassword: "Invalid Credentials" });
      }
    },
  });
  return (
    <>
      <form>
        <Stack direction="column" spacing={1.5}>
          <div className={`${styles.formGroup}`}>
            <label>Type your current password</label>
            <LabeledInput
              placeholder="Current password"
              type="text"
              className={`${styles.formControl}`}
              {...formik.getFieldProps("currentPassword")}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <ErrorMessage>{formik.errors.currentPassword}</ErrorMessage>
            ) : null}
          </div>

          <div className={`${styles.formGroup}`}>
            <label>Create new password</label>

            <LabeledInput
              placeholder="New Password"
              type="password"
              className={`${styles.formControl}`}
              {...formik.getFieldProps("newPassword")}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <ErrorMessage>{formik.errors.newPassword}</ErrorMessage>
            ) : null}
          </div>
          <div className={`${styles.formGroup}`}>
            <label>Repeat new password</label>

            <LabeledInput
              placeholder="Confirm password"
              type="password"
              className={`${styles.formControl}`}
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
            ) : null}
          </div>
        </Stack>
        <div className={`${styles.Mt_41}`}>
          <div className={`${styles.showButton}`}>
            <OutlinedButton
              title={
                <>
                  <div style={{ marginTop: "6px", marginRight: "8px" }}>
                    <SVG.PriorityIcon />
                  </div>
                  <div>SAVE CREDENTIALS</div>
                </>
              }
              sx={{
                height: "42px",
                borderRadius: "73px",
                border: "1px solid #274593",
                color: "#274593",
                fontWeight: "600",
                fontSize: "16px",
                fontFamily: "Bahnschrift",
                width: "100%",
                "@media (max-width: 480px)": {
                  width: "204px",
                  fontSize: "14px",
                  marginBottom: "20px",
                },
              }}
              onClick={() => formik.handleSubmit()}
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default ChangePassword;
