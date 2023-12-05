import React, { Fragment, useState } from 'react';
import {
    Grid,
    Card,
    Button, Divider, TextField
} from '@material-ui/core';
import { Form, Submit } from '../../theme/Form';
import { postCall } from '../../api';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import ChangePasswordModel from '../ChangePassword/changepassword.model'
import { PageTitle } from "../../layout-components";
import { useFormik } from 'formik';

const ChangePassword = () => {
    const history = useHistory();
    var [state, setTheState] = useState({
        username: localStorage.username,
        new_password: "",
        confirm_password: "",
        old_password: "",
    })
    let [errors, setErrors] = useState({});
    const setState = state => setTheState(prev => ({ ...prev, ...state }));
    const formik = useFormik({
        initialValues: {
            username: state.username,
            new_password: state.new_password,
            confirm_password: state.confirm_password,
            old_password: state.old_password,
        },
        enableReinitialize: true,
        validationSchema: ChangePasswordModel,
        onSubmit: async (values) => {
            let resp = await postCall('user/change-password', values, true);
            if (resp.success) {
                if (resp.message === 'PASSWORD_CHANGED') {
                    toast.success("Your password has been reset successfully.")
                    history.push('/login')
                }
                if (resp.message === 'NO_USER_FOUND') {
                    toast.error("No user found. Please check your user name.")
                }
                if (resp.message === 'INVALID_OLD_PASSWORD') {
                    toast.error("Your old password is invalid.")
                }
            }
        },
    })
    const handleChange = (n, v) => {
        setState({
            ...state,
            [n]: v,
        });
    };
    // const handleSubmit = async () => {
    //     const errors = getValidationErrors({ state, schema: ChangePasswordModel });
    //     if (errors?.latest) {
    //         setErrors(errors)
    //         return;
    //     }
    //     let resp = await postCall('user/change-password', state, true);
    //     if (resp.success) {
    //         if (resp.message === 'PASSWORD_CHANGED') {
    //             toast.success("Your password has been reset successfully.")
    //             history.push('/login')
    //         }
    //         if (resp.message === 'NO_USER_FOUND') {
    //             toast.error("No user found. Please check your user name.")
    //         }
    //         if (resp.message === 'INVALID_OLD_PASSWORD') {
    //             toast.error("Your old password is invalid.")
    //         }
    //     }
    // }
    return (
        <Fragment>
            <PageTitle
                titleHeading="Users Management"
                titleDescription=""
                to="/user"
            />
            <Grid container spacing={4}>
                <Grid item xs={12} lg={12}>
                    <Card className="p-4 mb-4">
                        <div className="font-size-lg font-weight-bold">Change Password</div>
                        <Divider className="my-4" />
                        <Grid container spacing={4} className="d-flex flex-column mr-2 mt-4">
                        <Form onSubmit={formik.handleSubmit} errors={errors}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField label="User name" name="username" fullWidth 
                                                 {...formik.getFieldProps('username')}
                                                 InputLabelProps={{ shrink: true }} 
                                                 variant="outlined"
                                                 error={formik.touched.username && Boolean(formik.errors.username)}
                                                 helperText={formik.touched.username && formik.errors.username} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField fullWidth type="password" name="old_password" 
                                            label="Old Password"
                                                  {...formik.getFieldProps('old_password')}
                                                  InputLabelProps={{ shrink: true }} 
                                                  variant="outlined"
                                                  error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                                                  helperText={formik.touched.old_password && formik.errors.old_password}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField fullWidth type="password" 
                                            name="new_password" label="New Password"
                                                value={state.new_password}
                                                variant="outlined"
                                                {...formik.getFieldProps('new_password')}
                                                InputLabelProps={{ shrink: true }} 
                                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                                  helperText={formik.touched.new_password && formik.errors.new_password} />
                                        </div>
                                    </Grid>

                                        <Grid item xs={12} lg={4}>
                                            <div>{state.confirm_password}
                                                <TextField fullWidth type="password"
                                                  name="confirm_password" 
                                                label="Confirm Password" value={state.confirm_password}
                                                {...formik.getFieldProps('confirm_password')}
                                                     variant="outlined"
                                                     InputLabelProps={{ shrink: true }}
                                                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}  />
                                            </div>
                                        </Grid>
                                    </Grid>
                                        <div className="mb-3 m-2">
                                        {/* <Button color="primary" variant="contained" size="large" onClick={handleSubmit}>
                                        Submit   </Button> */}
                                    <Submit label="Submit" className="m-4"/>
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
};
export default ChangePassword;