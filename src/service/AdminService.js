import axios from 'axios';
import {headersWithToken} from "./headers";
import {ADMIN,
        BASE_URL,
        ENROLLED_SUBCLUBS,
        REPORTS,
        SEARCH_MEMBER_BY_NAME,
        SUBCLUB_REQUESTS,
        CREATE_CLUB, CREATE_SUBCLUB} from "../api_config";


const searchMembersByName = (username, page, size) => {
    return axios.get(BASE_URL + SEARCH_MEMBER_BY_NAME,headersWithToken({query: username, page: page, size: size}));
}

const getEnrolledSubClubs = (username) => {
    return axios.get(BASE_URL + ADMIN + ENROLLED_SUBCLUBS, headersWithToken({username: username}));
}

const getPostReports = () => {
    return axios.get(BASE_URL + ADMIN + REPORTS, headersWithToken());
}

const getRequestedSubclubs = () => {
    return axios.get(BASE_URL + SUBCLUB_REQUESTS, headersWithToken());
}

const createClub = (clubName, clubDetails) => {
    const body = {name:clubName, details:clubDetails}
    return axios.post(BASE_URL + CREATE_CLUB, body, headersWithToken());
}

const createSubClub = (body) => {
    return axios.post(BASE_URL + CREATE_SUBCLUB, body, headersWithToken());
}



export const AdminService = {searchMembersByName, getEnrolledSubClubs, getPostReports, getRequestedSubclubs, createClub, createSubClub}