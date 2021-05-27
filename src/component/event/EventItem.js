import Box from "@material-ui/core/Box";
import {Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Event, EventAvailable, PinDrop, Public, Schedule} from "@material-ui/icons";
import {formatRelative} from "date-fns";
import {openInNewTab} from "../../util/redirect";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    },
    listItem: {
        alignItems: "flex-start",
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    },
    listItemText: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    },
    iconAttended: {
        color: theme.palette.primary.main,
    },
    iconUnattended: {
        color: theme.palette.text,
    },
    iconButton: {
        margin: theme.spacing(0),
    },
    chips: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    }
}));

export default function EventItem(
    {
        event,
        attendCallback,
    }) {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <ListItem key={event.id} className={classes.listItem}>
                <ListItemAvatar>
                    <IconButton variant={"outlined"} className={classes.iconButton}
                                onClick={() => attendCallback(event.id)}>
                        {event.hasAttended ? <EventAvailable className={classes.iconAttended}/> :
                            <Event className={classes.iconUnattended}/>}
                    </IconButton>
                </ListItemAvatar>
                <ListItemText
                    className={classes.listItemText}
                    primary={event.title}
                    secondary={
                        <React.Fragment c>
                            <List>
                                <Typography
                                    key={0}
                                    component="span"
                                    variant="body2"
                                    color="textPrimary">
                                    {`${formatRelative(new Date(event.date), new Date()).toString()}`}
                                </Typography>
                                <Box key={1}>{event.details}</Box>
                                <Box key={2} className={classes.chips}>
                                    {event.isOnline &&
                                    <Chip variant={"outlined"} size="small" color="primary" label={"Online"}
                                          icon={<Public/>}/>}
                                    <Chip variant={"outlined"} size="small" color="primary" label={event.location}
                                          onClick={event.location.includes("http") ? (() => openInNewTab(event.location)) : null}
                                          icon={<PinDrop/>}/>
                                    <Chip variant={"outlined"} size="small" color="primary" label={event.utilLink}
                                          onClick={event.utilLink.includes("http") ? (() => openInNewTab(event.utilLink)) : null}
                                          icon={<Schedule/>}/>
                                </Box>
                            </List>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </Box>
    );
}