import axios from 'axios';
const dtUrl = process.env.REACT_APP_DT_API;
const baseUrl = process.env.REACT_APP_FE_API;

export async function login(url, data, isAuth = true) {
    try {
        let headers = { "Content-Type": "application/json" };
        if(isAuth) {
            let token = localStorage.getItem('token');
            headers = { Authorization: `Bearer ${token}`};
        }
        let resp = await axios.post(`${baseUrl}${url}`, data, headers);
        return resp.data;
    } catch(e) {
        return e;
    }
}
export async function postCall(url, data, isAuth = true) {
    try {
        // let headers = { "Content-Type": "application/json" };
        if(isAuth) {
            let token = localStorage.getItem('token');
            let time = calculateTokenTime();
            if(time > 5) {
                token = await getToken();
            }
            let headers = {  "Content-Type": "application/json",Authorization: `Bearer ${token}`};

            let resp = await axios.post(`${baseUrl}${url}`,data ,{headers});
            return resp.data;
        }
       
    } catch(e) {
        return e;
    }
}

export async function getCall(url, data = {}, isAuth = true) {
    try {
        let headers = { "Content-Type": "application/json" };
        // let headers = {}
        if(isAuth) {
            let token = localStorage.getItem('token');
            let time = calculateTokenTime();
            if(time > 5) {
                token = await getToken();
            }
            headers = { Authorization: `Bearer ${token}`};
        }
        // let resp = await axios.post(`${baseUrl}${url}`, data, headers);
        let resp = await axios.get(`${baseUrl}${url}`, {headers});
        return resp.data;
    } catch(e) {
        return e;
    }
}

export async function getToken() {
    let token = localStorage.getItem('refresh_token');
    let resp = await axios.post(`${baseUrl}api/refresh-token`, {'refresh_token':token});
    addSession(resp.data.access_token);
    localStorage.setItem('refresh_token', resp.data.refresh_token)
    return resp.data.access_token;
}

export function addSession(token) {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenTime", new Date().getTime().toString());
}

export function isLogin() {
    return localStorage.getItem("token");
}

export function removeSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTime");
}

function calculateTokenTime() {
    let tokenTime = localStorage.getItem('tokenTime');
    if(!tokenTime) {
        return 10;
    }
    tokenTime = new Date(parseInt(tokenTime));
    let now = new Date();
    var diff =(tokenTime.getTime() - now.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}
    export async function postFileApiCall(url, data, isAuth = true) {
        try {
            // let headers = { "Content-Type": "application/json" };
            if(isAuth) {
                let token = localStorage.getItem('token');
                let time = calculateTokenTime();
                if(time > 5) {
                    token = await getToken();
                }
                const headers = {'Accept': "*/*", 'Authorization': `Bearer ${token}`};
    
                // let resp = await axios.post(`${baseUrl}${url}`,data ,{headers});
                
                let resp = await axios.post(`${dtUrl}${url}`,data ,{headers:headers});
                return resp.data;
            }
           
        } catch(e) {
            return e;
        } 
}