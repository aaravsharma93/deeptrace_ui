//eslint-disable-next-line
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Card, TextField, InputAdornment, Dialog } from "@material-ui/core";
import { Button, Tooltip, Menu, MenuItem, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PageTitle } from "../../layout-components";
import { useHistory } from "react-router-dom"
import SearchIcon from '@material-ui/icons/Search';
import CompanyDetail from './companyDetail';
import useForm from './useForm';
// import Loading from '../../shared/Loading'
import { ClimbingBoxLoader } from 'react-spinners';

const Services = props => {


    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    let { companyData, removeCompany, StatusChange, postLoading } = useForm(props);

    const [showModal, setModal] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState({});
    const [modal4, setModal4] = useState(false);
    const toggle4 = () => {
        setModal4(false)
        // setAnchorEl(null);
        removeCompany(selectedData.id)

    };
    const closePopup = () => {
        setModal4(!modal4)
    }
    const handleClick = (event, item) => {
        setSelectedData(item)
        setAnchorEl(event.currentTarget);
    };
    useEffect(
        () => {
            // alert(postLoading,'postLoading')
            // let companyData = [
            //     {
            //         id: 1,
            //         company_id: '#453',
            //         contact_no: 7894562120,
            //         city: 'Delhi',
            //         country: 'India',
            //         state: 'UP',
            //         zipcode: '452345',
            //         email: 'Kane@mailinator.com',
            //         address: 'MY Square',
            //         street: '2334',
            //         company: 'Google'
            //     },]
            // setState({ companyData });

        }, []
    )

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteAction = (e, row) => {
        setModal4(true)
        // handleClose()
        // return removeCompany(row.id)
    };
    const handleCompanyStatus = (e, company_id) => {
        e.preventDefault();
        handleClose()
        return StatusChange(company_id)
    }
    const handleViewDetail = (e, item) => {
        setSelectedData(item)
        setModal(!showModal);
    };
    return (
        <Fragment>
            <PageTitle
                titleHeading="Company Management"
                titleDescription=""
                backLink="/company"
            />
            <Card className="card-box mb-4">
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">
                        Company List
                    </div>
                    <div className="card-header--actions">
                        <Tooltip arrow title="Add Company">
                            <Button variant="outlined" className="d-50 p-0 m-2" onClick={() => history.push('/company/create')}>
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['fas', 'plus-circle']} className="text-primary font-size-lg" />
                                </span>
                            </Button>
                        </Tooltip>
                    </div>
                    <div>
                        <TextField
                            className="app-search-input float-right"
                            inputProps={{ 'aria-label': 'search' }}
                            label="Search…"
                            placeholder="Search Company here…"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon className="app-search-icon" />
                                    </InputAdornment>
                                )
                            }}
                        /></div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover text-nowrap mb-0"><thead>
                        <tr><th className="bg-white text-left">Company ID</th>
                            <th className="bg-white">Company Name</th>
                            <th className="bg-white text-left">Email</th>
                            <th className="bg-white text-left">Contact No.</th>
                            <th className="bg-white text-center">View Details</th>
                            <th className="bg-white text-center">Actions </th></tr></thead><tbody>
                                {(companyData !== undefined) ? companyData.map((item) =>
                                <tr><td className="font-weight-bold">{item.company_id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.email_tech}</td>
                                    <td>{item.phone_number}</td>
                                    <td className="text-center">
                                        <Tooltip arrow title="View Details">
                                            <IconButton size="small" variant="outlined" color="primary" onClick={(e) => handleViewDetail(e, item)}>
                                                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                    <td className="text-center">
                                        <IconButton size="small" aria-controls="simple-menu" variant="contained" color="primary" aria-haspopup="true" onClick={(e) => handleClick(e, item)}>
                                            <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                                        </IconButton>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={() => history.push(`/company/edit/${selectedData.id}`)}>Edit</MenuItem>
                                            <MenuItem onClick={(e) => deleteAction(e, selectedData.id)}>Delete</MenuItem>
                                            <MenuItem onClick={(e) => handleCompanyStatus(e, selectedData.company_id)}>
                                                {(selectedData.status) === 0 ? 'Deactive' : 'Active'}</MenuItem>
                                        </Menu></td></tr>
                            ) : ''}
                        </tbody>
                    </table>
                </div>
                {/* <div className="d-flex align-items-center flex-column vh-60 justify-content-center text-center py-3">
            <div className="d-flex align-items-center flex-column px-4">
                <ClimbingBoxLoader color={'#5383ff'} loading={postLoading} />
            </div>
            <div className="text-muted font-size-xl text-center pt-3">
                Loading
            </div>
        </div> */}
                {(companyData === undefined) ?
                    <div className="card-footer py-3 text-center">
                        No Data Available</div> : ''}
               
            </Card>
            <Dialog open={modal4} onClose={closePopup}>
                <div className="text-center p-5">
                    <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first text-first m-0 d-130">
                            <FontAwesomeIcon icon={['far', 'keyboard']} className="d-flex align-self-center display-3" />
                        </div>
                    </div>
                    <h4 className="font-weight-bold mt-4">Are you sure you want to delete this company?</h4>
                    {/* <p className="mb-0 text-black-50">You can change your mind later.</p> */}
                    <div className="pt-4">
                        <Button onClick={toggle4} color="primary" variant="contained" className="mx-1">
                            <span className="btn-wrapper--label">
                                Delete
                            </span>
                        </Button>
                        <Button onClick={closePopup} variant="outlined" color="secondary" className="text-danger mx-1">
                            <span className="btn-wrapper--label">
                                Cancel
                            </span>
                        </Button>
                    </div>
                </div>
            </Dialog>
            {showModal ?
                <CompanyDetail selectedCompanyData={selectedData} openModal={showModal} /> : ''
            }
        </Fragment>
    );
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Services)