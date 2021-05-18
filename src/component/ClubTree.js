import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import React from "react";
import TreeItem from '@material-ui/lab/TreeItem';
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
}));

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content': {
            backgroundColor: '#afffea',
            color: 'var(--tree-view-color)',
        },
        '&$selected > $content': {
            //backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            backgroundColor: '#00e3aa',
            color: 'var(--tree-view-color)',

        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),

        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        //display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
    treeItemIcon: {
        marginLeft: theme.spacing(2)
    },
    treeItemText: {
        marginLeft: theme.spacing(1)
    }
}));

function renderTree(node, classes, callback) {
    const onClubClick = () => {
        callback(node);
    }
    return (
        <TreeItem className={classes.root} onClick={onClubClick}
                  key={node.name} nodeId={node.name} label={<Box className={classes.treeItemText}>{node.name}</Box>}
                  classes={{
                      root: classes.root,
                      content: classes.content,
                      expanded: classes.expanded,
                      selected: classes.selected,
                      group: classes.group,
                      label: classes.label,
                  }}>
            {Array.isArray(node.children) ? node.children.map((childNode) => renderTree(childNode, classes, callback)) : null}
        </TreeItem>
    );
}

export default function ClubTree({clubs, callbackOnTreeItemClick}) {
    const classes = useStyles();
    const treeClasses = useTreeItemStyles();

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
        return {text: club.name, children: Array.isArray(club.children) ? club.children.map((inner) => mapToMenuItem(inner)) : null}
    }

    const handleMenuItemClick = (menuItem) => {
        console.log(`Menu Item:` );
        console.log(menuItem)
        console.log(`Club Obj:`);
        console.log(nameToClubObject[menuItem.text])
        callbackOnTreeItemClick(nameToClubObject[menuItem.text])
    }

    return (
        <CoSpaceTreeViewMenu
            title={"Clubs & Subs"}
            menuItems={clubs.map((club) => mapToMenuItem(club))}
            callbackOnTreeItemClick={handleMenuItemClick}/>
    );
}