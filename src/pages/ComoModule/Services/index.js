import React, { Fragment, useState, useEffect } from 'react';
import { getComo } from '../../../api/como';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useConfirm } from 'material-ui-confirm';
import { DataTable } from '../../../shared';
import { PageTitle, Wrapper } from '../../../layout-components';

const Services = props => {

    const [state, setTheState] = useState({
        services: [],
        rowCount: 0,
        loading: true,
        count: 0
    });
    const confirm = useConfirm();
    const setState = state => setTheState(prev => ({...prev, ...state }));

    useEffect(() => {
        getServices();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getServices = async(page = 0, order = {}, filter = {}) => {
        try {
            filter.channel = 'aldi_north';
            let params = { ...order, ...filter, page, limit: parseInt(process.env.REACT_APP_TABLE_SIZE)};
            let resp = await getComo('/service/list', params);
            setState({ loading: false, services: resp.services, rowCount: resp.rowCount });
        } catch(e) {
            setState({ loading: false });
        }
    }

    const renderActions = params => {
        let { row } = params;
        return (<>
            <IconButton aria-label="delete" component={Link} to={`/service/edit/${row.id}`} >
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

    const columns = [
        {
            field: 'service',
            headerName: 'Service',
            width: 188
        },
        {
            field: 'channel',
            headerName: 'Channel',
            width: 150
        },
        {
            field: 'error_code',
            headerName: 'Error Code',
            width: 169
        },
        {
            field: 'template',
            headerName: 'Template',
            width: 169
        },
        {
            field: 'threshold',
            headerName: 'threshold',
            width: 169
        },
        {
            field: '',
            headerName: 'Action',
            width: 169,
            renderCell: renderActions
        },
    ];

    return (
        <Fragment>
            <PageTitle
                titleHeading="Services Management"
                titleDescription=""
                createLink="/como/service/create" />

            <Wrapper sectionHeading="Sortable table">
                <DataTable columns={columns} filter={{}}
                    rowCount={state.rowCount} loading={state.loading} rows={state.services}
                    getData={getServices.bind(this)} />
            </Wrapper>
        </Fragment>
    );
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Services)