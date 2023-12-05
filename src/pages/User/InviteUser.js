import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Grid, Card, Divider, TextField, MenuItem, Button } from "@material-ui/core";
import { Form, Submit } from "../../theme/Form";
import { PageTitle } from "../../layout-components";
import { useHistory } from "react-router-dom";
import { postCall, getCall } from 'api';
import inviteUserModel from '../../pages/User/inviteUser.model';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

const Services = props => {
    const [roles, setRoles] = useState([]);
    const [company, setCompany] = useState([]);
    const history = useHistory();
    let [errors] = useState({});


    useEffect(() => {
        getCompanyList().then((res) => {
            let data = res.companies
            setCompany(data)
        })
    }, []);
    const formik = useFormik({
        initialValues: {
            company_id: "",
            role_id: "",
            email: "",
        },
        validationSchema: inviteUserModel,
        onSubmit: async (values) => {
            let resp = await postCall('user/invite', JSON.stringify(values), true);
            if (resp.success) {
                if (resp.message === 'NO_COMPANY_FOUND') {
                    toast.error("Company Not Found.")
                }
                if (resp.message === 'INVITE_SENT') {
                    toast.success("Invitation has been sent successfully."
                    )
                }
                if (resp.message === 'INVITE_ALREADY_SENT') {
                    toast.error("Already sent invite."
                    )
                }
                if (resp.message === 'NO_ROLE_FOUND') {
                    toast.error("Role Not Found.")
                }
                history.push('/user/create');
            };
        },
    })
    // eslint-disable-line react-hooks/exhaustive-deps
    const getCompanyList = () => {
        let resp = getCall('company/dropdown', {}, true).then((res) => {
            return res
        });
        return resp;
    }
    const getRoleList = (e) => {
        console.log(e,'eeeee')
        let resp = getCall('role/list/'+e, {}, true).then((res) => {
            return res
        });
        return resp;
    }
    const handleSelect = (e) => {
        console.log('handle select', e)
        getRoleList(e).then((res) => {
            let data = res.roles
            setRoles(data)
        })
    }
    // const handleInputChange = (n, v) => {
    //     setState({
    //         ...state,
    //         [n]: v,
    //     });
    // };
    // const handleSubmit = async () => {
    //     const errors = getValidationErrors({ state, schema: inviteUserModel });
    //     if (errors?.latest) {
    //         setErrors(errors)
    //         return;
    //     }
    //     let resp = await postCall('user/invite', state, true);
    //     console.log(resp)
    //     if (resp.success) {
    //         toast.success(resp.message,
    //             {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true
    //             }
    //         )
    //         history.push('/user/create');
    //     };
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
                        <div className="font-size-lg font-weight-bold">Invite User</div>
                        <Divider className="my-4" />
                        <Grid container spacing={4} className="d-flex flex-column pr-4">
                            {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
                            <Form onSubmit={formik.handleSubmit} errors={errors}>

                                {/* <Form className="px-5" errors={errors} errMsgShow={true}> */}
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <TextField
                                                type="text"
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Email Address"
                                                variant="outlined"
                                                name="email"
                                                {...formik.getFieldProps('email')}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            {/* <Input
                                                type="text" fullWidth
                                                className="m-2 pr-4"
                                                id="outlined-basic"
                                                label="Company ID"
                                                variant="outlined"
                                                name="company_id"
                                                value={state.company_id}
                                                onChange={(n, v) => handleInputChange(n, v)}
                                            /> */}
                                            <TextField select
                                                fullWidth
                                                // onChange={handleChange}
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Company ID"
                                                variant="outlined"
                                                {...formik.getFieldProps('company_id')}
                                                error={formik.touched.company_id && Boolean(formik.errors.company_id)}
                                                helperText={formik.touched.company_id && formik.errors.company_id}
                                            >
                                                {(company !== undefined) ? company.map(option => (
                                                    <MenuItem key={option.id} value={option.id} onClick={()=>handleSelect(option.id)}
                                                    >
                                                        {option.title}
                                                    </MenuItem>
                                                )) : ''}</TextField>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            {/* <Input
                                                type="select" fullWidth className="m-2"
                                                id="outlined-basic"
                                                select
                                                label="Role"
                                                // onChange={handleChange}
                                                name="role_id"
                                                value={state.role_id}
                                                onChange={(n, v) => handleInputChange(n, v)}
                                                variant="outlined"
                                            > */}
                                            <TextField select
                                                fullWidth
                                                className="m-2"
                                                id="outlined-basic"
                                                label="Role"
                                                variant="outlined"
                                                // {...formik.onChange(()=>console.log('hiiiee'))}
                                                {...formik.getFieldProps('role_id')}
                                                error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                                                helperText={formik.touched.role_id && formik.errors.role_id}
                                            >
                                                {(roles !== undefined || roles !== 'undefined') ? roles.map((item, index) =>
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.title}
                                                    </MenuItem>
                                                )
                                                    : <tr className="text-center"><td style={{ width: '20%' }}>No Data Available</td></tr>}
                                            </TextField>
                                            {/* </Input> */}
                                        </div>
                                    </Grid>

                                </Grid>
                                <div className="mb-3 m-2">
                                    <Submit label="Send Invite" className="m-4" />
                                    {/* <Button color="primary" variant="contained" size="large" className="m-2" onClick={handleSubmit}>
                                        Send Invite </Button> */}
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