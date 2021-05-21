import axios from 'axios';
import {BASE_URL, SEARCH_MEMBER_BY_NAME, ADMIN, ENROLLED_SUBCLUBS} from "../api_config";
import {headersWithToken} from "./headers";


const searchMembersByName = (username, page, size) => {

    return axios.get(BASE_URL + SEARCH_MEMBER_BY_NAME, 
        headersWithToken({query: username, page: page, size: size}) );
}

const getEnrolledSubClubs = (username) => {
    return axios.get(BASE_URL + ADMIN + ENROLLED_SUBCLUBS,  headersWithToken({username: username}) );
}



export const AdminService = {searchMembersByName, getEnrolledSubClubs}