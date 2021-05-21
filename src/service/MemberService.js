import axios from 'axios';
import {BASE_URL, MEMBER, ENROLLED_SUBCLUBS, ENROLL, SUB_CLUB} from "../api_config.js";
import {headersWithToken} from "./headers";

const getEnrolledSubClubs = () => {
    console.log("aslfjkas" ,headersWithToken());
    return axios.get(BASE_URL + MEMBER + ENROLLED_SUBCLUBS, headersWithToken());
}

const enrollToSubClub = (subclub) => {
    return axios.post(BASE_URL + SUB_CLUB + ENROLL, {}, headersWithToken({subClubName:subclub}));
}

export const MemberService = {getEnrolledSubClubs, enrollToSubClub};

