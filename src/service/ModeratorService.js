import axios from 'axios';
import {BASE_URL, EVENT, MODERATOR, REPORTS, DELETE_REPORT, DELETE_POST, BAN} from "../api_config";
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
    return axios.delete(BASE_URL + MODERATOR + EVENT, {id: eventId}, headersWithToken());
}

const getPostReports = () => {
    return axios.get(BASE_URL + MODERATOR + REPORTS, headersWithToken());
}

const deleteReport = (reportId) => {
    return axios.post(BASE_URL + MODERATOR + DELETE_REPORT, null, headersWithToken({reportId: reportId}));
}

const deletePost= (postId) => {
    return axios.post(BASE_URL + MODERATOR + DELETE_POST, null, headersWithToken({postId: postId}));
}

const ban = (username, subClubName, reason) => {
    return axios.post(BASE_URL + MODERATOR + BAN, null,
        headersWithToken( 
            {username: username, 
        subClubName: subClubName, 
        reason: reason}));
}

export const ModeratorService = {createEvent, getEvents, updateEvent, deleteEvent, getPostReports, deleteReport, deletePost, ban};