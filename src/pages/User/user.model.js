import { object, string } from "yup";
export default object({
  
        first_name: string()
          .min(3, 'Must be 3 characters or more')
          .required('First name is required'),
          last_name: string()
          .min(3, 'Must be 3 characters or more')
          .required('Last name is required'),
          username: string()
          .required('Username is required'),
          password: string().min(6).required('Password is required'),
          email: string().email('Invalid email address').required('Email is required').nullable()
  
}).typeError("Please enter all the fields");
