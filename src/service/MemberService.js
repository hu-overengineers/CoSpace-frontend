import axios from 'axios';
import {
    BASE_URL,
    MEMBER,
    ENROLLED_SUBCLUBS,
    ENROLL,
    SUB_CLUB,
    GET_POSTS_BY_AUTHOR, COMMON_SUB_CLUBS, GET_POSTS
} from "../api_config.js";
import {headersWithToken} from "./headers";

const getEnrolledSubClubsOfCurrentlySignedInUser = () => {
    return axios.get(BASE_URL + MEMBER + ENROLLED_SUBCLUBS, headersWithToken());
}

const getEnrolledSubClubsOfAUserForAdmin = (username) => {
    // TODO.
}

const getCommonSubClubs = (username) => {
    return axios.get(BASE_URL + SUB_CLUB + COMMON_SUB_CLUBS, headersWithToken({username: username}))
}

const enrollToSubClub = (subClub) => {
    return axios.post(BASE_URL + SUB_CLUB + ENROLL, {}, headersWithToken({subClubName:subClub}));
}

const getPostsByAuthorAndSubClub = (author, subClubName) => {
    return axios.get(BASE_URL + GET_POSTS + GET_POSTS_BY_AUTHOR, {params: {username: author, subClubName: subClubName}})
}

export const MemberService = {
    getEnrolledSubClubsOfCurrentlySignedInUser,
    enrollToSubClub,
    getPostsByAuthorAndSubClub,
    getCommonSubClubs,
    getEnrolledSubClubsOfAUserForAdmin
};

