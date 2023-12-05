import React, { Fragment, useState , useEffect} from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Button, TextField} from '@material-ui/core';
import { Form, Input, Submit } from '../../theme/Form';
import { PageTitle } from '../../layout-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { postCall, getCall } from '../../api';

const Services = (props) => {
    const history = useHistory();
    var [title, setTitle] = useState()
    let [errors] = useState({});
    const formik = useFormik({
        initialValues: {
            title: title
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Title is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                id: props.match.params.id,
                title: values.title
            }
            let res = await postCall('role/update', JSON.stringify(data), true);
            if (res.success) {
                if(res.message === 'ROLE_UPDATED') {
                    toast.success('Role updated successfully.')
                    history.push('/role/list');
                }
            }
            if(res.error) {
                toast.error('Failed to update the role.')
            }
        }
    })
    useEffect(() => {
        getRole();
    }, []);
    const getRole = () => {
        let resp = getCall(`role/${localStorage.company_id}/get/${props.match.params.id}`, {}, true).then((res) => {
            let roles = res.role
            setTitle(roles.title)
            console.log(roles.title,'tiellee')
        });
        return resp;
    }
    // const setState = state => setTheState(prev => ({ ...prev, ...state }));
  
        // handleInputChange = (n, v) => {
        //     // const { name, value } = e.target;
        //     setState({
        //         ...state,
        //         [n]: v,
        //     });
        // };
    return (
        <Fragment>
            <PageTitle
                titleHeading="Edit Role"
                titleDescription=""
                backLink="/role" />
            <div>
                <Card className="card-box mb-4 bg-white">
                    <Grid item xs={12} lg={7} className="d-flex flex-column">
                        <Form onSubmit={formik.handleSubmit} errors={errors}>
                            <div className="p-4">
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={6}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Title" name="title"
                                                {...formik.getFieldProps('title')}
                                                InputLabelProps={{ shrink: true }} 
                                                error={formik.touched.title && Boolean(formik.errors.title)}
                                                helperText={formik.touched.title && formik.errors.title}
                                            /></div>
                                    </Grid>
                                    {/* <Grid item xs={12} lg={6}>
                                        <div>
                                            <TextField
                                                fullWidth
                                                label="Company Id" name="company_id" fullWidth value={fields.company_id} type="text"
                                                onChange={setFieldState}
                                                variant="outlined"
                                            />
                                        </div>
                                    </Grid> */}
                                </Grid>
                                <Submit label="Submit" className="m-4" />
                                <Button variant="outlined" color="primary" className="m-2" size="large" onClick={history.goBack}>
                                    Back
                                </Button>
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