import { object, string } from "yup";
export default object({
  
  role_id: string().required('Role is required'),
          company_id: string()
          .required('Company Id is required'),
          email: string().email('Invalid email address').required('Email is required')
  
}).typeError("Please enter all the fields");
