import React, { Fragment, useState, useEffect } from 'react';
import {
    Grid,
    Card,
    Button, Divider
} from '@material-ui/core';
import { Form, Input } from '../../theme/Form';
import { getValidationErrors } from '../../utils/yup.common';
import { postCall, getCall } from '../../api';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import ProfileModel from '../Profile/profile.model'
import { PageTitle } from "../../layout-components";

const Profile = () => {
    const history = useHistory();
    var [state, setTheState] = useState({
        username: localStorage.getItem('username'),
        first_name: localStorage.getItem('first_name'),
        last_name: localStorage.getItem('last_name')
    })
    let [errors, setErrors] = useState({});

    const setState = state => setTheState(prev => ({ ...prev, ...state }));
    useEffect(() => {
        getUserDetail().then(resp => {
            console.log(resp, 'getUser')
            // Object.keys(resp.user).map(function (keyName, keyIndex) {
            //     console.log(resp.user[keyName], keyName, 'keynamee')
            //     setState({
            //         // ...values,
            //         ...state,
            //         [keyName]: resp.user[keyName],
            //     });
            // })
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const getUserDetail = () => {
        let resp = getCall(`user/1/get/admin`)
        return resp;
    }
    const handleChange = (n, v) => {
        // const { name, value } = e.target;
        setState({
            ...state,
            [n]: v,
        })
    };
    const handleBlur = () => {
        const errors = getValidationErrors({ state, schema: ProfileModel });
        if (errors?.latest) {
            setErrors(errors)
            return;
        }
    }
    const handleSubmit = async () => {
        const errors = getValidationErrors({ state, schema: ProfileModel });
        if (errors?.latest) {
            setErrors(errors)
            return;
        }
        let resp = await postCall('user/update-profile', state, true);
        if (resp.success) {
            if (resp.message === 'PROFILE_UPDATED') {
                toast.success("Your profile has been updated successfully.")
                history.push('/dashboard')
            }
            if (resp.message === 'NO_USER_FOUND') {
                toast.error("No user found. Please check your user name.")
            }
        }
    }
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
                        <div className="font-size-lg font-weight-bold">Edit Profile</div>
                        <Divider className="my-4" />
                        <Grid container spacing={4} className="d-flex flex-column mr-2 mt-4">
                            <Form className="px-5" errors={errors} errMsgShow={true}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <Input label="User name" name="username" fullWidth value={state.username} type="text"
                                                onChange={(n, v) => handleChange(n, v)} onBlur={handleBlur} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <Input fullWidth type="text" name="first_name" label="First name"
                                                value={state.first_name}
                                                onChange={(n, v) => handleChange(n, v)} onBlur={handleBlur} />

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <Input fullWidth type="text" name="last_name" label="Last name"
                                                value={state.last_name}
                                                onChange={(n, v) => handleChange(n, v)} onBlur={handleBlur} />
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className="mb-3 m-2">
                                    <Button color="primary" variant="contained" size="large" onClick={handleSubmit}>
                                        Save  </Button>
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
export default Profile;