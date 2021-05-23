import axios from 'axios';
import {BASE_URL, MEMBER, PRIVATE_MESSAGE} from "../api_config.js";
import {headersWithToken} from "./headers";


const getPrivateMessages = () => {
    return axios.get(BASE_URL + MEMBER + PRIVATE_MESSAGE, headersWithToken())
}


const send = (receiverUsername, content) => {
    return axios.post(BASE_URL + MEMBER + PRIVATE_MESSAGE, {
        receiverUsername: receiverUsername,
        content: content
    }, headersWithToken())
}

export const PrivateMessagingService = {getPrivateMessages, send};