import axios from 'axios';
import {
    ATTEND_SUB_CLUB_EVENT,
    BASE_URL,
    CLUB_LIST,
    SUB_CLUB_EVENTS,
    SUB_CLUB_LIST,
    SUB_CLUB_STATS,
    SUB_CLUB_QUESTIONNAIRE
} from "../api_config";
import {headersWithToken} from "./headers";

const getClubs = () => {
    return axios.get(BASE_URL + CLUB_LIST)
}

const getSubClubs = () => {
    return axios.get(BASE_URL + SUB_CLUB_LIST)
}

const getSubClubStatistics = (subClubName, startTime, endTime) => {
    return axios.get(BASE_URL + SUB_CLUB_STATS, {
        params: {
            subClubName: subClubName,
            timeStart: startTime.getTime(),
            timeEnd: endTime.getTime()
        }
    });
}

const getEvents = (subClubName) => {
    return axios.get(BASE_URL + SUB_CLUB_EVENTS, {
        params: {
            subClubName: subClubName
        }
    });
}

const getSubClubQuestions = (subclubName) => {
    return axios.get(BASE_URL + SUB_CLUB_QUESTIONNAIRE, headersWithToken({subClubName:subclubName}));
}

const parseSubClubs = async (subClubs) => {

    const clubs = await getClubs();

    const tree = [];
    clubs.data.forEach(club => {
        club.children = subClubs.filter(subClub => subClub.parentName === club.name);
        tree.push(club)
    })

    return tree;
}


export const ClubService = {getClubs, getSubClubs, parseSubClubs, getSubClubStatistics, getEvents, getSubClubQuestions};
