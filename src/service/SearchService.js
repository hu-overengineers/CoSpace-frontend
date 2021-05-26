import axios from 'axios';
import {BASE_URL, SEARCH} from "../api_config.js";


const search = (query, page = 0, size = 5) => {
    return axios.get(BASE_URL + SEARCH, {
        params: {
            query: query,
            page: page,
            size: size
        }
    })
}


export const SearchService = {search};