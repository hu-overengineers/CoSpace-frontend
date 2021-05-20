import React from "react";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import CoSpaceTreeViewMenu from "./CoSpaceTreeViewMenu";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    sectionTitle: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sectionBody: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sectionRoot: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    sectionClub: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
    sectionHead: {
        flexDirection:"row",
        justifyContent: "space-between"
    },
    enrollButton: {
        marginRight: theme.spacing(2)
        
    }

}));


export default function ClubTree({clubs, callbackOnTreeItemClick}) {

    const nameToClubObject = {}
    const mapNameToToClubObject = (club) => {
        nameToClubObject[club.name] = club;
        if (Array.isArray(club.children)) {
            club.children.forEach(mapNameToToClubObject)
        }
    }
    clubs.forEach(mapNameToToClubObject)

    console.log(nameToClubObject)

    const mapToMenuItem = (club) => {
        return {
            text: club.name,
            children: Array.isArray(club.children) ? club.children.map((inner) => mapToMenuItem(inner)) : null
        }
    }

    const handleMenuItemClick = (menuItem) => {
        console.log(`Menu Item:`);
        console.log(menuItem)
        console.log(`Club Obj:`);
        console.log(nameToClubObject[menuItem.text])
        callbackOnTreeItemClick(nameToClubObject[menuItem.text])
    }

    return (
        <CoSpaceTreeViewMenu
            title={"Clubs & Sub-Clubs"}
            menuItems={clubs.map((club) => mapToMenuItem(club))}
            callbackOnTreeItemClick={handleMenuItemClick}/>
    );
}