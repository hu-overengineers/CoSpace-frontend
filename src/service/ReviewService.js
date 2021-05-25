import axios from 'axios';
import {headersWithToken} from "./headers";
import {BASE_URL,SUB_CLUB,
        CREATE_CLUB, REVIEWS} from "../api_config";



        
const getReviews = (subClubName) => {
    return axios.get(BASE_URL + SUB_CLUB + REVIEWS, headersWithToken({subClubName: subClubName}));
}



const makeReview = (subClubName, body) => {
    return axios.post(BASE_URL + CREATE_CLUB, body, headersWithToken({subClubName: subClubName}));
}


export const ReviewService = {getReviews, makeReview}
