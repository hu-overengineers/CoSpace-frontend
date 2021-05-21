import axios from 'axios';
import {BASE_URL, SEARCH_MEMBER_BY_NAME} from "../api_config";
import {headersWithToken} from "./headers";


const searchMembersByName = (username, page, size) => {

    console.log( headersWithToken({query: "mem", page: 0, size: 5}));
    return axios.get(BASE_URL + SEARCH_MEMBER_BY_NAME, 
        headersWithToken({query: "mem", page: 0, size: 5}) );
}


export const AdminService = {searchMembersByName}