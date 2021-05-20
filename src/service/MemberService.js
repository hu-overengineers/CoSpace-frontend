import axios from 'axios';
import {BASE_URL, MEMBER, ENROLLED_CLUBS} from "../ApiConfig";
import {headersWithToken} from "./headers";

const getEnrolledClubs = () => {
    return axios.get(BASE_URL + MEMBER + ENROLLED_CLUBS, {}, headersWithToken());
}

export const MemberService = {getEnrolledClubs};

