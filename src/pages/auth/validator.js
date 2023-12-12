import * as Yup from "yup";
import { REGEX } from "@utils/enum";

export const validateLoginForm = Yup.object({
  email: Yup.string()
    .matches(REGEX.email, "Invalid e-mail")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export const validateChangePasswordForm = Yup.object({
  mail: Yup.string().required("mail is Required"),
  currentPassword: Yup.string().required("Current Password is  Required"),
  newPassword: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password and current password must match",
    )
    .required("Confirm Password is Required"),
});

export const validateSetPassword = Yup.object({
  getPoints: Yup.string().required("Set point is required"),
});

export const validatePlanForm = Yup.object({
  // plans: Yup.array().required(""),
});
