import axios from 'axios';
import {BASE_URL, CREATE_POST, GET_POSTS} from "../ApiConfig";

const getPosts = (subClub) => {
    return axios.get(BASE_URL + GET_POSTS, {params: {subClubName: subClub}})
}

const createPost = (newPost) => {
    return axios.post(BASE_URL + CREATE_POST, newPost);
}

export const PostService = {getPosts, createPost}
