import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {InfoOutlined} from "@material-ui/icons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    avatarContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    avatar: {
        color: theme.palette.getContrastText('#00e3aa'),
        backgroundColor: '#00e3aa',
    },
}));


export default function NoResultsFound() {
    const classes = useStyles();

    return (<ListItem
        key={"no-result"}>
        <ListItemAvatar className={classes.avatarContainer}>
            <Avatar className={classes.avatar}><InfoOutlined/></Avatar>
        </ListItemAvatar>
        <ListItemText primary={"No results found"}/>
    </ListItem>);
}
