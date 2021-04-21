import React from 'react';
import {
    Chip,
    Container,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
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
import Button from "@material-ui/core/Button";
import {Edit, Group} from "@material-ui/icons";


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

const useStyles = makeStyles((theme) => ({
    gridContainer: {},
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    feedItem: {
        marginBottom: theme.spacing(2),
    },
    sectionTitle: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    feedTitle: {
        flexGrow: 1
    },
    gridItem: {
        maxHeight: '100vh',
        overflow: 'auto',
    },
    gridColumnContainer: {
        marginTop: theme.spacing(2)
    },
    sectionBox: {
        marginBottom: theme.spacing(2)
    }
}));

export default function HomePage() {

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
        <Grid container className={classes.gridContainer}>
            <Grid item xs={3} className={classes.gridItem}>
                <Container className={classes.gridColumnContainer}>
                    <ClubTree clubs={clubs}/>
                </Container>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
                <Container className={classes.gridColumnContainer}>
                    <List>
                        <Box display="flex">
                            <Typography variant="h4" className={classes.feedTitle}>
                                Title
                            </Typography>
                            <Button size="medium"
                                    alignContent="flex-end"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Edit/>}
                                    onClick={() => {
                                        // TODO.
                                    }}
                                    disableElevation>CREATE POST</Button>
                        </Box>
                        <Divider className={classes.divider}/>
                        {posts.map((post, index) => (
                            <Box className={classes.feedItem}>
                                {post}
                            </Box>
                        ))}
                    </List>
                </Container>
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
                <Container className={classes.gridColumnContainer}>
                    <List>
                        <Box className={classes.sectionBox}>
                            <AboutClub description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}/>
                        </Box>
                        <Box className={classes.sectionBox}>
                            <EventContainer
                                events={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}/>
                        </Box>
                        <Box className={classes.sectionBox}>
                            <ModeratorNotesSection
                                notes={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}/>
                        </Box>
                    </List>
                </Container>
            </Grid>
        </Grid>
    )
}