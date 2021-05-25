import axios from 'axios';
import {ADMIN, BASE_URL, ENROLLED_SUBCLUBS, REPORTS, SEARCH_MEMBER_BY_NAME, DELETE_REPORT} from "../api_config";
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

const deleteReport = (reportId) => {
    console.log(BASE_URL + ADMIN + DELETE_REPORT, {reportId: reportId},headersWithToken());
    return axios.post(BASE_URL + ADMIN + DELETE_REPORT, null, headersWithToken({reportId: reportId}));
}

export const AdminService = {searchMembersByName, getEnrolledSubClubs, getPostReports, deleteReport}