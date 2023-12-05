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
    let [role_id, setRoleId] = React.useState('');

    const handleChange = (event) => {
        // setRoles(event.target.value);
        // const { n, v } = event.target;
        setRoleId(event.target.value);
        setState({
            'role_id': event.target.value,
        });
    };
    const [roles, setRoles] = useState([]);
    var [state, setTheState] = useState({})
    const history = useHistory();
    let { errors } = useForm(props, props.match.params.company_id);

    const companyId = props.match.params.company_id
    const username = props.match.params.username
    const setState = state => setTheState(prev => ({ ...prev, ...state }));
    const formik = useFormik({
        initialValues: {
            role_id: state.role_id,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            role_id: Yup.string().required('Please select role.')
        }),
        onSubmit: async (values) => {
            let resp = await postCall(`user/update-role/${username}`, JSON.stringify(values), true);
            if (resp.success) {
                if (resp.message === 'ROLE_UPDATED') {
                    toast.success('User role updated successfully.')
                    history.push('/user/list');
                } else if (resp.message === 'NO_USER_FOUND') {
                    toast.error('User not found.')
                }
            }
        },
    });
    useEffect(() => {
        getRoleList().then((res) => {
            let data = res.roles
            setRoles(data)
        })
        getUser().then(resp => {
            Object.keys(resp.user).map(function (keyName, keyIndex) {
                setRoleId(resp.user['role_id'])
                return setState({
                    'role_id': resp.user['role_id'],
                });
            })
        });
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
                        <Grid container spacing={4} className="d-flex flex-column mr-4">
                            <Form onSubmit={formik.handleSubmit} errors={errors}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField fullWidth className="m-2"
                                                id="outlined-select-currency"
                                                select
                                                label="Role"
                                                value={roles.length > 0 ?role_id:''}
                                                onChange={handleChange}
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
                                            {/* <TextField fullWidth className="m-2"
                                        id="outlined-select-currency"
                                        select
                                        label="Select"
                                        onChange={handleInputChange}
                                        helperText="Please select your currency"
                                        variant="outlined"
                                        >
                                             {roles.map(option => (
                                                    <MenuItem key={option.id} value={option.id}      
                                                                                               {...formik.getFieldProps('role_id')}
                                                    >
                                                        {option.title} {option.id}
                                                    </MenuItem>
                                                ))}
                                        </TextField> */}
                                            {/* <TextField fullWidth className="m-2"
                                                id="outlined-basic"
                                                select
                                                label="Role"
                                                variant="outlined"
                                                name="role_id"
                                                onChange={(n, v) => handleInputChange(n, v)}
                                                value={parseInt(state.role_id)} 
                                                // error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                                                // helperText={formik.touched.role_id && formik.errors.role_id}
                                            >

                                                {roles.map(option => (
                                                    <MenuItem key={option.id} value={option.id}                                                 {...formik.getFieldProps('role_id')}
                                                        {...formik.getFieldProps('role_id')}
                                                    >
                                                        {option.title}
                                                    </MenuItem>
                                                ))}</TextField>
                                            {/* {formik.touched.role_id && formik.errors.role_id ? (
                                                <div className="text-danger pl-2">{formik.errors.role_id}</div>
                                            ) : null} */}
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