import { object, string, number ,mixed} from "yup";

export default object({
        file: mixed().required('File is required.'),
          type: string().required('Tracking id is required')
 
}).typeError("Please enter all the fields");
