import React, { useState } from "react";
import { LabeledInput } from "@components/input";
import { Button } from "@mui/material";
import styles from "./auth.module.css";
import { useFormik } from "formik";
import { adminLogin } from "@api/auth";
import { validateLoginForm } from "./validator";
import { ErrorMessage } from "@components/caption";
import Loader from "@components/loader";
import { USER_ROLES } from "@utils/enum";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setRole, setAdminMail } from "@redux/slice/user";
function LoginComponent() {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validateLoginForm,
    onSubmit: async values => {
      setIsLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
        role: USER_ROLES.admin,
      };
      const response = await adminLogin(payload);
      if (response.remote === "success") {
        dispatch(setIsLoggedIn(true));
        dispatch(setRole(USER_ROLES.admin));
        dispatch(setAdminMail(payload.email));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        formik.setErrors({ password: "Invalid Credentials" });
      }
    },
  });
  return (
    <div className={styles.login_back_img}>
      <div className={styles.login}>
        <h5 className={styles.login_heading}>Admin Login</h5>
        <div className={styles.login_input_div}>
          <div>
            <LabeledInput
              title="Email"
              placeholder="Your Email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
            <LabeledInput
              title="Password"
              placeholder="Your Password"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
            <div className={styles.login_btn_div}>
              <Button
                title="Login"
                type="submit"
                className={styles.login_btn}
                onClick={() => formik.handleSubmit()}>
                {loading ? <Loader loading={loading} /> : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
