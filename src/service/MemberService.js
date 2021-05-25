import axios from 'axios';
import {
    ATTEND_SUB_CLUB_EVENT,
    ATTENDED_EVENTS,
    BASE_URL,
    COMMON_SUB_CLUBS,
    ENROLLED_SUBCLUBS,
    GET_POSTS,
    GET_POSTS_BY_AUTHOR,
    MEMBER,
    ONE_SUB_CLUB_ENROLL,
    SUB_CLUB,
    REQUEST_SUBCLUB
} from "../api_config.js";
import {headersWithToken} from "./headers";

const getEnrolledSubClubsOfCurrentlySignedInUser = () => {
    return axios.get(BASE_URL + MEMBER + ENROLLED_SUBCLUBS, headersWithToken());
}

const getAttendedEventsOfCurrentlySignedInUser = () => {
    return axios.get(BASE_URL + MEMBER + ATTENDED_EVENTS, headersWithToken());
}

const getCommonSubClubs = (username) => {
    return axios.get(BASE_URL + SUB_CLUB + COMMON_SUB_CLUBS, headersWithToken({username: username}))
}

const enrollToSubClub = (answers) => {
    return axios.post(BASE_URL + ONE_SUB_CLUB_ENROLL, answers, headersWithToken());
}

const getPostsByAuthorAndSubClub = (author, subClubName) => {
    return axios.get(BASE_URL + GET_POSTS + GET_POSTS_BY_AUTHOR, {params: {username: author, subClubName: subClubName}})
}

const attendEvent = (eventId) => {
    return axios.post(BASE_URL + ATTEND_SUB_CLUB_EVENT, null, headersWithToken({eventId: eventId}))
}

const requestSubClub = (parentName, subclubName, details) => {
    const body = {subClubName:subclubName, clubName:parentName}
    return axios.post(BASE_URL + MEMBER + REQUEST_SUBCLUB, body, headersWithToken());
}

const getUserByName = (username) => {
    return axios.get(BASE_URL + MEMBER, {params: {username: username}});
}

export const MemberService = {
    getEnrolledSubClubsOfCurrentlySignedInUser,
    enrollToSubClub,
    getPostsByAuthorAndSubClub,
    getCommonSubClubs,
    getAttendedEventsOfCurrentlySignedInUser,
    attendEvent,
    requestSubClub,getUserByName
};