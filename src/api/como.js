import axios from 'axios';
const baseUrl = process.env.REACT_APP_COMO_API;

export async function postComo(url, data) {
    try {
        let token = localStorage.getItem('comoToken');
        let time = calculateTokenTime();
        if(time > process.env.REACT_APP_COMO_TOKEN_EXPIRE) {
            token = await getToken();
        }
        let headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json"};
        let resp = await axios.post(`${baseUrl}/${url}`, data, headers);
        return resp.data;
    } catch(e) {
        return e;
    }
}

export async function getComo(url, params = {}) {
    try {
        let token = localStorage.getItem('comoToken');
        let time = calculateTokenTime();
        if(time > process.env.REACT_APP_COMO_TOKEN_EXPIRE) {
            token = await getToken();
        }
        let headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json"};
        let options = { headers, params };
        let resp = await axios.get(`${baseUrl}${url}`, options);
        return resp.data;
    } catch(e) {
        throw e;
    }
}

export async function getToken() {
    try {
        let username = process.env.REACT_APP_COMO_USER;
        let password = process.env.REACT_APP_COMO_PASSWORD;
        let resp = await axios.post(`${baseUrl}/api/login`, { username, password });
        addSession(resp.data.access_token);
        return resp.data.access_token;
    } catch(e) {
        throw e;
    }
}

function addSession(token) {
    localStorage.setItem("comoToken", token);
    localStorage.setItem("comoTokenTime", new Date().getTime().toString());
}

function calculateTokenTime() {
    let tokenTime = localStorage.getItem('comoTokenTime');
    if(!tokenTime) {
        return 10;
    }
    tokenTime = new Date(parseInt(tokenTime));
    let now = new Date();
    var diff =(tokenTime.getTime() - now.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}