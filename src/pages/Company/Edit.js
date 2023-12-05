import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Grid, Card, Divider, TextField, Button } from "@material-ui/core";
import { Form, Submit } from "../../theme/Form";
import { PageTitle } from "../../layout-components";
import { useHistory } from "react-router-dom";
import useForm from './useForm';
import { postCall, getCall } from '../../api'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import EditCompanyModel from '../../pages/Company/Editcompany.model';

const Services = props => {
    const history = useHistory();
    let { errors } = useForm();
    const editId = props.match.params.company_id
    var [state, setTheState] = useState({
    });
    const formik = useFormik({
        initialValues: {
            id: state.company_id,
            title: state.title,
            email_tech: state.email_tech,
            email_ops: state.email_ops,
            phone_number: state.phone_number,
            city: state.city,
            street_number: state.street_number,
            street: state.street,
            country: state.country,
            zipcode: state.zipcode,
        },
        enableReinitialize: true,
        validationSchema: EditCompanyModel,
        onSubmit: async (values) => {
            const body = {
                    id: parseInt(props.match.params.company_id),
                    title: values.title,
                    email_tech: values.email_tech,
                    email_ops: values.email_ops,
                    phone_number: ''+values.phone_number,
                    city: values.city,
                    street_number: values.street_number,
                    street: values.street,
                    country: values.country,
                    zipcode: ''+values.zipcode,
            }
            await postCall('company/update', JSON.stringify(body), true).then((res) => {
                if (res.success) {
                    if(res.message === 'COMPANY_UPDATED')
                    toast.success('Company data updated successfully.'
                    )
                    history.push('/company/list');
                }
                if(res.error) {
                    toast.error('Failed to update the company.')
                }
            })
        },
    })

    const setState = state => setTheState(prev => ({ ...prev, ...state }));

    useEffect(() => {
        const getCompany = () => {
            getCall(`company/get/${editId}`).then(resp => {
                Object.keys(resp.company).map((keyName, keyIndex) => {
                  return setState({
                        ...state,
                        [keyName]: resp.company[keyName],
                    });
                })
            });
            // return resp;
        }
        getCompany()
         // eslint-disable-next-line
    },[editId]);

    

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
                        <div className="font-size-lg font-weight-bold">Edit Company </div>
                        <Divider className="my-4" />
                        <Grid container spacing={4} className="d-flex flex-column pr-4">
                            {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
                            <Form onSubmit={formik.handleSubmit} errors={errors}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Company Name"
                                                variant="outlined"
                                                name="title"
                                                {...formik.getFieldProps('title')}
                                                InputLabelProps={{ shrink: true }} 
                                                error={formik.touched.title && Boolean(formik.errors.title)}
                                                helperText={formik.touched.title && formik.errors.title} />
                                        </div>
                                    </Grid>
                                    {/* <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Company ID"
                                                variant="outlined"
                                                name="company_id"
                                                InputLabelProps={{ shrink: true }} 
                                                {...formik.getFieldProps('company_id')}
                                                error={formik.touched.company_id && Boolean(formik.errors.company_id)}
                                                helperText={formik.touched.company_id && formik.errors.company_id} />
                                        </div>
                                    </Grid> */}
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                label="Contact Email(Tech)"
                                                variant="outlined"
                                                name="email_tech"
                                                InputLabelProps={{ shrink: true }} 
                                                {...formik.getFieldProps('email_tech')}
                                                error={formik.touched.email_tech && Boolean(formik.errors.email_tech)}
                                                helperText={formik.touched.email_tech && formik.errors.email_tech} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Contact Email"
                                                variant="outlined"
                                                name="email_ops"
                                                InputLabelProps={{ shrink: true }} 
                                                {...formik.getFieldProps('email_ops')}
                                                error={formik.touched.email_ops && Boolean(formik.errors.email_ops)}
                                                helperText={formik.touched.email_ops && formik.errors.email_ops}
                                            />

                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField type="number"
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Contact no."
                                                variant="outlined"
                                                name="phone_number"
                                                InputLabelProps={{ shrink: true }} 
                                                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                                                {...formik.getFieldProps('phone_number')}
                                            />
                                            {/* {formik.touched.phone_number && formik.errors.phone_number ? (
                                                  <div className="text-danger pl-2">{formik.errors.phone_number}</div>
                                                ) : null} */}
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
                                                InputLabelProps={{ shrink: true }} 
                                                {...formik.getFieldProps('country')}
                                                error={formik.touched.country && Boolean(formik.errors.country)}
                                                helperText={formik.touched.country && formik.errors.country}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="City"
                                                variant="outlined"
                                                name="city"
                                                InputLabelProps={{ shrink: true }}
                                                {...formik.getFieldProps('city')}
                                                error={formik.touched.city && Boolean(formik.errors.city)}
                                                helperText={formik.touched.city && formik.errors.city}
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
                                                label="Address Street"
                                                variant="outlined"
                                                InputLabelProps={{ shrink: true }} 
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
                                                InputLabelProps={{ shrink: true }}
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
                                            <TextField type="number"
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Zipcode"
                                                variant="outlined"
                                                InputLabelProps={{ shrink: true }} 
                                                {...formik.getFieldProps('zipcode')}
                                                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                                                helperText={formik.touched.zipcode && formik.errors.zipcode}
                                            />

                                        </div>
                                    </Grid>

                                </Grid>
                                <div className="mb-3 m-2">
                                    <Submit label="Submit" className="m-4" />
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