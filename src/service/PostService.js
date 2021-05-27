import axios from 'axios';
import {BASE_URL, CREATE_POST, DOWNVOTE_POST, FEED, GET_POSTS, REPORT_POST, UPVOTE_POST, DELETE_OWN_POST, POST} from "../api_config";
import {headersWithToken} from "./headers";
import {subDays} from "date-fns";

const getPosts = (feed, page, size, sort) => {
    return axios.get(BASE_URL + GET_POSTS + FEED, {
        params: {
            name: feed,
            page: page,
            size: size,
            start: (() => {
                switch (sort) {
                    case "today":  return subDays(new Date(), 1).toISOString();
                    case "new": return subDays(new Date(), 30).toISOString();
                    case "top": return subDays(new Date(), 7).toISOString();
                    default:
                        break;
                }
            })(),
            end: new Date().toISOString(),
            sort: (() => {
                switch (sort) {
                    case "today":  return "voting,desc";
                    case "new": return "created,desc";
                    case "top": return "voting,desc";
                    default:
                        break;
                }
            })()
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

const deleteOwnPost = (postId) => {
    return axios.post(BASE_URL + POST + DELETE_OWN_POST, null, headersWithToken({id: postId}));
}

export const PostService = {getPosts, createPost, reportPost, upvotePost, downvotePost, getPostById, deleteOwnPost};
