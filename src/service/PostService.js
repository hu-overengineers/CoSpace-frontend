import axios from 'axios';
import {BASE_URL, CREATE_POST, DOWNVOTE_POST, FEED, GET_POSTS, REPORT_POST, TRENDS, UPVOTE_POST} from "../api_config";
import {headersWithToken} from "./headers";
import {formatISO} from "date-fns";

const getPosts = (feed, page, size, start, end) => {
    if (feed === "Popular") {
        return axios.get(BASE_URL + GET_POSTS + TRENDS,
            {
                params: {
                    page: page,
                    size: size,
                    start: start.toISOString(),
                    end: end.toISOString(),
                }
            });
    }
    return axios.get(BASE_URL + GET_POSTS + FEED, {
        params: {
            name: feed,
            page: page,
            size: size,
            start: start.toISOString(),
            end: end.toISOString(),
            sort: "voting,desc"
        }
    })
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

const getPostById = (postId) => {
    return axios.get(BASE_URL + GET_POSTS, {params: {postId: postId}})
};


export const PostService = {getPosts, createPost, reportPost, upvotePost, downvotePost, getPostById};
