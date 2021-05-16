import axios from 'axios';
import {BASE_URL, CLUB_LIST, SUB_CLUB_INFO, SUB_CLUB_LIST} from "../ApiConfig";

const getClubs = () => {
    return axios.get(BASE_URL + CLUB_LIST)
}

const getSubClubs = () => {
    return axios.get(BASE_URL + SUB_CLUB_LIST)
}

const getSubClubDetails = (subClubId) => {
    return axios.get(BASE_URL + SUB_CLUB_INFO, {params: {sub_club_id: subClubId}})
}

const getClubDetails = (clubId) => {
    return axios.get(BASE_URL + SUB_CLUB_INFO, {params: {club_id: clubId}})
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
            uid: i + 20,
            parentName: element.parentName
        };
        renamedSubClubs.push(rns);
    }

    subClubs = renamedSubClubs;

    const clubNames = [...new Set(subClubs.map(subclub => subclub.parentName))]
    const clubs = []
    for (let clb = 0; clb < clubNames.length; clb++) {
        let clubObj = {
            name: clubNames[clb],
            uid: clb,
            children: subClubs.filter(function (subc) {
                return subc.parentName === clubNames[clb]
            })
        }
        clubs.push(clubObj);
    }
    return clubs;
}

export const ClubService = {getClubs, getSubClubs, parseSubClubs, getSubClubDetails, getClubDetails}