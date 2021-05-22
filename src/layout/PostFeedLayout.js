import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Divider, List} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {ClubService} from "../service/ClubService";
import {formatISO, subDays} from "date-fns";
import {AuthService} from "../service/AuthService";
import {MemberService} from "../service/MemberService";
import Box from "@material-ui/core/Box";
import ClubTree from "../component/ClubTree";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {Add, Edit, FiberNew, TrendingUp, Whatshot} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import AboutFeed from "../component/AboutFeed";
import EventContainer from "../component/event/EventContainer";
import CreatePost from "../component/CreatePost";
import EventItem from "../component/event/EventItem";


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
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(0),
    },
    gridMiddleColumnBox: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    gridRightColumnBox: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(3),
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


const customFeeds = [
    {isCustom: true, name: "Popular", details: "Popular posts in all clubs and sub-clubs right now.", children: []},
    {isCustom: true, name: "Random", details: "Random gems that you may find interesting.", children: []}
];


function PostFeedLayout({children}) {
    const classes = useStyles();
    const history = useHistory();
    const [sortingOrder, setSortingOrder] = React.useState('hot');

    const handleSortingOrder = (event) => {
        console.log("Sorting order: " + event.target.value);
        setSortingOrder(event.target.value);
    };

    // Clubs and sub-clubs
    const [clubs, setClubs] = useState(customFeeds);
    const [enrolledSubClubs, setEnrolledSubClubs] = useState([]);
    const [feed, setFeed] = useState(customFeeds[0]);
    const [events, setEvents] = useState([])

    // Refresh event for posts
    const [refreshFeed, doRefresh] = useState(0)
    const [postDialogOpen, setPostDialogOpen] = React.useState(false);

    // Get stats
    useEffect(() => {
        if (!(feed.isCustom) || feed.parentName) {
            ClubService.getSubClubStatistics(feed.name, subDays(new Date(), 7), new Date()).then(response => {
                console.log(`Fetched stats of ${feed.name}`, response.data);
                console.log(response.data);
                feed.numberOfMembers = response.data.numberOfMembers;
                feed.numberOfPostsInLastWeek = response.data.numberOfPostsInTimeFrame;
                setFeed(feed);
            }).catch(response => {
                console.error(response);
            });
        }
    }, [refreshFeed]);  // TODO: Figure out a better way to update feed info object with stats.

    // Get club and sub-clubs
    useEffect(() => {
        ClubService.getSubClubs().then(response => {
            console.log("Parsing sub-clubs");
            console.log(response.data);
            ClubService.parseSubClubs(response.data).then(tree => {
                console.log("Parsed club tree:", tree)
                customFeeds.slice().reverse().forEach(customFeed => {
                    tree.splice(0, 0, customFeed);
                });
                setClubs(tree);
            })
        });
    }, [refreshFeed]);

    useEffect(() => {
        if (AuthService.hasJwtToken()) {
            MemberService.getEnrolledSubClubsOfCurrentlySignedInUser().then(response => {
                console.log("Enrolled sub-clubs:", response.data);
                setEnrolledSubClubs(response.data);
            });
        }
    }, [refreshFeed]);

    useEffect(() => {
        ClubService.getEvents(feed.name).then(response => {
            console.log(`Events of ${feed.name}`, response.data);
            setEvents(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [feed]);

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
        setFeed(node);
        doRefresh(!refreshFeed);
        history.push(`/feed/${node.name}`);
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

                            {(!(feed.isCustom || (!feed.parentName))) &&
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    disabled={enrolledSubClubs.filter(subClub => subClub.name === feed.name).length === 0}
                                    startIcon={<Edit/>}
                                    onClick={() => {
                                        handleDialogOpen()
                                    }}
                                    disableElevation>CREATE POST</Button>}
                        </Box>
                        <Divider className={classes.divider}/>

                        {children}
                    </Box>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridRightColumnBox}>
                        <Box className={classes.sectionBox}>
                            <AboutFeed feedInfo={feed}/>
                        </Box>
                        {feed.parentName && <Box className={classes.sectionBox}>
                            <EventContainer
                                events={
                                    <List>
                                        {events.map(event =>
                                            <EventItem
                                                id={event.id}
                                                title={event.title}
                                                details={event.details}
                                                date={new Date(event.date)}
                                            />
                                        )}
                                    </List>
                                }/>
                        </Box>}
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
                        subclub={feed}/>
        </div>
    )
}

export default PostFeedLayout;