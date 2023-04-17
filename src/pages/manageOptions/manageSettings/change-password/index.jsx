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
    onSubmit: async (values) => {
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
              placeholder="*******************"
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
              placeholder="confirm password"
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
                <div>
                  <div>
                    <SVG.PriorityIcon />
                  </div>
                  <div>SAVE PASSWORD</div>
                </div>
              }
              sx={{
                bgcolor: "#D5E3F7",
                color: "#274593",
                borderColor: "#D5E3F7",
                hoverBgColor: "#b4d2fe",
                "&:hover": {
                  color: "#b4d2fe",
                },
              }}
              onClick={() => formik.handleSubmit()}
            ></OutlinedButton>
          </div>
        </div>
      </form>
    </>
  );
};
export default ChangePassword;
