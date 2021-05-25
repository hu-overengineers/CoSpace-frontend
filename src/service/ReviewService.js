import axios from 'axios';
import {headersWithToken} from "./headers";
import {BASE_URL,SUB_CLUB,
        REVIEWS, REVIEW} from "../api_config";



        
const getReviews = (subClubName) => {
    return axios.get(BASE_URL + SUB_CLUB + REVIEWS, headersWithToken({subClubName: subClubName}));
}



const makeReview = (subClubName, content, rating, authorName) => {
    let body = {
        content: content.inputContent,
        rating: rating.inputRating,
        author: authorName,
        parentName: subClubName.subClubName,
    };
    console.log(BASE_URL + SUB_CLUB + REVIEW, body, headersWithToken({subClubName: subClubName.subClubName}));
    return axios.post(BASE_URL + SUB_CLUB + REVIEW, body, headersWithToken({subClubName: subClubName.subClubName}));
}


export const ReviewService = {getReviews, makeReview}
