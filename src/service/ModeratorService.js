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

const getEvents = () => {
    return axios.get(BASE_URL + MODERATOR + EVENT, headersWithToken());
}

const updateEvent = (event) => {
    return axios.put(BASE_URL + MODERATOR + EVENT, event, headersWithToken());
}

const deleteEvent = (eventId) => {
    return axios.put(BASE_URL + MODERATOR + EVENT, {id: eventId}, headersWithToken());
}


export const ModeratorService = {createEvent, getEvents, updateEvent, deleteEvent};