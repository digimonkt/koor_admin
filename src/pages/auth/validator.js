import * as Yup from "yup";
import { REGEX } from "@utils/enum";

export const validateLoginForm = Yup.object({
  email: Yup.string()
    .matches(REGEX.email, "Invalid e-mail")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export const validateChangePasswordForm = Yup.object({
  mail: Yup.string(),
  newPassword: Yup.string().min(8, "Password must be at least 8 characters"),
  currentPassword: Yup.string().required("Current Password is Required"),
  confirmPassword: Yup.string()
    .when("newPassword", {
      is: e => e?.length > 0,
      then: () => Yup.string().required("Confirm Password is Required"),
      otherwise: () => Yup.string().notRequired(),
    })
    .required("Confirm Password is Required"),
});

export const validateSetPassword = Yup.object({
  getPoints: Yup.string().required("Set point is required"),
});

export const validatePlanForm = Yup.object({
  // plans: Yup.array().required(""),
});
