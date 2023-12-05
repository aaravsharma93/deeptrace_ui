
// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Card, Button, CardContent, Container, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { postCall } from 'api';
import userModel from '../../pages/User/user.model';
// import { getValidationErrors } from '../../utils/yup.common';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { Form } from "../../theme/Form";

const Signup = ({ match, location }) => {
    // var [state, setTheState] = useState({
    //     first_name: "",
    //     last_name: "",
    //     username: "",
    //     password: "",
    //     email: new URLSearchParams(location.search).get('email'),
    // })
    const history = useHistory();
    let [errors] = useState({});

    // const setState = state => setTheState(prev => ({ ...prev, ...state }));
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            email: new URLSearchParams(location.search).get('email'),
        },
        enableReinitialize: true,
        validationSchema: userModel,
        onSubmit: async (values) => {
            let resp = await postCall('user/create', JSON.stringify(values), true);
            if (resp.success) {
                if (resp.message === 'INVITE_NOT_SENT') {
                    toast.error("Invite Not Sent."
                    )
                }
                if (resp.message === 'INVITE_ALREADY_SENT') {
                    toast.warning("Invite has already been sent."
                    )
                }
                if (resp.message === 'USER_CREATED') {
                    toast.success("You have registered successfully."
                    )
                    history.push('/login');
                }
                if (resp.message === 'NO_COMPANY_FOUND') {
                    toast.error("Company Not Found."
                    )
                }
                if(resp.message === 'USERNAME_EXISTS') {
                    toast.error("Username already exist.")
                }

            };
        },
    })
    useEffect(() => {
        console.log(match, new URLSearchParams(location.search).get('email'))
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // const handleInputChange = (n, v) => {
    //     // const { name, value } = e.target;
    //     setState({
    //         ...state,
    //         [n]: v,
    //     });
    // };
    // const handleSubmit = async () => {
        // const errors = getValidationErrors({ state, schema: userModel });
        // if (errors?.latest) {
        //     setErrors(errors)
        //     return;
        // }
        // let resp = await postCall('user/create', state, true);

    // }
    return (
        <Fragment>
            <div className="app-wrapper min-vh-100">
                <div className="app-main flex-column">
                    <div className="app-content p-0">
                        <div className="app-content--inner d-flex align-items-center">
                            <div className="flex-grow-1 w-100 d-flex align-items-center">
                                <div className="bg-composed-wrapper--content py-5">
                                    <Container maxWidth="lg">
                                        {/* <Grid container spacing={5} style={{background:'#025792'}}> */}
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} lg={1} className="d-none d-xl-flex align-items-center">
                                                {/* <img alt="heyy" className="w-100 mx-auto d-block img-fluid" src={require('../../assets/images/vector2.png')} /> */}
                                            </Grid>
                                            <Grid item xs={12} lg={12} className="d-flex flex-column justify-content-center align-items-center">
                                                {/* <span className="w-100 text-left text-md-center pb-4">
                                                    <h1 className="display-3 text-xl-left text-center mb-3 font-weight-bold">
                                                       Welcome Back
                                                    </h1>
                                                    <p className="font-size-lg text-xl-left text-center mb-0 text-black-50">
                                                        We're glad you're working on your app. Login below
                                                        to continue.
                                                    </p>
                                                </span>                                             */}
                                                <Card className="m-0 w-100 p-0 border-0">
                                                    <CardContent className="p-0">

                                                        <Grid container >
                                                            {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
                                                            <Grid item xs={12} lg={5} className="d-flex flex-column align-items-center justify-content-center">
                                                                <span className="w-100 text-left text-md-center pb-4 mt-4">
                                                                   <div className="d-flex justify-content-center"> <img
                                                                        style={{ width: "auto" }}
                                                                        className="app-header-logo-img"
                                                                        alt="WINT"
                                                                        src={require('../../assets/images/logo/deeptracelogo.png')}
                                                                    /></div>
                                                                    <h1 className="display-3 text-xl-left text-center mb-3 font-weight-bold">
                                                                        Sign Up
                                                                    </h1>
                                                                    <p className="font-size-lg text-xl-left text-center mb-0 text-black-50">
                                                                        Fill in the fields below and you'll be good to go.

                                                                    </p>

                                                                </span>
                                                                <Form className="px-5" onSubmit={formik.handleSubmit} errors={errors}>
                                                                    {/* <Form className="px-5" errors={errors} errMsgShow={true}> */}
                                                                    <Grid container spacing={4} style={{ padding: '24px' }}>
                                                                        <Grid item xs={12} lg={12}>
                                                                            <div>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    className="m-2 pr-4"
                                                                                    label="First name"
                                                                                    variant="outlined"
                                                                                    name="first_name"
                                                                                    {...formik.getFieldProps('first_name')}
                                                                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                                                                    helperText={formik.touched.first_name && formik.errors.first_name} />
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item xs={12} lg={12}>
                                                                            <div>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    className="m-2 pr-4"
                                                                                    label="Last name"
                                                                                    variant="outlined"
                                                                                    name="last_name"
                                                                                    {...formik.getFieldProps('last_name')}
                                                                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                                                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                                                                />
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item xs={12} lg={12}>
                                                                            <div>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    className="m-2 pr-4"
                                                                                    label="Email"
                                                                                    variant="outlined"
                                                                                    name="email"
                                                                                    {...formik.getFieldProps('email')}
                                                                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                                                                    helperText={formik.touched.email && formik.errors.email}

                                                                                />
                                                                            </div>
                                                                        </Grid>

                                                                        <Grid item xs={12} lg={12}>
                                                                            <div>
                                                                                <TextField
                                                                                   fullWidth
                                                                                    className="m-2 pr-4"
                                                                                    label="User name"
                                                                                    variant="outlined"
                                                                                    name="username"
                                                                                    {...formik.getFieldProps('username')}
                                                                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                                                                    helperText={formik.touched.username && formik.errors.username}

                                                                                />
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item xs={12} lg={12}>
                                                                            <div >
                                                                                <TextField
                                                                                    type="password"
                                                                                    fullWidth
                                                                                    className="m-2 pr-4"
                                                                                    label="Password"
                                                                                    variant="outlined"
                                                                                    name="password"
                                                                                    {...formik.getFieldProps('password')}
                                                                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                                                                    helperText={formik.touched.password && formik.errors.password}

                                                                                />
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <div className="mb-3 m-2" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                                                                    {/* <Submit label="Submit" className="m-4" fullWidth size="large"/> */}

                                                                        <Button color="primary" variant="contained" fullWidth size="large" className="my-2" type="submit">
                                                                            Sign up   </Button>
                                                                            </div>
                                                                    {/* <Submit label="Submit" className="m-4" onClick={(e) => handleSubmit(e)}/> */}
                                                                    <hr />
                                                                </Form>
                                                                <p className="text-center">Already have an account? <Button className="pl-0" color="primary" onClick={() => history.push('/login')}>Sign In</Button></p>
                                                            </Grid>
                                                            <Grid item xs={12} lg={7} className="d-flex flex-column" style={{ background: 'rgb(220 237 239)' }}>
                                                                <img alt="..." className="w-auto float-left img-fluid" src={require('../../assets/images/vector3-removebg-preview.png')} />
                                                            </Grid>                                                </Grid>
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
        </Fragment>);
}
// const mapStateToProps = state => ({
//     user: state.user.user,
// });
// export default connect(mapStateToProps)(Services)
export default Signup;