import { object, string } from "yup";
export default object({

          username: string().required('Username is required'),
          old_password: string().min(6).required('Password is required'),
          new_password: string().min(6).required('New password is required'),

          confirm_password: string().min(6).required('Confirm password is required'),

  
}).typeError("Please enter all the fields");
