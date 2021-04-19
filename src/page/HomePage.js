import React from 'react';
import {
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Typography
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ForumIcon from '@material-ui/icons/Forum';
import {makeStyles} from "@material-ui/core/styles";
import {PostFeedItem} from "../component/Post";


function ClubListItem(name) {
    return (
        <ListItem button>
            <ListItemIcon>
                <ForumIcon/>
            </ListItemIcon>
            <ListItemText primary={name}/>
        </ListItem>
    );
}


export default function HomePage() {
    const useStyles = makeStyles({
        root: {
            marginTop: "24px" // I suppose this should not be in pixels
        },
    });

    const classes = useStyles();

    const clubs = [];
    for (let i = 0; i < 100; i++) {
        clubs.push(ClubListItem(`Club ${i}`))
    }

    const posts = [];
    for (let i = 0; i < 100; i++) {
        posts.push(PostFeedItem({
            title: "Lorem ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula," +
                " ipsum eget dictum bibendum, quam sem varius justo, id maximus quam neque vitae arcu." +
                " Phasellus id tincidunt felis. "
        }))
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto',}}>
                <Container>
                    <Paper variant="outlined">
                        <List
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Club and Sub-clubs
                                </ListSubheader>
                            }>
                            {clubs}
                        </List>
                    </Paper>
                </Container>
            </Grid>
            <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto',}}>
                <Container mx="auto">
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Feed
                            </ListSubheader>
                        }>
                        {posts.map((post, index) => (
                            <Container className={classes.root}>
                                {post}
                            </Container>
                        ))}
                    </List>
                </Container>
            </Grid>
            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <Container mx="auto">
                    <List>
                        <Paper variant="outlined">
                            <List
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Club Info
                                    </ListSubheader>
                                }>
                            </List>
                        </Paper>
                        <Paper variant="outlined" className={classes.root}>
                            <List
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Events
                                    </ListSubheader>
                                }>
                            </List>
                        </Paper>
                        <Paper variant="outlined" className={classes.root}>
                            <List
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        New clubs
                                    </ListSubheader>
                                }>
                            </List>
                        </Paper>
                    </List>

                </Container>
            </Grid>
        </Grid>
    )
}