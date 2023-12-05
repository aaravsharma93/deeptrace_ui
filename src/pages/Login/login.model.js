import { object, string } from "yup";

export default object({
  password: string()
    .required("Please enter the password.")
    .min(5),
    username: string()
    .required("Please enter the username.")
    // .email()
    .label("E-mail"),
}).typeError("Please enter all the fields");
