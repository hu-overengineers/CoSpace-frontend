import axios from 'axios';
import {headersWithToken} from "./headers";
import {BASE_URL,SUB_CLUB,
        REVIEWS, REVIEW} from "../api_config";



        
const getReviews = (subClubName) => {
    return axios.get(BASE_URL + SUB_CLUB + REVIEWS, headersWithToken({subClubName: subClubName}));
}



const makeReview = (subClubName, content, rating, authorName) => {
    let body = {
        content: content,
        rating: rating,
        author: authorName,
        parentName: subClubName,
    };
    console.log(BASE_URL + SUB_CLUB + REVIEW, body, headersWithToken({subClubName: subClubName}));
    return axios.post(BASE_URL + SUB_CLUB + REVIEW, body, headersWithToken({subClubName: subClubName}));
}


export const ReviewService = {getReviews, makeReview}
