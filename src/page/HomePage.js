import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {ClubService} from "../service/ClubService";
import {subDays} from "date-fns";
import {AuthService} from "../service/AuthService";
import {MemberService} from "../service/MemberService";
import Box from "@material-ui/core/Box";
import ClubTree from "../component/common/ClubTree";
import {Pagination, ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {Add, Edit, FiberNew, TrendingUp, Whatshot} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import AboutFeed from "../component/AboutFeed";
import EventContainer from "../component/event/EventContainer";
import CreatePost from "../component/CreatePost";
import EventItem from "../component/event/EventItem";
import EnrollPanel from "../component/EnrollPanel";
import RequestSubclub from "../component/RequestSubclub.js"
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import TitledSection from "../component/common/TitledSection";
import PostFeed from "../component/post/PostFeed";
import {PostService} from "../service/PostService";

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
        marginLeft: theme.spacing(2.5),
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
        marginRight: theme.spacing(2.5),
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
    },
    button: {
        marginTop: theme.spacing(2),
    },
    avatarContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    avatar: {
        color: theme.palette.getContrastText('#00e3aa'),
        backgroundColor: '#00e3aa',
    },
    pagination: {
        marginBottom: theme.spacing(2),
    }
}));


const customFeeds = [
    {isCustom: true, name: "Popular", details: "Popular posts in all clubs and sub-clubs right now.", children: []},
];

