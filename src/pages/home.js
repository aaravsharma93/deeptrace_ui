import React from 'react';
import { Redirect } from 'react-router';
import { isLogin } from '../api';

const Home = () => {

    if(isLogin()) {
        return <Redirect to="/dashboard" />
    } else {
        return <Redirect to="/login" />
    }
}
export default Home;