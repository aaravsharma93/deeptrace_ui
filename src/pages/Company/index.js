import React, {  } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './List';
import Create from './Create';
import Edit from './Edit';
import CompanyDetail from './companyDetail';
const Company = props => {

    return (
        <Switch>
            <Route path="/company/create" component={Create} />
            <Route path="/company/edit/:company_id" component={Edit} />
            <Route path="/company/detail/:company_id" component={CompanyDetail} />
            <Route path="/company" component={List} /> 
        </Switch>
    )
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Company)