/**
 * TODO: Refactor.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function HomePage() {
    const classes = useStyles();
    const {feedName = "Popular", sort = 'today', page = 0} = useParams();
    const history = useHistory();

    const [state, setState] = useState({
        feedInfo: {name: feedName},
        sorting: sort,
        page: page,
        clubs: customFeeds,
        subClubs: [],
        enrolledSubClubs: [],
        events: [],
        userInfo: {},
        posts: []
    });

    console.log("State:",);

    const handleSorting = (event, sorting) => {
        setState(s => {
            return {...s, sorting: sorting};
        });
    };

    const isOnSubClub = (feedInfo) => {
        return !(feedInfo.isCustom) && feedInfo.parentName;
    }

    // Fetch user info
    useEffect(() => {
        if (AuthService.hasLoggedIn()) {
            MemberService.getUserByName(AuthService.getUsername()).then(r => {
                console.log("Member info:", r.data);
                const userInfo = r.data;
                setState(s => {
                    return {...s, userInfo: userInfo};
                });
            });
        }
    }, []);

    // Fetch stats
    useEffect(() => {
        if (isOnSubClub(state.feedInfo)) {
            ClubService.getSubClubStatistics(state.feedInfo.name, subDays(new Date(), 7), new Date()).then(response => {
                console.log(`Fetched stats of ${state.feedInfo.name}`, response.data);
                const stats = response.data;
                setState(s => {
                    return {
                        ...s, stats: {
                            numberOfMembers: stats.numberOfMembers,
                            numberOfPostsInLastWeek: stats.numberOfPostsInTimeFrame
                        }
                    };
                });
            }).catch(response => {
                console.error("Error while fetching sub-club statistics:", response);
            });
        }
    }, [state.feedInfo]);

    // Fetch club and sub-clubs
    useEffect(() => {
        ClubService.getSubClubs().then(response => {
            console.log("Parsing sub-clubs");
            console.log(response.data);
            const subClubs = response.data;
            ClubService.parseSubClubs(subClubs).then(tree => {
                console.log("Parsed club tree:", tree);

                customFeeds.slice().reverse().forEach(customFeed => {
                    tree.splice(0, 0, customFeed);
                });

                setState(s => {
                    let feedInfo;
                    const clubFilter = tree.filter(club => club.name === s.feedInfo.name)
                    if (clubFilter.length === 0) {
                        const subClubFilter = subClubs.filter(subClub => subClub.name === s.feedInfo.name);
                        feedInfo = subClubFilter[0];
                    } else {
                        feedInfo = clubFilter[0];
                    }
                    return {
                        ...s, feedInfo: feedInfo,  clubs: tree, subClubs: subClubs
                    };
                });
            });
        });
    }, []);

    // Fetch enrolled sub-clubs:
    useEffect(() => {
        if (AuthService.hasLoggedIn()) {
            MemberService.getEnrolledSubClubsOfCurrentlySignedInUser().then(response => {
                console.log("Enrolled sub-clubs:", response.data);
                const enrolledSubClubs = response.data;
                setState(s => {
                    return {...s, enrolledSubClubs: enrolledSubClubs};
                });
            });
        }
    }, []);

    useEffect(() => {
        if (isOnSubClub(state.feedInfo)) {
            ClubService.getEvents(state.feedInfo.name).then(response => {
                console.log(`Events of ${state.feedInfo.name}`, response.data);
                const events = response.data;
                if (AuthService.hasLoggedIn()) {
                    const allEvents = events.map(event => {
                        event.hasAttended = state.userInfo.attendedEvents
                            .filter(anAttendedEventOfMember => anAttendedEventOfMember.id === event.id).length !== 0;
                        return event;
                    })

                    setState(s => {
                        return {...s, events: allEvents};
                    });
                } else {
                    setState(s => {
                        return {...s, events: events};
                    });
                }
            }).catch(error => {
                console.error("Error while fetching events:", error);
            })
        }
    }, [state.feedInfo, state.userInfo]);

    // Get posts
    useEffect(() => {
        if (state.feedInfo.name) {
            PostService.getPosts(state.feedInfo.name, state.page, 10, state.sorting).then(response => {
                console.log(`Fetched posts of ${state.feedInfo.name}`);
                const posts = response.data;
                setState(s => {
                    return {...s, posts: posts};
                });
            }).catch(e => {
                console.error(e);
                console.log(`No posts in ${state.feedInfo.name}`);
                setState(s => {
                    return {...s, posts: []};
                });
            });
        }
    }, [state.feedInfo, state.page, state.sorting]);

    // on enrollment, refresh the enrolled ones
    const handleEnrollment = (isEnrolled) => {
        if (isEnrolled) {
            setState(s => {
                return {...s, enrolledSubClubs: [...state.enrolledSubClubs, state.feedInfo]};
            });
        }
    };

    // request to being a moderator
    const [modRequestDialogOpen, setModRequestDialogOpen] = React.useState(false);
    const [modRequestResponse, setModRequestResponse] = React.useState("");

    const handleModeratorRequest = () => {
        MemberService.requestForModerating(state.feedInfo.name).then((response) => {
            setModRequestDialogOpen(true);
            console.log(response.data);
            setModRequestResponse(response.data)
        }).catch((err) => {
            if (401 === err.response.status) {
                console.log(err.response.data);
                setModRequestResponse(err.response.data)
                setModRequestDialogOpen(true);
            }
        })
        // setModRequestDialogOpen(true);

    };

    // event for new post creation
    const handleNewPost = (postCreated) => {
        // refresh the posts when the new one sended to db
        // doRefresh(!refreshFeed);
        history.replace(`/feed/${state.feedInfo.name}/new`);
        window.location.reload();
    }

    const handleClubTreeItemClick = (node) => {
        setState(s => {
            return {...s, feedInfo: node};
        });
        history.push(`/feed/${node.name}`);
    }

    const handlePageChange = (event, newPage) => {
        console.log("Page:", newPage);
        setState(s => {
            return {...s, page: newPage};
        });
    }

    const isEnrolled = (feed) => state.enrolledSubClubs ? state.enrolledSubClubs.filter(subClub => subClub.name === feed.name).length !== 0 : false;

    const getNewlyCreatedSubClubs = () => {
        if (state.subClubs !== null && state.enrolledSubClubs !== null && state.userInfo !== null) {
            const uncommon = [];
            const time = new Date(state.userInfo.created);
            state.subClubs.forEach(subClub => {
                state.enrolledSubClubs.forEach(enrolled => {
                    if (enrolled.name !== subClub.name) {
                        if (new Date(subClub.created) > time) {
                            uncommon.push(subClub);
                        }
                    }
                })
            });
            return uncommon;
        }
        return [];
    }

    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
    const [subClubRequestDialogOpen, setSubClubRequestDialogOpen] = useState(false);

    return (
        <div>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridLeftColumnBox}>
                        <Box className={classes.sectionBox}>
                            <ClubTree
                                title={"Browse"}
                                selected={state.feedInfo.name}
                                callbackOnTreeItemClick={handleClubTreeItemClick}
                                clubs={state.clubs}/>
                        </Box>
                    </Box>
                </Grid>


                <Grid item xs={6} className={classes.gridItem}>
                    <Box className={classes.gridMiddleColumnBox}>
                        <Box display="flex">
                            <ToggleButtonGroup
                                className={classes.sortingFeedToggleGroup}
                                value={state.sorting}
                                exclusive
                                onChange={handleSorting}
                                aria-label="text alignment">
                                <ToggleButton value="today" aria-label="left aligned">
                                    <Whatshot/>
                                </ToggleButton>
                                <ToggleButton value="new" aria-label="centered">
                                    <FiberNew/>
                                </ToggleButton>
                                <ToggleButton value="top" aria-label="right aligned">
                                    <TrendingUp/>
                                </ToggleButton>
                            </ToggleButtonGroup>


                            {(!(state.feedInfo.isCustom || (!state.feedInfo.parentName))) &&
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    disabled={!isEnrolled(state.feedInfo)}
                                    startIcon={<Edit/>}
                                    onClick={() => {
                                        setPostDialogOpen(true);
                                    }}
                                    disableElevation>CREATE POST</Button>}
                        </Box>
                        <Divider className={classes.divider}/>

                        {/* Feed */}
                        <PostFeed posts={state.posts}/>
                        <Pagination page={state.page} onChange={handlePageChange} className={classes.pagination}
                                    count={20} color="primary" variant="outlined" shape="rounded"/>

                    </Box>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridRightColumnBox}>
                        <Box className={classes.sectionBox}>
                            {state.feedInfo.name !== undefined &&
                            <AboutFeed feedInfo={state.feedInfo} stats={state.stats}/>}
                        </Box>
                        {state.feedInfo.parentName && <Box className={classes.sectionBox}>
                            <EventContainer
                                events={
                                    <List>
                                        {state.events && state.events.length !== 0 ? state.events.map(event =>
                                            <EventItem
                                                key={event.id}
                                                event={event}
                                                attendCallback={(id) => {
                                                    MemberService.attendEvent(id).then(response => {
                                                        console.log("Successfully attended event:", response.data);
                                                        const aux = state.events.slice();
                                                        aux.filter(event => event.id === response.data.id).forEach(event => {
                                                            event.hasAttended = true;
                                                        })
                                                        setState(s => {
                                                            return {...s, events: aux};
                                                        });
                                                    }).catch(error => {
                                                        console.error("Error while attending event:", error);
                                                    })
                                                }}
                                            />
                                        ) : "There are no events announced as of now."}
                                    </List>
                                }/>
                        </Box>}

                        {((!isEnrolled(state.feedInfo))
                            && (!(state.feedInfo.isCustom || (!state.feedInfo.parentName)))) &&
                        <Box>
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add/>}
                                    onClick={() => {
                                        setEnrollDialogOpen(true);
                                    }}
                                    fullWidth
                                    disableElevation>ENROLL
                            </Button>
                        </Box>}

                        {(isEnrolled(state.feedInfo)) &&
                        <Box className={classes.button}>
                            <Button size="medium"
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<RateReviewOutlinedIcon/>}
                                    onClick={() => {
                                        history.push(`/meta/${state.feedInfo.name}`)
                                    }}
                                    fullWidth
                                    disableElevation>{state.feedInfo.name} META
                            </Button>
                        </Box>}

                        {((!state.feedInfo.isCustom) && (!state.feedInfo.parentName)) &&
                        <Box className={classes.button}>
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add/>}
                                    onClick={() => {
                                        setSubClubRequestDialogOpen(true);
                                    }}
                                    fullWidth
                                    disableElevation>REQUEST NEW SUB-CLUB
                            </Button>
                        </Box>}

                        {((isEnrolled(state.feedInfo))
                            && (!(state.feedInfo.isCustom || (!state.feedInfo.parentName)))
                            && (state.feedInfo.moderatorUsername !== AuthService.getUsername())) &&
                        <Box className={classes.button}>
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add/>}
                                    onClick={() => {
                                        handleModeratorRequest()
                                    }}
                                    fullWidth
                                    disableElevation>REQUEST TO BE A MODERATOR
                            </Button>
                        </Box>}

                        {state.feedInfo.name === "Popular" && AuthService.hasJwtToken() && getNewlyCreatedSubClubs().length > 0 &&
                        <Box>
                            <TitledSection titleIcon={<FiberNew/>}
                                           title={"Newly created sub-clubs"}>
                                <List>
                                    {getNewlyCreatedSubClubs().map(subClub =>
                                        <ListItem
                                            button
                                            onClick={() => history.push(`/feed/${subClub.name}`)} key={subClub.name}>
                                            <ListItemAvatar className={classes.avatarContainer}>
                                                <Avatar
                                                    className={classes.avatar}>{subClub.name[0].toUpperCase()}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={subClub.name}
                                                          secondary={`Sub-club of ${subClub.parentName}`}/>
                                        </ListItem>
                                    )}
                                </List>
                            </TitledSection>
                        </Box>}

                    </Box>
                </Grid>
            </Grid>
            <CreatePost open={postDialogOpen} setOpen={setPostDialogOpen} newPostEvent={handleNewPost}
                        subclub={state.feedInfo}/>
            {(enrollDialogOpen) &&
            <EnrollPanel open={enrollDialogOpen} setOpenDialog={setEnrollDialogOpen} setEnrolled={handleEnrollment}
                         clickedSubClub={state.feedInfo}/>}

            {(subClubRequestDialogOpen) &&
            <RequestSubclub open={subClubRequestDialogOpen} setOpenDialog={setSubClubRequestDialogOpen}
                            club={state.feedInfo}/>}


            <Dialog open={modRequestDialogOpen} onClose={() => {
                setModRequestDialogOpen(false)
            }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Moderator Request</DialogTitle>
                <DialogContent>
                    <p>{modRequestResponse}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setModRequestDialogOpen(false)
                    }} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default HomePage;