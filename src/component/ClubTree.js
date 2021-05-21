import React from "react";
import CoSpaceTreeViewMenu from "./CoSpaceTreeViewMenu";

export default function ClubTree({clubs, callbackOnTreeItemClick, title = "Clubs & Sub-Clubs"}) {

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
            title={title}
            menuItems={clubs.map((club) => mapToMenuItem(club))}
            callbackOnTreeItemClick={handleMenuItemClick}/>
    );
}