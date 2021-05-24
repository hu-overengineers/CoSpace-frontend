/**
 * Credit: Umut Emre Bayramoğlu
 * https://github.com/CommunITU/communitu-frontend
 */

import axios from "axios";
import {
    AUTH,
    BASE_URL,
    CHANGE_PASSWORD_WITH_TOKEN,
    LOGIN,
    LOGIN_WITH_TOKEN,
    REGISTER,
    RESET_PASSWORD
} from "../api_config";
import {headersWithToken} from "./headers";

const login = (username, pass) => {
    saveUsername(username);
    return axios.post(BASE_URL + LOGIN, {username: username, password: pass})
}

const saveUsername = (username) => {
    localStorage.setItem('username', username);
}

const getUsername = () => {
    return localStorage.getItem("username")
}

const removeUsername = () => {
    localStorage.removeItem('username');
}

const register = (userData) => {
    return axios.post(BASE_URL + REGISTER, userData)
}

const loginWithToken = () => {
    return axios.post(BASE_URL + LOGIN_WITH_TOKEN, {}, headersWithToken())
}

const logout = () => {
    localStorage.removeItem('login_token');
    localStorage.removeItem("auth_roles")
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

const saveAuthRoles = (roles) => {
    localStorage.setItem("auth_roles", roles);
}

const getAuthRoles = () => {
    return localStorage.getItem("auth_roles");
}

const isAdmin = () => {
    return "ADMIN" in getAuthRoles();
}

const resetPassword = (email) => {
    return axios.post(BASE_URL + AUTH + RESET_PASSWORD, null,{params: {email: email}});
}

const changePasswordWithToken = (newPassword, token) => {
    return axios.post(BASE_URL +  AUTH + CHANGE_PASSWORD_WITH_TOKEN, null, {params: {token: token, newPassword: newPassword}});
}


export const AuthService = {
    login, register, logout, loginWithToken, saveJwtToken, getJwtToken, hasJwtToken,
    getUsername,
    removeUsername,
    resetPassword,changePasswordWithToken, 
    isAdmin, saveAuthRoles, getAuthRoles
};
