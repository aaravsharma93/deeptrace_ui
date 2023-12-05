import React, { Fragment, useState } from 'react';
import {
    Grid,
    Container,
    Card,
    CardContent,
    Button, TextField
} from '@material-ui/core';
import { Form, CheckBox } from '../../theme/Form';
import loginModel from './login.model';
import { login, addSession } from '../../api';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';


const Login = () => {
    const history = useHistory();
    const [checked1, setChecked1] = useState(true);
    // let [username, setUsername] = useState('');
    // let [password, setPassword] = useState('');
    let [errors, setErrors] = useState({});
    const handleChange1 = (n, v) => setChecked1(v);
    var [state, setTheState] = useState({
        username: '',
        password: "",

    })
    const formik = useFormik({
        initialValues: {
            username: state.username,
            password: state.password,
        },
        enableReinitialize: true,
        validationSchema: loginModel,
        onSubmit: async (values) => {
            // const errors = getValidationErrors({username, password, schema: loginModel });
            // if (errors?.latest) {
            //     setErrors(errors)
            //     return;
            // }
            let resp = await login('api/login', values, false);
            console.log(resp, 'login response');
            if (resp.access_token) {
                console.log('heyy iff', resp.access_token)
                toast.success("You have Logged in Successfully !")
                addSession(resp.access_token);
                localStorage.setItem('permission', JSON.stringify(resp.permissions));
                localStorage.setItem('refresh_token', resp.refresh_token);
                localStorage.setItem('first_name', resp.first_name);
                localStorage.setItem('last_name', resp.last_name);
                localStorage.setItem('username', resp.username);
                localStorage.setItem('email', resp.email);
                localStorage.setItem('company_id', resp.company_id);
                history.push('/dashboard')
            }
            if (resp.user === 'INVALID_USER') {
                toast.error("Invalid User.")
            }
        }
    })
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
                                                </span> */}
                                                <Card className="m-0 w-100 p-0 border-0">
                                                    <CardContent className="p-0">
                                                        <Grid container >
                                                            <Grid item xs={12} lg={5} md={5} className="p-4 d-flex flex-column align-items-center justify-content-center">
                                                                <span className="w-100 text-left text-md-center pb-4 mt-4">
                                                                    <div className="d-flex justify-content-center"> <img
                                                                        style={{ width: "auto" }}
                                                                        className="app-header-logo-img"
                                                                        alt="WINT"
                                                                        src={require('../../assets/images/logo/deeptracelogo.png')}
                                                                    /></div>
                                                                    <h1 className="display-3 text-xl-left text-center mb-3 font-weight-bold">
                                                                        Welcome Back
                                                                    </h1>
                                                                </span>
                                                                {/* {({ errors, touched }) => ( */}
                                                                <Form onSubmit={formik.handleSubmit} errors={errors}>
                                                                    {/* <Form className="px-5"> */}
                                                                    <div className="heading-3 mb-1">Email address</div>
                                                                    <div className="mb-3">
                                                                        {/* <Input label="Email address" name="username" fullWidth validateOnBlur={true}
                                                                        value={username} type="text" error
                                                                            onChange={(n, v) => setUsername(v)} /> */}
                                                                        <TextField label="User name" name="username" fullWidth
                                                                            {...formik.getFieldProps('username')}
                                                                            InputLabelProps={{ shrink: true }}
                                                                            variant="outlined"
                                                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                                                            helperText={formik.touched.username && formik.errors.username} />
                                                                    </div>
                                                                    <div className="heading-3 mb-1">Password</div>
                                                                    <div className="mb-3">
                                                                        <TextField fullWidth type="password" name="password"
                                                                            label="Password"
                                                                            {...formik.getFieldProps('password')}
                                                                            InputLabelProps={{ shrink: true }}
                                                                            variant="outlined"
                                                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                                                            helperText={formik.touched.password && formik.errors.password} />
                                                                        {/* <Input fullWidth type="password" name="password" label="Password"
                                                                            value={password}
                                                                            error
                                                                            onChange={(n, v) => setPassword(v)} /> */}
                                                                    </div>
                                                                    <div className="w-100">
                                                                        <CheckBox title="Keep me logged in" checked={checked1} onChange={handleChange1}
                                                                            value="checked1" color="primary" />
                                                                        <Button className="float-right mr-0 pr-0" color="primary" onClick={() => history.push('/reset-password')}>Forgot your password?</Button>
                                                                    </div>
                                                                    <div className="W-100">
                                                                        <Button color="primary" type="submit" variant="contained" fullWidth size="large" className="my-2">
                                                                            Log In
                                                                        </Button>
                                                                    </div>
                                                                    <hr />

                                                                </Form>
                                                                {/* )} */}
                                                                <p className="text-center">Don't have an account? <Button className="pl-0" color="primary" onClick={() => history.push('/signup')}>Sign up</Button></p>
                                                            </Grid>
                                                            <Grid item xs={12} lg={7} md={7} className="d-flex flex-column" style={{ background: 'rgb(220 237 239)' }}>
                                                                <img alt="..." className="w-auto float-left img-fluid" src={require('../../assets/images/vector3-removebg-preview.png')} />
                                                            </Grid>
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
export default Login;