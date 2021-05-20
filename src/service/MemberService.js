import axios from 'axios';
import {BASE_URL, MEMBER, ENROLLED_SUBCLUBS} from "../api_config.js";
import {headersWithToken} from "./headers";

const getEnrolledSubClubs = () => {
    return axios.get(BASE_URL + "/member/enrolled-subclubs", headersWithToken());
}

export const MemberService = {getEnrolledSubClubs};

