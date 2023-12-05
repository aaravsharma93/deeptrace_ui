import { object, string, number } from "yup";
var pattern = new RegExp(/^[0-9\b]+$/);

export default object({
          title: string()
          .min(3, 'Must be 3 characters or more')
          .required('Title is required'),
          city: string()
          .min(3, 'Must be 3 characters or more')
          .required('City is required'),
          street_number: string()
          .required('Street number is required'),
          street: string().required('Street is required'),
          country: string().required('Country is required'),
          zipcode: number().min(5, 'zipcode must have 5 digit.').required('Zipcode is required'),
          email_tech: string().email('Invalid email address').required('Email(tech) is required'),
          email_ops: string().email('Invalid email address'),
        phone_number: string().min(10, 'Contact no. must have 10 digit').max(10, 'Contact no. must have 10 digit').matches(pattern,'Contact no. must be valid').required('Contact no. is required.'),
 
}).typeError("Please enter all the fields");
