import React, {  } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Invite from './InviteUser';
import List from './List'
import Edit from './Edit'
import updateRole from './UpdateRole';
const User = props => {
    return (
        <Switch>
            <Route path="/user/invite" component={Invite} />
            <Route path="/user/edit/:company_id/:username" component={Edit} /> 
            <Route path="/user/get/:company_id/role/:username" component={updateRole} /> 
            <Route path="/user" component={List} /> 
        </Switch>
    )
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(User)