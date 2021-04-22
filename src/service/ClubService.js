import axios from 'axios';

const getClubs = () => {
    return axios.get('http://localhost:8080/club/all-clubs')
}


const getSubClubs = () => {
    return axios.get('http://localhost:8080/subclub/all-subclubs')
}

// this func is a mess right now due to the different db field names
// TODO
const parseSubClubs = (subClubs) => {

    const renamedSubClubs = []

    for (let i = 0; i < subClubs.length; i++) {
        const element = subClubs[i];
        let rns = {
            name: element.subClubName,
            details: element.details,
            uid: i + 20,
            upperClubName: element.upperClubName
        };
        renamedSubClubs.push(rns);
    }

    subClubs = renamedSubClubs;

    const clubNames = [...new Set(subClubs.map(subclub => subclub.upperClubName))]
    const clubs = []
    for (let clb = 0; clb < clubNames.length; clb++) {
        let clubObj = {
            name: clubNames[clb],
            uid: clb,
            children: subClubs.filter(function (subc) {
                return subc.upperClubName === clubNames[clb]
            })
        }
        clubs.push(clubObj);
    }
    return clubs;
}

export const ClubService = {getClubs, getSubClubs, parseSubClubs}