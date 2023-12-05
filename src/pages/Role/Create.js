import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Button, MenuItem } from '@material-ui/core';
import { Form, Input } from '../../theme/Form';
import { PageTitle } from '../../layout-components';
import { useHistory } from "react-router-dom";
import { postCall, getCall } from '../../api';
import roleModel from './role.model'
import { getValidationErrors } from '../../utils/yup.common';
import { toast } from 'react-toastify';

const Services = props => {
    const [company, setCompany] = useState([]);
    const history = useHistory();
    let [errors, setErrors] = useState({});

    var [state, setTheState] = useState({
        companyId: '',
        title: "",
        role_id: ''
    })
    const setState = state => setTheState(prev => ({ ...prev, ...state }));
    useEffect(() => {
        getCompanyList().then((res) => {
            let data = res.companies
            setCompany(data)
        })
    }, []);
    const getCompanyList = () => {
        let resp = getCall('company/dropdown', {}, true).then((res) => {
            return res
        });
        return resp;
    }
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setState({
    //         ...state,
    //         [name]: value,
    //     });
    // };
    const handleChange = (n, v) => {
        setState({
            ...state,
            [n]: v,
        });
    };
    const handleSubmit = async (e) => {
        const errors = getValidationErrors({ state, schema: roleModel });
        if (errors?.latest) {
            setErrors(errors)
            return;
        }
        let resp = await postCall('role/create', state, true);
        if (resp.success) {
            if (resp.message === 'ROLE_EXISTS') {
                toast.error('Role Already Exist.')
            }
            if (resp.message === 'ROLE_CREATED') {
                toast.success('Role created successfully.'
                )

                history.push('/role/list');
            };
        }
    }
    return (
        <Fragment>
            <PageTitle
                titleHeading="Create Role"
                titleDescription=""
                backLink="/role" />
            <div>
                <Card className="card-box mb-4 bg-white">
                    <Grid item xs={12} lg={12} className="d-flex flex-column pr-2">
                        {/* <Form errors={errors} onSubmit={(e)=>handleFormSubmit(e)}> */}
                        <Form className="px-5" errors={errors} errMsgShow={true}>
                            <div className="p-4">
                                {/* <Input label="Title" name="title" fullWidth value={values.title} type="text"
                                onChange={handleInputChange} /> */}
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <div>
                                            <Input
                                                fullWidth
                                                label="Title" name="title"
                                                value={state.title}
                                                onChange={(n, v) => handleChange(n, v)} variant="outlined"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        {/* <div> */}
                                        <Input
                                            fullWidth
                                            label="Role Id" name="role_id"
                                            value={state.title}
                                            onChange={(n, v) => handleChange(n, v)}
                                            type="text"
                                            variant="outlined"
                                        />
                                        {/* </div> */}
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        {/* <div> */}
                                        {/* <Input
                                                fullWidth
                                                label="Company Id" name="company_id" 
                                                fullWidth value={state.title}
                                                onChange={(n, v) => handleInputChange(n, v)}
                                                variant="outlined"
                                            /> */}
                                        <Input fullWidth
                                            id="outlined-basic"
                                            select
                                            label="Company"
                                            onChange={(n, v) => handleChange(n, v)}
                                            name="companyId"
                                        >

                                            {company.map(option => (
                                                <MenuItem key={option.id} value={option.id}
                                                >
                                                    {option.title}
                                                </MenuItem>
                                            ))}</Input>
                                        {/* </div> */}
                                    </Grid>

                                </Grid>
                                <div className="mt-2">
                                    <Button color="primary" variant="contained" size="large"
                                        className="m-2" onClick={handleSubmit}>
                                        Submit  </Button>
                                    <Button variant="outlined" color="primary" className="m-2" size="large" onClick={history.goBack}>
                                        Back
                                    </Button></div>
                            </div>
                        </Form>
                    </Grid>
                </Card>
            </div>
        </Fragment>
    );
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Services)