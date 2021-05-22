import Box from "@material-ui/core/Box";
import {IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Event, EventAvailable} from "@material-ui/icons";
import {formatRelative} from "date-fns";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
    },
    inline: {
        display: 'inline',
    },
    listItem: {
        alignItems: "flex-start",
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    },
    listItemText: {
        margin: theme.spacing(0),
    },
    iconAttended: {
        color: theme.palette.primary.main,
    },
    iconUnattended: {
        color: theme.palette.text,
    },
    iconButton: {
        margin: theme.spacing(0),
    }
}));

export default function EventItem(
    {
        id,
        title,
        details,
        date,
        isOnline,
        location,
        utilLink,
        parent,
        hasAttended,
        attendCallback,
    }) {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <ListItem key={id} className={classes.listItem}>
                <ListItemAvatar>
                    <IconButton variant={"outlined"} className={classes.iconButton}
                                onClick={() => attendCallback(id)}>
                        {hasAttended ? <EventAvailable className={classes.iconAttended}/> :
                            <Event className={classes.iconUnattended}/>}
                    </IconButton>
                </ListItemAvatar>
                <ListItemText
                    className={classes.listItemText}
                    primary={title}
                    secondary={
                        <React.Fragment>
                            <List>
                                <Typography
                                    key={0}
                                    component="span"
                                    variant="body2"
                                    color="textPrimary">
                                    {`${formatRelative(date, new Date()).toString()}`}
                                </Typography>
                                <Box key={1}>{details}</Box>
                            </List>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </Box>
    );
}