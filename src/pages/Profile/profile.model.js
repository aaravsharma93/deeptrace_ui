import { object, string } from "yup";
export default object({

          username: string().required('Username is required.'),
          first_name: string().required('First name is required.'),
          last_name: string().required('Last name is required.'),
  
}).typeError("Please enter all the fields");
