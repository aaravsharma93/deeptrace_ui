import React, {  } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import List from './List';
import LivePreviewExample from './Create';

const Permission = props => {
console.log('permission', props)
    return (
        <Switch>
            <Route path="/permission/create" component={LivePreviewExample} />
            {/* <Route path="/role/edit/:id" component={List} />
            <Route path="/role/:id" component={List} />
            <Route path="/role" component={List} /> */}
        </Switch>
    )
}
const mapStateToProps = state => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Permission)