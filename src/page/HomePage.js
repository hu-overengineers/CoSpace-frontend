import React from 'react';
import {
    Container, Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ForumIcon from '@material-ui/icons/Forum';
import {makeStyles} from "@material-ui/core/styles";
import {PostFeedItem} from "../component/Post";
import Box from "@material-ui/core/Box";
import ClubTree from '../component/ClubTree';
import AboutClub from '../component/AboutClub';
import EventContainer from '../component/EventContainer';
import ModeratorNotesSection from '../component/ModeratorNotesSection';


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
        divider: {
            marginTop: "8px",
            marginBottom: "8px"
        },
        feedItem: {
            marginBottom: "12px",
            marginTop: "12px",
        },
        sectionTitle: {
            marginLeft: "12px",
        },
        feedTitle: {}
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
                <ClubTree classes={classes} clubs={clubs}/>
            </Grid>
            <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <Container >
                    <List>
                        <Typography variant="h4" className={classes.feedTitle}>
                            Title
                        </Typography>
                        <Divider className={classes.divider}/>
                        {posts.map((post, index) => (
                            <Box className={classes.feedItem}>
                                {post}
                            </Box>
                        ))}
                    </List>
                </Container>
            </Grid>
            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <Container >
                    <List>
                        <AboutClub classes={classes}/>
                        <EventContainer classes={classes}/>
                        <ModeratorNotesSection classes={classes}/>
                    </List>

                </Container>
            </Grid>
        </Grid>
    )
}