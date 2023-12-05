import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  IconButton,
  Card,
  Button,
  Menu,
  MenuItem,
  Dialog, Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { PageTitle } from "../../layout-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import useForm from "./useForm";

const Services = (props) => {
  const history = useHistory();
  let { roles, DeleteRole, StatusChange } = useForm(props);
  // const [state] = useState({
  //   // roles: []
  // });
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal4, setModal4] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const toggle4 = () => {
    setModal4(!modal4);
  };
  const deleteRole = () => {
    DeleteRole(selectedData.id);
    setModal4(!modal4);
  }
  const handleUserStatus = (e, username) => {
    e.preventDefault();
    handleClose();
    return StatusChange(username);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event, item) => {
    setSelectedData(item);
    setAnchorEl(event.currentTarget);
  };
  const renderActions = (params) => {
    return (
      <>
        <IconButton
          aria-label="delete"
          component={Link}
          to={`/role/${params.company_id}/edit/${params.id}`}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deleteAction(params)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </>
    );
  };

  const deleteAction = (e, row) => {
    setModal4(true);
    handleClose();
    // return DeleteRole(row.id);
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "Role Id",
      headerName: "Role Id",
      width: 150,
    },
    {
      field: "",
      headerName: "Action",
      width: 150,
      renderCell: renderActions,
    },
  ];

  return (
    <Fragment>
      <PageTitle
        titleHeading="Roles Management"
        titleDescription=""
        createLink="/role/create"
      />
          <Card className="card-box mb-4 bg-white">
            <div className="card-header py-3">
              <div className="card-header--title font-size-lg">Roles List</div>
              <div className="card-header--actions">
                <Tooltip arrow title="Add Role">
                  <Button
                    variant="outlined"
                    className="d-40 p-0 m-2"
                    onClick={() => history.push("/role/create")}
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
            <div className="table-responsive">
              <table className="table table-hover text-nowrap mb-0 bg-white">
                <thead>
                  <tr>
                    {columns.map((item) => (
                      <th className="bg-white text-left">{item.headerName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles !== undefined ? (
                    roles.map((item) => (
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.role_id}</td>
                        {/* <td>{renderActions(item)}</td> */}
                        <td>
                          <IconButton
                            size="small"
                            color="primary"
                            aria-controls="simple-menu"
                            variant="contained"
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
                                  `/role/${localStorage.company_id}/edit/${selectedData.id}`
                                )
                              }
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => deleteAction(e, selectedData)}
                            >
                              Delete
                            </MenuItem>
                            <MenuItem
                              onClick={(e) =>
                                handleUserStatus(e, selectedData.role_id)
                              }
                            >
                              {selectedData.status === 0
                                ? "Deactive"
                                : "Active"}
                            </MenuItem>
                          </Menu>
                        </td>
                      </tr>
                    ))
                  ) : ''}
                </tbody>
              </table>
            </div>
            {(roles === undefined) ?
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
                Are you sure you want to delete this role?
              </h4>
              {/* <p className="mb-0 text-black-50">You can change your mind later.</p> */}
              <div className="pt-4">
                <Button
                  onClick={deleteRole}
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
