import axios from 'axios';
import {
    BASE_URL,
    CREATE_POST,
    DOWNVOTE_POST,
    GET_POSTS,
    REPORT_POST,
    SUBCLUB_POSTS,
    TRENDS,
    UPVOTE_POST
} from "../ApiConfig";
import {headersWithToken} from "./headers";

const getPosts = (subClub) => {
    if (subClub === "popular") {
        return axios.get(BASE_URL + GET_POSTS + TRENDS);
    }
    return axios.get(BASE_URL + GET_POSTS + SUBCLUB_POSTS, {params: {subClubName: subClub}})
}

const createPost = (newPost) => {
    return axios.post(BASE_URL + CREATE_POST, newPost, headersWithToken());
}

const reportPost = (author, message, postId) => {
    return axios.post(BASE_URL + REPORT_POST, {author: author, content: message, postId: postId}, headersWithToken());
}

const upvotePost = (postId) => {
    return axios.post(BASE_URL + UPVOTE_POST, null, headersWithToken({postId: postId}))
}

const downvotePost = (postId) => {
    return axios.post(BASE_URL + DOWNVOTE_POST, null, headersWithToken({postId: postId}))
}

export const PostService = {getPosts, createPost, reportPost, upvotePost, downvotePost};
