import axios from 'axios';
import {BASE_URL, CLUB_LIST, SUB_CLUB_LIST, SUB_CLUB_STATS} from "../api_config";

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

// this func is a mess right now due to the different db field names
// TODO
const parseSubClubs = (subClubs) => {

    const renamedSubClubs = []

    for (let i = 0; i < subClubs.length; i++) {
        const element = subClubs[i];
        let rns = {
            name: element.name,
            details: element.details,
            rating: element.rating,
            key: element.id,
            uid: element.id,
            parentName: element.parentName,
            created: element.created
        };
        renamedSubClubs.push(rns);
    }

    subClubs = renamedSubClubs;

    const clubNames = [...new Set(subClubs.map(subclub => subclub.parentName))]
    const clubs = []
    for (let clb = 0; clb < clubNames.length; clb++) {
        let clubObj = {
            name: clubNames[clb],
            key: clb,
            uid: clb,
            children: subClubs.filter(function (subc) {
                return subc.parentName === clubNames[clb]
            })
        }
        clubs.push(clubObj);
    }
    return clubs;
}


export const ClubService = {getClubs, getSubClubs, parseSubClubs, getSubClubStatistics}