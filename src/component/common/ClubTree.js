import React from "react";
import CoSpaceTreeViewMenu from "./CoSpaceTreeViewMenu";
import {PeopleAltOutlined, PublicOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    treeItemIcon: {
        marginLeft: theme.spacing(2)
    },
}));

export default function ClubTree(
    {
        clubs,
        selected,
        callbackOnTreeItemClick,
        title = "Clubs & Sub-clubs",
        titleIcon = <PublicOutlined/>
    }) {
    const classes = useStyles();

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

    const menuItems = clubs.map((club) => mapToMenuItem(club))

    return (
        <CoSpaceTreeViewMenu
            title={title}
            titleIcon={titleIcon}
            selected={selected}
            expandIcon={<PeopleAltOutlined className={classes.treeItemIcon}/>}
            collapseIcon={<PeopleAltOutlined className={classes.treeItemIcon}/>}
            expanded={menuItems.map(menuItem => menuItem.text)}
            menuItems={menuItems}
            callbackOnTreeItemClick={handleMenuItemClick}/>
    );
}