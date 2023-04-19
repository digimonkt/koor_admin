import * as Yup from "yup";
export const validateLoginForm = Yup.object({
  email: Yup.string().email(" Invalid e-mail").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export const validateChangePasswordForm = Yup.object({
  currentPassword: Yup.string().required("Current Password is  Required"),
  newPassword: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password and current password must match"
    )
    .required("Confirm Password is Required"),
});
