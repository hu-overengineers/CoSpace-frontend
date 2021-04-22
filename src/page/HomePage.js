import React, { useState } from 'react';
import {Container, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ClubTree from '../component/ClubTree';
import AboutClub from '../component/AboutClub';
import EventContainer from '../component/EventContainer';
import ModeratorNotesSection from '../component/ModeratorNotesSection';
import Button from "@material-ui/core/Button";
import {Casino, Edit, FiberNew, TrendingUp, Whatshot} from "@material-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import Section from "../component/Section";
import CreatePost from "../component/CreatePost";
import PostFeed from "../component/PostFeed";


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
    },
    sortingFeedToggleGroup: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
    },
    list: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));


export default function HomePage() {

    const classes = useStyles();
    const [sortingOrder, setSortingOrder] = React.useState('hot');

    const handleSortingOrder = (event) => {
        console.log("Sorting order: " + event.target.value);
        setSortingOrder(event.target.value);
    };

    const clubs = [];
    for (let i = 0; i < 100; i++) {
        clubs.push({
            name: `Club ${i}`,
            uid: `${i}`,
            children: [
                {
                    name: `Subclub ${i}`,
                    uid: `${i}-sub1`,
                },
                {
                    name: `Subclub ${i}`,
                    uid: `${i}-sub2`,
                },
                {
                    name: `Subclub ${i}`,
                    uid: `${i}-sub3`,
                }
            ]
        })
    }
    const current_subclub = "Sub32";

    const [refreshFeed, doRefresh]  = useState(0)
    const [postDialogOpen, setPostDialogOpen] = React.useState(false);
    const handleDialogOpen = () => {
        setPostDialogOpen(true);
    };

    const handleNewPost = (postCreated) => {
        console.log("on home page");
        doRefresh(!refreshFeed);
    }

    return (
        <div>
            <Grid container spacing={1} className={classes.gridContainer}>

                <Grid item xs={3} className={classes.gridItem}>
                    <Container className={classes.gridColumnContainer}>
                        <Box className={classes.sectionBox}>
                            <Section title={"Feeds"} content={
                                <List className={classes.list}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <TrendingUp/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Popular
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Casino/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Random Gems
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            }/>
                        </Box>
                        <Box className={classes.sectionBox}>
                            <ClubTree
                                clubs={clubs}/>
                        </Box>
                    </Container>
                </Grid>


                <Grid item xs={6} className={classes.gridItem}>
                    <Container className={classes.gridColumnContainer}>
                        <Box>
                            <Box display="flex">
                                <ToggleButtonGroup
                                    className={classes.sortingFeedToggleGroup}
                                    value={sortingOrder}
                                    exclusive
                                    onChange={handleSortingOrder}
                                    aria-label="text alignment">
                                    <ToggleButton value="hot" aria-label="left aligned">
                                        <Whatshot/>
                                    </ToggleButton>
                                    <ToggleButton value="new" aria-label="centered">
                                        <FiberNew/>
                                    </ToggleButton>
                                    <ToggleButton value="top" aria-label="right aligned">
                                        <TrendingUp/>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <Button size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Edit/>}
                                        onClick={() => {
                                            handleDialogOpen()
                                        }}
                                        disableElevation>CREATE POST</Button>
                            </Box>
                            <Divider className={classes.divider}/>

                            <PostFeed  refresh={refreshFeed}></PostFeed>
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Container className={classes.gridColumnContainer}>
                        <Box>
                            <Box className={classes.sectionBox}>
                                <AboutClub clubname={"ADHD"}
                                           description={"A place where people with ADHD and their loved ones can interact with each other exchanging stories, struggles, and non-medication strategies. Weekly threads to plan and notice the positive in our lives. Over a million users here say they 'feel at home' and 'finally found a place where people understand them'."}/>
                            </Box>
                            <Box className={classes.sectionBox}>
                                <EventContainer
                                    events={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}/>
                            </Box>
                            <Box className={classes.sectionBox}>
                                {/* <ModeratorNotesSection
                                    notes={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}/> */}
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
            <CreatePost open={postDialogOpen} setOpen={setPostDialogOpen} newPostEvent={handleNewPost} subclub={current_subclub}/>
        </div>
    )
}
