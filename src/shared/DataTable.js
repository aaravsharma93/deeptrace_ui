import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const pageSize = parseInt(process.env.REACT_APP_TABLE_SIZE);
const tableHeight = pageSize * 76;
let page = 0;
const DataTable = props => {

    const [state, setTheState] = useState({
        rows: [],
        sortModel: [],
        loading: true
    });
    const setState = state => setTheState(prev => ({...prev, ...state }));
    const onPageChange = data => {
        page = data.page;
        let sortModel = state.sortModel.length > 0? state.sortModel[0]: {};
        loadFromServer(sortModel);
    }

    const onSortModelChange = data => {
        let { sortModel } = state;
        if(JSON.stringify(sortModel) !== JSON.stringify(data)) {
            setState({ sortModel: data });
            loadFromServer(data[0]);
        }
    }

    const loadFromServer = async(order = {}) => {
        props.getData(page, order, props.filter);
    }

    return (
        <div style={{ height: tableHeight, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid autoHeight
                        rowCount={props.rowCount}
                        loading = {props.loading}
                        rows={props.rows}
                        columns={props.columns}
                        pageSize={pageSize}
                        paginationMode='server'
                        sortingMode='server'
                        onPageChange={onPageChange}
                        onSortModelChange={onSortModelChange}
                        disableColumnMenu={true}
                        disableSelectionOnClick />
                </div>
            </div>
        </div>
    );
}
export default DataTable;