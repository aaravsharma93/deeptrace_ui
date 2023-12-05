import React, { Fragment, useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { useConfirm } from 'material-ui-confirm';
import { PageTitle } from '../../layout-components';

const Services = props => {

    const [ state, setTheState ] = useState({
        roles: []
    });
    const confirm = useConfirm();
    const setState = state => setTheState(prev => ({...prev, ...state }));

    useEffect(() => {
        let roles = [
            {
                id: 1,
                title: "Admin"
            },
            {
                id: 2,
                title: "Editor"
            }
        ];
        setState({ roles });
    }, [])

    const renderActions = params => {
        let { row } = params;
        return (<>
            <IconButton aria-label="delete" component={Link} to={`/role/edit/${row.id}`} >
                <EditIcon fontSize="small"/>
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteAction(row)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </>)
    }

    const deleteAction = row => {
        let { roles } = state;
        confirm({ title: 'Are you sure you want to delete?' })
            .then(() => {
                let _roles = roles.filter(r => r.id !== row.id);
                setState({ roles: _roles })
            })
            .catch(() => { console.log('in') });
    }

    let { roles } = state;
    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 150
        },
        {
            field: '',
            headerName: 'Action',
            width: 150,
            renderCell: renderActions
        },
    ];
    return (
        <Fragment>
            <PageTitle
                titleHeading="Roles Management"
                titleDescription=""
                createLink="/role/create" />
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid
                    rows={roles}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick />
            </div>
        </Fragment>
    );
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Services)