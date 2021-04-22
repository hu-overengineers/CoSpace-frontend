import axios from 'axios';

const getPosts = () => {
    return axios.get('http://localhost:8080/post/get', {params: {subClubName: 'Sub32'}})
}

const createPost = (newPost) => {
    console.log(newPost);
    return axios.post("http://localhost:8080/post/create", newPost);
}

export const PostService = {getPosts, createPost}