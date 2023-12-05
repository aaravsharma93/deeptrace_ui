import React, { useState, useEffect } from 'react';
import { isLogin } from '../api';
import { Loading } from '../shared';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { setUser } from '../reducers/UserReducer';

const Authenticated = ({ user, children, setTheUser }) => {
    const [ state, setTheState ] = useState({ loading: true, user: {} });
    const setState = state => setTheState(prev => ({...prev, ...state }));

    useEffect(() => {
        const user = {
            id: 1,
            name: "Administrator",
            company: {
                id: 0,
                title: "Intersky"
            },
            role: {
                id: 0,
                title: "Admin"
            },
            permissions: [
                {
                    id: 10,
                    title: "Read",
                    slug: "read-como"
                },
                {
                    id: 11,
                    title: "Write",
                    slug: "write-como"
                }
            ]
        }
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(() => {
                setState({ loading: false, user });
                setTheUser(user)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    let { loading } = state;
    if(loading) {
        return <Loading />
    }
    let login = isLogin();
    if(!login || login === '') {
        return <Redirect to="/login" />
    } else {
        return children;
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
});
const mapDispatchToProps = dispatch => ({
    setTheUser: user => dispatch(setUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);