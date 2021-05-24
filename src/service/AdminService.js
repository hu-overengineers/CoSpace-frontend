import axios from 'axios';
import {ADMIN, BASE_URL, ENROLLED_SUBCLUBS, REPORTS, SEARCH_MEMBER_BY_NAME} from "../api_config";
import {headersWithToken} from "./headers";


const searchMembersByName = (username, page, size) => {
    return axios.get(BASE_URL + SEARCH_MEMBER_BY_NAME,headersWithToken({query: username, page: page, size: size}));
}

const getEnrolledSubClubs = (username) => {
    return axios.get(BASE_URL + ADMIN + ENROLLED_SUBCLUBS, headersWithToken({username: username}));
}

const getPostReports = () => {
    return axios.get(BASE_URL + ADMIN + REPORTS, headersWithToken());
}

export const AdminService = {searchMembersByName, getEnrolledSubClubs, getPostReports}