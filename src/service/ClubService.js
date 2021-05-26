import axios from 'axios';
import {
    BASE_URL,
    CLUB_LIST,
    SUB_CLUB_EVENTS,
    SUB_CLUB_LIST,
    SUB_CLUB_QUESTIONNAIRE,
    SUB_CLUB_STATS,
    RANDOM_QUESTIONNAIRE,
} from "../api_config";
import {headersWithToken} from "./headers";
import {subDays} from "date-fns";

const getClubs = () => {
    return axios.get(BASE_URL + CLUB_LIST)
}

const getSubClubs = () => {
    return axios.get(BASE_URL + SUB_CLUB_LIST)
}

const getSubClubStatistics = (subClubName, startTime = subDays(new Date(), 7), endTime = new Date()) => {
    return axios.get(BASE_URL + SUB_CLUB_STATS, {
        params: {
            subClubName: subClubName,
            start: startTime.toISOString(),
            end: endTime.toISOString(),
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

const getRandomQuestionnaire = () => {
    return axios.get(BASE_URL + RANDOM_QUESTIONNAIRE, headersWithToken());
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


export const ClubService = {getClubs, getSubClubs, parseSubClubs, getSubClubStatistics, getEvents, getSubClubQuestions, getRandomQuestionnaire};
