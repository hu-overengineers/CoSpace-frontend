import axios from 'axios';
import {BASE_URL, CREATE_POST, GET_POSTS, REPORT_POST, TRENDS, SUBCLUB_POSTS} from "../ApiConfig";
import {headersWithToken} from "./headers";

const getPosts = (subClub) => {
    if (subClub == "popular") {
        return axios.get(BASE_URL + GET_POSTS + TRENDS);
    }
    return axios.get(BASE_URL + GET_POSTS + SUBCLUB_POSTS, {params: {subClubName: subClub}})
}

const createPost = (newPost) => {
    return axios.post(BASE_URL + CREATE_POST, newPost, headersWithToken());
}

const reportPost = (report) => {
    return axios.post(BASE_URL + REPORT_POST, report, headersWithToken());
}

export const PostService = {getPosts, createPost, reportPost};
