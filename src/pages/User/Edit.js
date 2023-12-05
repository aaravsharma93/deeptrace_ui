import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Grid, Card, Divider, TextField, MenuItem, Button } from "@material-ui/core";
import { Form, Submit } from "../../theme/Form";
import { PageTitle } from "../../layout-components";
import { useHistory } from "react-router-dom";
import { postCall, getCall } from 'api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useForm from './useForm';
import { toast } from 'react-toastify';

const Services = props => {
    const [roles, setRoles] = useState([]);
    const [company, setCompany] = useState([]);
    let [role_id, setRoleId] = React.useState('')
    let [selected_company_Id, setSelectedCompanyId] = useState('');
    var [state, setTheState] = useState({})
    const history = useHistory();
    let { errors } = useForm(props, props.match.params.company_id);

    const companyId = props.match.params.company_id
    const username = props.match.params.username
    const setState = state => setTheState(prev => ({ ...prev, ...state }));
    const formik = useFormik({
        initialValues: {
            first_name: state.first_name,
            last_name: state.last_name,
            username: state.username,
            email: state.email,
            role_id: state.role_id,
            company_id: state.company_id,
            role: state.role
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            company_id: Yup.number().required('Company Id is required.'),
            first_name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('First name is required'),
            last_name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Last name is required'),
            username: Yup.string()
                .required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required')
        }),
        onSubmit: async (values) => {
            let resp = await postCall('user/update', JSON.stringify(values), true)
            if (resp.success) {
                if (resp.message === 'USER_UPDATED') {
                    toast.success('User data updated successfully.')
                    history.push('/user/list');
                } else {
                    toast.error('Failed to update the user.')
                }
            }
        },
    })
    useEffect(() => {
        getRoleList().then((res) => {
            let data = res.roles
            setRoles(data)
        })
        getUser().then(resp => {
            Object.keys(resp.user).map(function (keyName, keyIndex) {
                setRoleId(resp.user['role_id'])
                setSelectedCompanyId(resp.user['company_id'])
                return setState({
                    // ...values,
                    ...state,
                    [keyName]: resp.user[keyName],
                });
            })
        });

        getCall('company/dropdown', {}, true).then((res) => {
            let data = res.companies
            setCompany(data)
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const getUser = () => {
        let resp = getCall(`user/${companyId}/get/${username}`)
        return resp;
    }
    const getRoleList = () => {
        let resp = getCall('role/list/16', {}, true).then((res) => {
            return res
        });
        return resp;
    }

    const handleInputChange = (event) => {
        setRoleId(event.target.value);
        setState({
            // ...state,
            // ['role_id']: event.target.value,
            'role_id': event.target.value,
        });
    };
    const handleCompanyChange = (event) => {
        setSelectedCompanyId(event.target.value);
        setState({
            // ...state,
            // ['role_id']: event.target.value,
            'company_id': event.target.value,
        });
    };
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
                        <div className="font-size-lg font-weight-bold">Edit User</div>
                        <Divider className="my-4" />
                        <Grid container spacing={4} className="d-flex flex-column pr-4">
                            <Form onSubmit={formik.handleSubmit} errors={errors}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="First name"
                                                variant="outlined"
                                                name="first_name"
                                                InputLabelProps={{ shrink: true }}
                                                {...formik.getFieldProps('first_name')}
                                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                                helperText={formik.touched.first_name && formik.errors.first_name} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                label="Last name"
                                                variant="outlined"
                                                name="last_name"
                                                InputLabelProps={{ shrink: true }}
                                                {...formik.getFieldProps('last_name')}
                                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                                helperText={formik.touched.last_name && formik.errors.last_name} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                label="Email"
                                                variant="outlined"
                                                name="email"
                                                InputLabelProps={{ shrink: true }}
                                                {...formik.getFieldProps('email')}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email} />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>

                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                label="User name"
                                                variant="outlined"
                                                name="username"
                                                InputLabelProps={{ shrink: true }}
                                                {...formik.getFieldProps('username')}
                                                error={formik.touched.username && Boolean(formik.errors.username)}
                                                helperText={formik.touched.username && formik.errors.username} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField fullWidth className="m-2"
                                                select
                                                label="Role"
                                                value={roles.length > 0 ?role_id:''}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                                name="role_id"
                                                error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                                                helperText={formik.touched.role_id && formik.errors.role_id}
                                            >
                                                {roles.map(option => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                       {option.title}
                                                    </MenuItem>
                                                ))}

                                            </TextField> 
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField select
                                                fullWidth
                                                className="m-2"
                                                label="Company ID"
                                                variant="outlined"
                                                name="company_id"
                                                value={company.length > 0 ? selected_company_Id:''}
                                                onChange={handleCompanyChange}
                                                error={formik.touched.company_id && Boolean(formik.errors.company_id)}
                                                helperText={formik.touched.company_id && formik.errors.company_id}
                                            >
                                                {(company !== undefined) ? company.map(option => (
                                                    <MenuItem key={option.id} value={option.id}
                                                    >
                                                        {option.title} {option.id}
                                                    </MenuItem>
                                                )) : ''}</TextField>
                                            {/* <TextField
                                                fullWidth
                                                className="m-2 pr-4"
                                                id="outlined-basic"
                                                label="Company Id"
                                                variant="outlined"
                                                name="company_id"
                                                InputLabelProps={{ shrink: true }} 
                                                {...formik.getFieldProps('company_id')}
                                                error={formik.touched.company_id && Boolean(formik.errors.company_id)}
                                                helperText={formik.touched.company_id && formik.errors.company_id} /> */}
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