import axios from 'axios';
import {BASE_URL, EVENT, MODERATOR} from "../api_config";
import {headersWithToken} from "./headers";


const createEvent = (title, details, date, isOnline, location, utilLink) => {
    return axios.post(BASE_URL + MODERATOR + EVENT, {
        title: title,
        details: details,
        date: date,
        isOnline: isOnline,
        location: location,
        utilLink: utilLink,
    }, headersWithToken());
}

export const ModeratorService = {createEvent};