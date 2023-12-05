import React, {  } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './List';
import Create from './Create';
// import Edit from './Edit';
// import CompanyDetail from './companyDetail';
const File = props => {
    return (
        <Switch>
            <Route path="/file/create" component={Create} />
            {/* <Route path="/file" component={List} /> */}
        </Switch>
    )
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(File)