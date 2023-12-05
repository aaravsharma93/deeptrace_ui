import { object, string } from "yup";

export default object({
    title: string()
        .required("Please enter the Title.")
        .label("Title"),
        companyId: string()
        .required("Please select the company.")
        .label("Title"),
        role_id: string()
        .required("Please enter the role id.")
        .label("Title")
}).typeError("Please enter all the fields");
