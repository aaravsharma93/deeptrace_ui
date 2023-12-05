import { object, string } from "yup";
import * as Yup from 'yup';

export default object({

          username: string().required('Username is required.'),
          old_password: string().min(6).required('Old password is required.'),
          new_password: string().min(6,'New password must have 6 digits.').required('New password is required.'),
          confirm_password: string().min(6,'New password must have 6 digits.').required('Confirm password is required.')
          .oneOf([Yup.ref('new_password')], 'Passwords must match.')
  
}).typeError("Please enter all the fields");
