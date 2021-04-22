/**
 * Credit: Umut Emre Bayramoğlu
 * https://github.com/CommunITU/communitu-frontend
 */

import axios from "axios";
import {BASE_URL, LOGIN, LOGIN_WITH_TOKEN, REGISTER} from "../ApiConfig";
import {headersWithToken} from "./headers";

const login = (email, pass) => {
    return axios.post(BASE_URL + LOGIN, {email: email, password: pass})
}

const register = (userData) => {
    return axios.post(BASE_URL + REGISTER, userData)
}

const loginWithToken = () => {
    return axios.post(BASE_URL + LOGIN_WITH_TOKEN, {}, headersWithToken())
}

const logout = () => {
    localStorage.removeItem('login_token');
};

const saveJwtToken = (token) => {
    localStorage.setItem('login_token', token);
}

const getJwtToken = () => {
    return localStorage.getItem('login_token');
}

const hasJwtToken = () => {
    let jwt = localStorage.getItem('login_token');
    return jwt != null;
}


export const AuthService = {login, register, logout, loginWithToken, saveJwtToken, getJwtToken, hasJwtToken};
