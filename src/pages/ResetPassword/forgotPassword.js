import React, { Fragment, useState } from 'react';
import {
    Grid,
    Container,
    Card,
    CardContent,
    Button
} from '@material-ui/core';
import { Form, Input } from '../../theme/Form';
import { getValidationErrors } from '../../utils/yup.common';
import { postCall } from '../../api';
import { NavLink as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResetPasswordModel from './resetpassword.model'
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
    var [state, setTheState] = useState({
        username: "",
        new_password: "",
        confirm_password: "",
        old_password: "",
    })
    let [errors, setErrors] = useState({});
    const history = useHistory();

    const setState = state => setTheState(prev => ({ ...prev, ...state }));

    const handleChange = (n, v) => {
        // const { name, value } = e.target;
        setState({
            ...state,
            [n]: v,
        });
    };
    const handleSubmit = async () => {
        const errors = getValidationErrors({ state, schema: ResetPasswordModel });
        if (errors?.latest) {
            setErrors(errors)
            return;
        }
        let resp = await postCall('user/change-password', state, true);
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

    }
    return (
        <Fragment>
            <div className="app-wrapper min-vh-100">
                <div className="app-main flex-column">
                    <div className="app-content p-0">
                        <div className="app-content--inner d-flex align-items-center">
                            <div className="flex-grow-1 w-100 d-flex align-items-center">
                                <div className="bg-composed-wrapper--content py-5">
                                    <Container maxWidth="lg">

                                        <Grid container spacing={5}>

                                            <Grid item xs={12} lg={1} className="d-none d-xl-flex align-items-center">
                                            </Grid>
                                            <Grid item xs={12} lg={12} className="d-flex flex-column justify-content-center align-items-center">
                                                <Card className="m-0 w-100 p-4 border-0">
                                                    <CardContent className="p-0">
                                                        <Grid container >
                                                            <Button
                                                                size="large"
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white btn-go-back"
                                                                component={RouterLink}
                                                                to="/login">
                                                                <span className="btn-wrapper--icon">
                                                                    <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                                                                </span>
                                                                <span className="btn-wrapper--label">Back to login</span>
                                                            </Button>

                                                            <Grid item xs={4} lg={4} ></Grid>
                                                            <Grid item xs={4} lg={4} >
                                                                <span className="w-100 text-left text-md-center pb-4 mt-4">
                                                                    <p>      <img
                                                                        style={{ width: "auto" }}
                                                                        className="app-header-logo-img"
                                                                        alt="WINT"
                                                                        src={require('../../assets/images/logo/deeptracelogo.png')}
                                                                    />
                                                                        <b className="pl-2 font-size-lg"
                                                                            style={{ verticalAlign: 'middle' }}></b></p>
                                                                    <h1 className="display-3 text-lg text-center mb-3 font-weight-bold">
                                                                        Recover Password
                                                                    </h1>
                                                                </span>
                                                                <Form className="mt-4 p-4" errors={errors} errMsgShow={true}>
                                                                    <div className="mb-3">
                                                                        <Input label="Email address" name="username" fullWidth value={state.username} type="text"
                                                                            onChange={(n, v) => handleChange(n,v)} />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Input fullWidth type="password" name="old_password" label="Old Password"
                                                                            value={state.old_password}
                                                                            onChange={(n, v) => handleChange(n,v)} />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Input fullWidth type="password" name="new_password" label="New Password"
                                                                            value={state.new_password}
                                                                            onChange={(n, v) => handleChange(n,v)} />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Input fullWidth type="password" name="confirm_password" label="Confirm Password"
                                                                            value={state.confirm_password}
                                                                            onChange={(n, v) => handleChange(n,v)} />
                                                                    </div>
                                                                    <div className="W-100">
                                                                        <Button color="primary" variant="contained" fullWidth size="large" className="my-2" onClick={handleSubmit}>
                                                                            Reset Password
                                                                        </Button>
                                                                    </div>
                                                                </Form>
                                                            </Grid>
                                                            <Grid item xs={4} lg={4} ></Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                       </Grid>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default ForgotPassword;