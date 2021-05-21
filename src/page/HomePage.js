import React, {useEffect, useState} from 'react';
import {Divider} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ClubTree from '../component/ClubTree';
import AboutClub from '../component/AboutClub';
import EventContainer from '../component/EventContainer';
import Button from "@material-ui/core/Button";
import {Add, Edit, FiberNew, TrendingUp, Whatshot} from "@material-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import CreatePost from "../component/CreatePost";
import PostFeed from "../component/PostFeed";
import {ClubService} from "../service/ClubService";
import {PostService} from "../service/PostService";
import {useHistory} from "react-router-dom";
import {subDays} from 'date-fns';

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
    gridLeftColumnBox: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    gridMiddleColumnBox: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0)
    },
    gridRightColumnBox: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
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
    const history = useHistory()
    const [sortingOrder, setSortingOrder] = React.useState('hot');

    const handleSortingOrder = (event) => {
        console.log("Sorting order: " + event.target.value);
        setSortingOrder(event.target.value);
    };

    // Clubs and sub-clubs
    const [clubs, setClubs] = useState([{name: "Popular", children: []}, {name: "Random", children: []}]);
    const [selectedFeed, selectFeed] = useState({
        name: "popular",
        details: "...",
        created: null,
        numberOfMembers: null
    });

    // Refresh event for posts
    const [refreshFeed, doRefresh] = useState(0)
    const [postDialogOpen, setPostDialogOpen] = React.useState(false);
    const [postsInFeed, setPostsInFeed] = useState([]);
    const [stats, setStats] = useState({numberOfMembers: 0, numberOfPostsInLastWeek: 0});

    // Get club and sub-clubs
    useEffect(() => {
        ClubService.getSubClubs().then(response => {
            console.log("Parsing sub-clubs");
            console.log(response.data);
            let clubList = ClubService.parseSubClubs(response.data);
            clubList.splice(0, 0, {name: "Popular", children: []}, {name: "Random", children: []});
            setClubs(clubList);
        })
    }, [refreshFeed]);

    // Get posts
    useEffect(() => {
        PostService.getPosts(selectedFeed.name).then(response => {
            console.log(`Fetched posts of ${selectedFeed.name}`);
            console.log(response.data)
            setPostsInFeed(response.data);

            ClubService.getSubClubStatistics(selectedFeed.name, subDays(new Date(), 7), new Date()).then(response => {
                console.log(`Fetched stats of ${selectedFeed.name}`);
                console.log(response.data);
                setStats({
                    numberOfMembers: response.data.numberOfMembers,
                    numberOfPostsInLastWeek: response.data.numberOfPostsInTimeFrame
                })
            }).catch(response => {
                console.error(response);
            });
        }).catch(response => {
            console.log(`No posts in ${selectedFeed.name}`);
            setPostsInFeed([]);
        });
    }, [selectedFeed, refreshFeed]);

    useEffect(() => {
        console.log(clubs);
    }, [clubs])


    // create post pop-up
    const handleDialogOpen = () => {
        setPostDialogOpen(true);
    };

    // event for new post creation
    const handleNewPost = (postCreated) => {
        // refresh the posts when the new one sended to db
        doRefresh(!refreshFeed);
    }

    const handleClubTreeItemClick = (node) => {
        selectFeed(node);
    }

    return (
        <div>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridLeftColumnBox}>
                        <Box className={classes.sectionBox}>
                            <ClubTree
                                title={"Browse"}
                                callbackOnTreeItemClick={handleClubTreeItemClick}
                                clubs={clubs}/>
                        </Box>
                    </Box>
                </Grid>


                <Grid item xs={6} className={classes.gridItem}>
                    <Box className={classes.gridMiddleColumnBox}>
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

                            <Button size="medium" style={{marginRight: "5px"}}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add/>}
                                    onClick={() => {
                                        history.push("/enroll");
                                    }}
                                    disableElevation>ENROLL TO NEW CLUB
                            </Button>

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

                        <PostFeed posts={postsInFeed} subclub={selectedFeed.name}/>
                    </Box>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridRightColumnBox}>
                        <Box className={classes.sectionBox}>
                            <AboutClub clubname={selectedFeed.name}
                                       description={selectedFeed.details}
                                       timeCreated={selectedFeed.created}
                                       numberOfMembers={stats.numberOfMembers}
                                       numberOfPostsInLastWeek={stats.numberOfPostsInLastWeek}
                            />
                        </Box>
                        <Box className={classes.sectionBox}>
                            <EventContainer
                                events={"There are no events."}/>
                        </Box>
                        {/* TODO: Uncomment when available.
                            <Box className={classes.sectionBox}>
                                <ModeratorNotesSection
                                    notes={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}/>
                            </Box>
                         */}
                    </Box>
                </Grid>
            </Grid>
            <CreatePost open={postDialogOpen} setOpen={setPostDialogOpen} newPostEvent={handleNewPost}
                        subclub={selectedFeed}/>
        </div>
    )
}
