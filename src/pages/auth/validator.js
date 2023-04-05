import * as Yup from "yup";
export const validateLoginForm = Yup.object({
  email: Yup.string()
    .email()
    .email("Field should contain a valid e-mail")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});
