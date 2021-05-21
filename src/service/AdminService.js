import axios from 'axios';
import {BASE_URL, SEARCH_MEMBER_BY_NAME} from "../api_config";
import {headersWithToken} from "./headers";


const searchMembersByName = (username, page, size) => {

    return axios.get(BASE_URL + SEARCH_MEMBER_BY_NAME, 
        headersWithToken({query: username, page: page, size: size}) );
}


export const AdminService = {searchMembersByName}