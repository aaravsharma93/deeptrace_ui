import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, TextField, InputAdornment, Dialog } from "@material-ui/core";
import {
  Button,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Grid,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageTitle } from "../../layout-components";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import useForm from "./useForm";

const accountStatus = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

const Services = (props) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [roles] = useState([ {
    value: "Editor",
    label: "Editor",
  },
  {
    value: "Admin",
    label: "Admin",
  },]);
  let { userData, removeCompany, StatusChange} = useForm(props);

  const [selectedData, setSelectedData] = React.useState({});
  const [modal4, setModal4] = useState(false);
  const toggle4 = () => {
    setModal4(!modal4);
  };
  // const handleChange = (event) => {
  //   setRoles(event.target.value);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
  });
 
  const handleUserStatus = (e, username) => {
    e.preventDefault();
    handleClose();
    return StatusChange(username);
  };
  const handleClick = (event, item) => {
    setSelectedData(item);
    setAnchorEl(event.currentTarget);
  };
  const deleteUser = (e) => {
    setModal4(!modal4);
    return removeCompany(selectedData.id, selectedData.company_id)
  }
  const deleteAction = (e,row) => {
    setModal4(true);
    handleClose();
  };
  const columns = [
    {
      field: "Name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 150,
      // renderCell: renderActions
    },
    {
      field: "User Name",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "Account Status",
      headerName: "Account Status",
      width: 150,
    },

    {
      field: "",
      headerName: "Action",
      width: 150,
    },
  ];
  return (
    <Fragment>
      <PageTitle
        titleHeading="User Management"
        titleDescription=""
        backLink="/user"
      />
      <Card className="card-box mb-4">
        <div className="card-header py-3">
          <div className="card-header--title font-size-lg">Users List</div>

          <div className="card-header--actions">
            <Tooltip arrow title="Add User">
              <Button
                variant="outlined"
                className="d-40 p-0 m-2"
                onClick={() => history.push("/user/invite")}
              >
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={["fas", "plus-circle"]}
                    className="text-primary font-size-lg"
                  />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <TextField
              fullWidth
              className="m-4"
              id="outlined-basic"
              select
              label="Role"
              // onChange={handleChange}
              variant="outlined"
              size="small"
              value=""
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} lg={4} className="pr-2">
            <TextField
              fullWidth
              className="mr-4 m-4"
              id="outlined-basic"
              select
              label="Account Status"
              // onChange={handleChange}
              variant="outlined"
              size="small"
              value=""
            >
              {accountStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              fullWidth
              size="small"
              className="app-search-input m-4 pr-4"
              inputProps={{ "aria-label": "search" }}
              label="Search…"
              placeholder="Search User here…"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="app-search-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <div className="table-responsive">
          <table className="table table-hover text-nowrap mb-0">
            <thead>
              <tr>
                {columns.map((item) => (
                  <th className="bg-white text-left">{item.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userData !== undefined ? (
                userData.map((item, index) => (
                  <tr>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.status === 0 ? "Deactive" : "Active"}</td>
                    {/* <td>{item.contact_no}</td> */}
                    <td>
                      <IconButton
                        size="small"
                       aria-controls="simple-menu"
                        variant="contained"
                        color="primary"
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, item)}
                      >
                        <FontAwesomeIcon icon={["fas", "ellipsis-h"]} />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() =>
                            history.push(
                              `/user/edit/${selectedData.company_id}/${selectedData.username}`
                            )
                          }
                        >Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            history.push(`/user/get/${selectedData.company_id}/role/${selectedData.username}`)
                          }
                        >Update Role
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => deleteAction(e, selectedData)}
                        >
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={(e) =>
                            handleUserStatus(e, selectedData.username)
                          }
                        >
                          {selectedData.status === 0 ? "Active" : "Deactive"}
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))
              ) : ''}
            </tbody>
          </table>
        </div>
        {(userData === undefined) ?
          <div className="card-footer py-3 text-center">
            No Data Available</div> : ''}
      </Card>
      <Dialog open={modal4} onClose={toggle4}>
        <div className="text-center p-5">
          <div className="avatar-icon-wrapper rounded-circle m-0">
            <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first text-first m-0 d-130">
              <FontAwesomeIcon
                icon={["far", "keyboard"]}
                className="d-flex align-self-center display-3"
              />
            </div>
          </div>
          <h4 className="font-weight-bold mt-4">
            Are you sure you want to delete this user?
          </h4>
          {/* <p className="mb-0 text-black-50">You can change your mind later.</p> */}
          <div className="pt-4">
            <Button
              onClick={(e) => deleteUser(e)}
              color="primary"
              variant="contained"
              className="mx-1"
            >
              <span className="btn-wrapper--label">Delete</span>
            </Button>
            <Button
              onClick={toggle4}
              variant="outlined"
              color="secondary"
              className="text-danger mx-1"
            >
              <span className="btn-wrapper--label">Cancel</span>
            </Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Services);
