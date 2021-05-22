import Box from "@material-ui/core/Box";
import {IconButton, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {EventAvailable} from "@material-ui/icons";
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
        color: theme.palette.getContrastText(theme.palette.primary.main),
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
        parent
    }) {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <ListItem key={id} className={classes.listItem}>
                <ListItemAvatar>
                    <IconButton variant={"outlined"} className={classes.iconButton}>
                        {<EventAvailable className={classes.iconAttended}/>}
                    </IconButton>
                </ListItemAvatar>
                <ListItemText
                    className={classes.listItemText}
                    primary={title}
                    secondary={
                        <React.Fragment>
                            <tr><Typography
                                component="span"
                                variant="body2"
                                color="textPrimary">
                                {`${formatRelative(date, new Date()).toString()}`}
                            </Typography></tr>
                            <tr>{details}</tr>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </Box>
    );
}