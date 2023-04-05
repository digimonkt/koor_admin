import React, { Fragment, useState } from "react";
import { LabeledInput } from "@components/input";
import { Button } from "@mui/material";
import styles from "./auth.module.css";
import { useFormik } from "formik";
import { AdminLogin } from "@api/auth";
import { validateLoginForm } from "./validator";
import { ErrorMessage } from "@components/caption";
import Loader from "@components/loader";
import { USER_ROLES } from "@utils/enum";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setRole } from "@redux/slice/user";
function LoginComponent() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      setIsLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
        role: USER_ROLES.admin,
      };
      const response = await AdminLogin(payload);
      if (response.remote === "success") {
        setIsLoading(false);
        dispatch(setIsLoggedIn(true));
        dispatch(setRole(USER_ROLES.admin));
        navigate("/dashboard");
      } else {
        console.log(response);
        formik.setErrors({ password: "Invalid Credentials" });
      }
    },
  });
  return (
    <Fragment>
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
                  title={isLoading ? <Loader isLoading={isLoading} /> : "Login"}
                  type="submit"
                  className={styles.login_btn}
                  onClick={() => formik.handleSubmit()}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginComponent;
