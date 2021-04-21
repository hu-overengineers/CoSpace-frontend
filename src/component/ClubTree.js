import {Divider, ListItem, ListItemIcon, ListItemText, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ForumIcon from "@material-ui/icons/Forum";
import React from "react";


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
    }
}));

function ClubListItem({name}) {
    return (
        <ListItem button>
            <ListItemIcon>
                <ForumIcon/>
            </ListItemIcon>
            <ListItemText primary={name}/>
        </ListItem>
    );
}

export default function ClubTree({clubs}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>
                <Typography variant="h6" className={classes.sectionTitle}>
                    Clubs and Sub-clubs
                </Typography>
                <Divider className={classes.divider}/>
                {clubs.map((club, index) => (
                    <Box key={club.uid}>
                        {<ClubListItem name={club.name}/>}
                    </Box>)
                )}
            </Box>
        </Paper>
    );
}