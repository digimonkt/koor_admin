import { LabeledInput } from "@components/input";
import { Button } from "@mui/material";
import React from "react";
import styles from "./auth.module.css";

function LoginComponent() {
  return (
    <div className={styles.login_back_img}>
      <div className={styles.login}>
        <h5 className={styles.login_heading}>Admin Login</h5>
        <div className={styles.login_input_div}>
          <div>
            <LabeledInput title="Email" placeholder="Your Email" type="email" />
            <LabeledInput
              title="Password"
              placeholder="Your Password"
              type="password"
            />
            <span className={styles.login_forgot}>Forgot Password</span>
            <div className={styles.login_btn_div}>
              <Button className={styles.login_btn}>Login</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
