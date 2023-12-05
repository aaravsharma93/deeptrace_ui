import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  MenuItem,
} from "@material-ui/core";
import { Form, Submit } from "../../theme/Form";
import { PageTitle } from "../../layout-components";
import { useHistory } from "react-router-dom";
import { postFileApiCall } from "api";
import { toast } from "react-toastify";
import FileUploadModel from '../../pages/File/FileUpload.model';
import { useFormik } from "formik";
import Dropzone, { useDropzone } from "react-dropzone";
import MuiAlert from "@material-ui/lab/Alert";
import * as XLSX from 'xlsx';
import CSVReader from 'react-csv-reader'

const Services = (props) => {
  const history = useHistory();
  let [errors] = useState({});
  const [file, setFile] = useState([]);
  const [type, setType] = useState("");
  const [isSubmiiting, SetIsSubmitting] = useState(false);
  const [tractingID, setTractingID] = useState([
    { key:'REPLACE_TRACKING_ID', value: "Replace Tracking ID" },
    { key:'ADD_TRACKING_ID',  value: "Add Tracking ID" },
    // { key:'CHANGE_STATUS',  value: "Change Status" },
  ]);

  const changeHandler = (event) => {
    console.log(event.target.file, 'event')
    setFile(event.target.files[0]);
    // event.target.files[0] && setIsFilePicked(true);
   };

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
  }
//   const onDrop =(files)=> {
//     console.log(files,'files')
//     setFile(files[0]);
// };
  const onDrop = (e) => {
    // console.log(typeof file, file, e, file.length, ";filesss");
    setFile(e);
    console.log(e,"next file");
    const file = e;
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      console.log(bstr,'bstr')
      // const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      // const wsname = wb.SheetNames[0];
      // const ws = wb.Sheets[wsname];
      // /* Convert array of arrays */
      // const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      // processData(data);
    };
        // reader.readAsBinaryString(file);
  }
  const handleInputChange = (e) => {
    console.log(e, 'eee')
    setType(e.target.value)
  }
  const onCancel = () => {
    setFile([]);
  };
  const handleBlur = () => {
    console.log('handleBlur')
  }
  const handleFileUpload = e => {
    e.preventDefault();
    console.log('heyy',e.target.files)
    const file1 = e.target.files[0];
    console.log(file1, 'file1')
    // setFile(file1);

    const reader = new FileReader();
    setFile(file1)
    // reader.onloadend = (e)=>{
    //   setFile(e.target.result)
    //   console.log(e.target.result, 'e')
    // }
    // reader.readAsBinaryString(file1);
  }
  const formik = useFormik({
    initialValues: {
      file: "",
      type: ""
    },
    // validationSchema: FileUploadModel,
    onSubmit: async (values) => {
      console.log(values, file, 'values')
      const body = {
        file: file,
        type: values.type
      }
      console.log(body, 'body')
      var formData = new FormData();
      formData.append('file', file);
      formData.append('type', values.type);
      let resp = await postFileApiCall('ciodata/upload-csv', formData, true);
      if (resp.processed) {
        if (resp.message === 'SUCCESS') {
          // resetForm();
          toast.success('File uploded successfully.')
        }
        else {
          toast.error('Failed to upload the file.')
        }
        history.push('/');
      };
    },
  })
  return (
    <Fragment>
      <PageTitle
        titleHeading="File Management"
        titleDescription=""
        backLink="/file"
      />
      <Grid container className="d-flex justify-content-center">
        <Card className="p-4 mb-4 justify-content-center w-50">
          <div className="font-size-lg font-weight-bold">Upload File </div>
          <Form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4} className="mt-4">
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  select
                  label="Tracking ID"
                  value={type}
                  onSelect={handleInputChange}
                  // onChange={handleInputChange}
                  variant="outlined"
                  name="type"
                  {...formik.getFieldProps('type')}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
              >
                  {tractingID.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            {/* </Grid>
            <Grid container spacing={4}> */}
              <Grid item xs={12} sm={12}>
                <div className="dropzone">
                <input type="file" name="file" onChange={changeHandler} />

                  <Dropzone
                    onDrop={onDrop.bind(this)}
                    onFileDialogCancel={onCancel.bind(this)}
                    name="file"
                    onBlur={handleBlur}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} name="file" type="file"
                        onChange={handleFileUpload}
                          // accept=".csv"                        
                        />

                        <div className="dz-message">
                          <div className="dx-text">
                            Please select any CSV file to upload.
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </Grid>
            {/* </Grid>
            <Grid container spacing={4}> */}
              <Grid
                item
                md={12}
                className="d-flex justify-content-center align-items-center"
              >{formik.values.file}
                <div className="w-100">
                  {" "}
                 {formik.touched.type && formik.errors.file &&  file !== '' ? (<MuiAlert severity="warning">
                   {(formik.errors.file)}
          </MuiAlert>): (file !== 0 ? (
                    <MuiAlert severity="success">
                      Files uploaded will appear here!
                    </MuiAlert>
                  ) : (
                    <List>
                      <ListItem className="font-weight-bold text-center">
                        Uploaded Files:
                      </ListItem>
                      <ListItem>{file.name}</ListItem>
                    </List>
                  ))
}
                  
                  <div className="d-flex mt-2">
                    <Submit label="Submit" />
                    <Button
                      variant="outlined"
                      color="primary"
                      className="m-2"
                      size="large"
                      onClick={history.goBack}
                    >
                      Back
                    </Button></div>
                </div>
              </Grid>
            </Grid>
          </Form>
        </Card>
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Services);
