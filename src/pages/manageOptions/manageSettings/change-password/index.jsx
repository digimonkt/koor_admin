import React, { useEffect } from "react";
import { ErrorMessage } from "@components/caption";
import { Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "./styles.module.css";
import { validateChangePasswordForm } from "../../../auth/validator";
import { useFormik } from "formik";
import { setSuccessToast } from "@redux/slice/toast";
import { ChangeAdminPassword } from "@api/auth";
import { useDispatch, useSelector } from "react-redux";
import { LabeledInput } from "@components/input";
import { getUserDetailsApi } from "@api/manageoptions";
import { setAdminMail } from "@redux/slice/user";
const ChangePassword = () => {
  const { adminMail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      mail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validateChangePasswordForm,
    onSubmit: async (values) => {
      const payload = {
        email: values.mail,
        old_password: values.currentPassword,
        password: values.newPassword,
      };
      for (const i in payload) {
        if (payload[i] === "") {
          delete payload[i];
        }
      }
      const response = await ChangeAdminPassword(payload);
      if (response.remote === "success") {
        dispatch(setSuccessToast("Password Change  SuccessFully"));
      } else {
        formik.setErrors({ confirmPassword: "Invalid Credentials" });
      }
    },
  });

  const getUserDetails = async () => {
    const adminDetails = await getUserDetailsApi();
    if (adminDetails.remote === "success") {
      dispatch(setAdminMail(adminDetails.data.email));
      formik.setFieldValue("mail", adminDetails?.data?.email || adminDetails);
    }
  };

  useEffect(() => {
    getUserDetails();
    formik.setFieldValue("mail", adminMail);
  }, [adminMail || adminMail === ""]);

  return (
    <>
      <form>
        <Stack direction="column" spacing={1.5}>
          <div className={`${styles.formGroup}`}>
            <label>Change Your mail</label>
            <LabeledInput
              placeholder="Current Mail"
              type="text"
              className={`${styles.formControl}`}
              values={adminMail}
              {...formik.getFieldProps("mail")}
            />
            {formik.touched.mail && formik.errors.mail ? (
              <ErrorMessage>{formik.errors.mail}</ErrorMessage>
            ) : null}
          </div>
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
