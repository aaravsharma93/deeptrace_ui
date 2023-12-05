import React, { Fragment, useState } from 'react';
import { connect } from "react-redux";
import { Grid, Card, Divider, TextField, Button } from "@material-ui/core";
import { Form, Submit } from "../../theme/Form";
import { PageTitle } from "../../layout-components";
import { useHistory } from "react-router-dom";
import { postCall } from 'api';
import { toast } from 'react-toastify';
import companyModel from '../../pages/Company/company.model';
import { useFormik } from 'formik';

const Services = props => {
    const history = useHistory();
    let [errors] = useState({});

    const formik = useFormik({
        initialValues: {
            company_id: "",
            title: "",
            email_tech: "",
            email_ops: "",
            phone_number: "",
            city: "",
            street_number: "",
            street: "",
            country: "",
            zipcode: "",
        },
        validationSchema: companyModel,
        onSubmit: async (values) => {
            const body = {
                company_id: values.company_id,
                title: values.title,
                email_tech: values.email_tech,
                email_ops: values.email_ops,
                phone_number: ''+values.phone_number,
                city: values.city,
                street_number: values.street_number,
                street: values.street,
                country: values.country,
                zipcode: ''+values.zipcode
            }
            let resp = await postCall('company/create', JSON.stringify(body), true);
                if (resp.success) {
                if(resp.message === 'COMPANY_CREATED') {
                    toast.success('Company created successfully.')
                }
                if(resp.message === 'COMPANY_ID_EXISTS')
                {
                    toast.error('Company id already exist.')
                }
                history.push('/company/list');
            };
        },
    })
    // const handleSubmit = async () => {
    //     const errors = getValidationErrors({ state, schema: companyModel });
    //     if (errors?.latest) {
    //         setErrors(errors)
    //         return;
    //     }
    //     let resp = await postCall('company/create', state, true);
    //     if (resp.success) {
    //      if(resp.message === 'COMPANY_CREATED') {
    //         toast.success('Company created successfully.')
    //      }
    //      if(resp.message === 'COMPANY_ID_EXISTS')
    //      {
    //         toast.error('Company id already exist.')
    //      }
    //         history.push('/company/list');
    //     };
    // }
     return (
        <Fragment>
            <PageTitle
                titleHeading="Company Management"
                titleDescription=""
                backLink="/company"
            />
            <Grid container spacing={4}>
                <Grid item xs={12} lg={12}>
                    <Card className="p-4 mb-4">
                        <div className="font-size-lg font-weight-bold">Add Company </div>
                        <Divider className="my-4" />
                        <Grid container spacing={4} className="d-flex flex-column pr-4">
                            <Form onSubmit={formik.handleSubmit} errors={errors}>
                                {/* <Form className="px-5" errors={errors} errMsgShow={true}> */}
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            {/* <Input type="text"
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Company Name"
                                                variant="outlined"
                                                name="title"
                                                {...formik.getFieldProps('title')}
                                                />
                                                {formik.touched.title && formik.errors.title ? (
                                                  <div className="text-danger pl-2">{formik.errors.title}</div>
                                                ) : null} */}
                                            {/* <Input
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Company Name"
                                                variant="outlined"
                                                name="title"
                                                value={state.title}
                                                onBlur={handleBlur}
                                                onChange={(n, v) => handleInputChange(n, v)}
                                                
                                            /> */}
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Title"
                                                variant="outlined"
                                                {...formik.getFieldProps('title')}
                                                error={formik.touched.title && Boolean(formik.errors.title)}
                                                helperText={formik.touched.title && formik.errors.title}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Company ID"
                                                variant="outlined"
                                                name="company_id"
                                                {...formik.getFieldProps('company_id')}
                                                error={formik.touched.company_id && Boolean(formik.errors.company_id)}
                                                helperText={formik.touched.company_id && formik.errors.company_id} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField 
                                                fullWidth
                                                className="m-2"
                                                label="Contact Email(Tech)"
                                                variant="outlined"
                                                name="email_tech"
                                                {...formik.getFieldProps('email_tech')}
                                                error={formik.touched.email_tech && Boolean(formik.errors.email_tech)}
                                                helperText={formik.touched.email_tech && formik.errors.email_tech} />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Contact Email"
                                                variant="outlined"
                                                name="email_ops"
                                                {...formik.getFieldProps('email_ops')}
                                                error={formik.touched.email_ops && Boolean(formik.errors.email_ops)}
                                                helperText={formik.touched.email_ops && formik.errors.email_ops}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField type="number"
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Contact no."
                                                variant="outlined"
                                                name="phone_number"
                                                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                                                {...formik.getFieldProps('phone_number')}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Country"
                                                variant="outlined"
                                                {...formik.getFieldProps('country')}
                                                error={formik.touched.country && Boolean(formik.errors.country)}
                                                helperText={formik.touched.country && formik.errors.country}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="City"
                                                variant="outlined"
                                                name="city"
                                                {...formik.getFieldProps('city')}
                                                error={formik.touched.city && Boolean(formik.errors.city)}
                                                helperText={formik.touched.city && formik.errors.city}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Address Street"
                                                variant="outlined"
                                                {...formik.getFieldProps('street')}
                                                error={formik.touched.street && Boolean(formik.errors.street)}
                                                helperText={formik.touched.street && formik.errors.street}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Street No."
                                                variant="outlined"
                                                name="street_number"
                                                {...formik.getFieldProps('street_number')}
                                                error={formik.touched.street_number && Boolean(formik.errors.street_number)}
                                                helperText={formik.touched.street_number && formik.errors.street_number}
                                            />

                                        </div>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Zipcode"
                                                variant="outlined"
                                                {...formik.getFieldProps('zipcode')}
                                                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                                                helperText={formik.touched.zipcode && formik.errors.zipcode}
                                            />
                                        </div>
                                    </Grid>

                                </Grid>
                                <div className="mb-3 m-2">
                                    <Submit label="Submit" className="m-4" />

                                    {/* <Button color="primary" variant="contained" size="large" className="m-2" onClick={handleSubmit}>
                                        Submit </Button> */}
                                    <Button variant="outlined" color="primary" className="m-2" size="large" onClick={history.goBack}>
                                        Back
                                    </Button>
                                </div>
                            </Form>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Services)