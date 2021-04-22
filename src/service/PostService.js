import axios from 'axios';

const getPosts = (subClub) => {
    return axios.get('http://localhost:8080/post/get', {params:{subClubName: subClub}})
}

const createPost = (newPost) => {
    return axios.post("http://localhost:8080/post/create", newPost);
}

export const PostService = {getPosts, createPost}