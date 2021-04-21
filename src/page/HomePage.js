import React from 'react';
import {Container, Divider, List, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import {PostFeedItem} from "../component/Post";
import Box from "@material-ui/core/Box";
import ClubTree from '../component/ClubTree';
import AboutClub from '../component/AboutClub';
import EventContainer from '../component/EventContainer';
import ModeratorNotesSection from '../component/ModeratorNotesSection';
import Button from "@material-ui/core/Button";
import {Edit, NewReleases, TrendingUp, Whatshot} from "@material-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import CreatePost from "../component/CreatePost";


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
        marginRight: theme.spacing(2)
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

    const init_posts = [];
    
    for (let i = 0; i < 100; i++) {
        init_posts.push({
            title: "This is a very entertaining post",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula," +
                " ipsum eget dictum bibendum, quam sem varius justo, id maximus quam neque vitae arcu." +
                " Phasellus id tincidunt felis. ",
            time: "September 14, 2016",
            author: "jane_doe",
            uid: `${i}`
        })
    }
    const [posts, setPosts] = React.useState(init_posts);


    const [postDialogOpen, setPostDialogOpen] = React.useState(false);
    const handleDialogOpen = () => {
      setPostDialogOpen(true);
    };

    const handleNewPost = (newPost) => {
        //posts.unshift(newPost);
        newPost.uid = posts.length;
        setPosts(posts => [newPost, ...posts]);
    }

    return (
        <div>
        <Grid container className={classes.gridContainer}>
            <Grid item xs={3} className={classes.gridItem}>
                <Container className={classes.gridColumnContainer}>
                    <ClubTree
                        clubs={clubs}/>
                </Container>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
                <Container className={classes.gridColumnContainer}>
                    <Box>
                        <Box display="flex">
                            <Typography variant="h4" className={classes.feedTitle}>
                                Title
                            </Typography>
                            <ToggleButtonGroup
                                className={classes.sortingFeedToggleGroup}
                                value={sortingOrder}
                                exclusive
                                onChange={handleSortingOrder}
                                aria-label="text alignment"
                            >
                                <ToggleButton value="hot" aria-label="left aligned">
                                    <Whatshot/>
                                </ToggleButton>
                                <ToggleButton value="new" aria-label="centered">
                                    <NewReleases/>
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
                        <List>
                            {posts.map((post, index) => (
                                <Box className={classes.feedItem} key={post.uid}>
                                    {<PostFeedItem props={post}/>}
                                </Box>
                            ))}
                        </List>
                    </Box>
                </Container>
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
                <Container className={classes.gridColumnContainer}>
                    <Box>
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
                    </Box>
                </Container>
            </Grid>
        </Grid>
        <CreatePost open={postDialogOpen} setOpen={setPostDialogOpen} newPost={handleNewPost}></CreatePost>

        </div>
    )
}