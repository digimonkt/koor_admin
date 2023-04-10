import * as Yup from "yup";
export const validateLoginForm = Yup.object({
  email: Yup.string().email(" Invalid e-mail").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});
