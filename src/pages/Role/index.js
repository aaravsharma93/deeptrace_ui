import React, {  } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './List';
import Create from './Create';
import Edit from './Edit';
const Role = props => {

    return (
        <Switch>
            <Route path="/role/create" component={Create} />
            <Route path="/role/:company_id/edit/:id" component={Edit} />
            <Route path="/role/:id" component={List} />
            <Route path="/role" component={List} />
        </Switch>
    )
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Role)