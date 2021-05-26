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
import {useHistory} from "react-router-dom";
import {ClubService} from "../service/ClubService";
import {subDays} from "date-fns";
import {AuthService} from "../service/AuthService";
import {MemberService} from "../service/MemberService";
import Box from "@material-ui/core/Box";
import ClubTree from "../component/common/ClubTree";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
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
import {unstable_batchedUpdates} from "react-dom";

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
function PostFeedLayout({children}) {
    const classes = useStyles();
    const history = useHistory();
    const [sorting, setSorting] = useState('today');

    const handleSorting = (event, sorting) => {
        console.log("Sorting order: " + sorting);
        setSorting(sorting);
    };

    useEffect(() => {

    }, [sorting])

    // Clubs and sub-clubs
    const [clubs, setClubs] = useState(customFeeds);
    const [subClubs, setSubClubs] = useState(null);
    const [enrolledSubClubs, setEnrolledSubClubs] = useState(null);
    const [feed, setFeed] = useState(customFeeds[0]);
    const [events, setEvents] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    // Refresh event for posts
    const [refreshFeed, doRefresh] = useState(0)
    const [postDialogOpen, setPostDialogOpen] = React.useState(false);
    const [enrollDialogOpen, setEnrollDialogOpen] = React.useState(false);
    const [subclubRequestDialogOpen, setSubclubRequestDialogOpen] = React.useState(false);

    useEffect(() => {
        if (AuthService.hasJwtToken()) {
            MemberService.getUserByName(AuthService.getUsername()).then(r => {
                console.log("Member  info:", r.data);
                setUserInfo(r.data);
            });
        }
    }, []);

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
                console.error("Error while fetching sub-club statistics:", response);
            });
        }
    }, [refreshFeed]);  // TODO: Figure out a better way to update feed info object with stats.

    // Get club and sub-clubs
    useEffect(() => {
        ClubService.getSubClubs().then(response => {
            console.log("Parsing sub-clubs");
            console.log(response.data);
            const subClubs = response.data;
            ClubService.parseSubClubs(response.data).then(tree => {
                console.log("Parsed club tree:", tree)
                customFeeds.slice().reverse().forEach(customFeed => {
                    tree.splice(0, 0, customFeed);
                });
                unstable_batchedUpdates(() => {
                    setClubs(tree);
                    setSubClubs(subClubs);
                });
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
        if (!(feed.isCustom) || feed.parentName) {
            ClubService.getEvents(feed.name).then(response => {
                console.log(`Events of ${feed.name}`, response.data);

                if (AuthService.hasJwtToken()) {

                    MemberService.getAttendedEventsOfCurrentlySignedInUser().then(attendedEventsResponse => {
                        console.log("Attended events:", response.data);

                        const allEvents = response.data.map(event => {
                            event.hasAttended = attendedEventsResponse.data.filter(anAttendedEventOfMember => anAttendedEventOfMember.id === event.id).length !== 0;
                            return event;
                        })

                        setEvents(allEvents);

                    }).catch(error => {
                        console.log("Error while fetching attended events:", error);
                    })
                } else {
                    setEvents(response.data);
                }
            }).catch(error => {
                console.error(error);
            })
        }
    }, [feed]);

    useEffect(() => {
        console.log("Sorting changed:", sorting);
        history.replace(`/feed/${feed.name}/${sorting}`);
    }, [feed.name, history, sorting]);

    // create post pop-up
    const handleCreatePostDialogOpen = () => {
        setPostDialogOpen(true);
    };

    // enrollment pop-up
    const handleEnrollDialogOpen = () => {
        setEnrollDialogOpen(true);
    };

    // subclub request pop-up
    const handleSubclubRequestDialogOpen = () => {
        setSubclubRequestDialogOpen(true);
    };

    // on enrollment, refresh the enrolled ones
    const handleEnrollment = (isEnrolled) => {
        if (isEnrolled) {
            setEnrolledSubClubs([...enrolledSubClubs, feed])
        }
    };

    // request to being a moderator
    const [modRequestDialogOpen, setModRequestDialogOpen] = React.useState(false);
    const [modRequestResponse, setModRequestResponse] = React.useState("");
    const handleModeratorRequest = () => {
        MemberService.requestForModerating(feed.name).then((response) => {
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
        doRefresh(!refreshFeed);
    }

    const handleClubTreeItemClick = (node) => {
        setFeed(node);
        doRefresh(!refreshFeed);
        history.push(`/feed/${node.name}`);
    }

    const isEnrolled = (feed) => enrolledSubClubs ? enrolledSubClubs.filter(subClub => subClub.name === feed.name).length !== 0 : false;

    const getNewlyCreatedSubClubs = () => {
        if (subClubs !== null && enrolledSubClubs !== null && userInfo !== null) {
            const uncommon = [];
            const time = new Date(userInfo.created);
            subClubs.forEach(subClub => {
                enrolledSubClubs.forEach(enrolled => {
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

    return (
        <div>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridLeftColumnBox}>
                        <Box className={classes.sectionBox}>
                            <ClubTree
                                title={"Browse"}
                                selected={feed.name}
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
                                value={sorting}
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


                            {(!(feed.isCustom || (!feed.parentName))) &&
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    disabled={!isEnrolled(feed)}
                                    startIcon={<Edit/>}
                                    onClick={() => {
                                        handleCreatePostDialogOpen()
                                    }}
                                    disableElevation>CREATE POST</Button>}
                        </Box>
                        <Divider className={classes.divider}/>

                        {/* Feed */}
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
                                        {events && events.length !== 0 ? events.map(event =>
                                            <EventItem
                                                key={event.id}
                                                event={event}
                                                attendCallback={(id) => {
                                                    MemberService.attendEvent(id).then(response => {
                                                        console.log("Successfully attended event:", response.data);
                                                        const aux = events.slice();
                                                        aux.filter(event => event.id === response.data.id).forEach(event => {
                                                            event.hasAttended = true;
                                                        })
                                                        setEvents(aux);
                                                    }).catch(error => {
                                                        console.error("Error while attending event:", error);
                                                    })
                                                }}
                                            />
                                        ) : "There are no events announced as of now."}
                                    </List>
                                }/>
                        </Box>}

                        {((!isEnrolled(feed))
                            && (!(feed.isCustom || (!feed.parentName)))) &&
                        <Box>
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add/>}
                                    onClick={() => {
                                        handleEnrollDialogOpen()
                                    }}
                                    fullWidth
                                    disableElevation>ENROLL
                            </Button>
                        </Box>}

                        {(isEnrolled(feed)) &&
                        <Box className={classes.button}>
                            <Button size="medium"
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<RateReviewOutlinedIcon/>}
                                    onClick={() => {
                                        history.push(`/meta/${feed.name}`)
                                    }}
                                    fullWidth
                                    disableElevation>{feed.name} META
                            </Button>
                        </Box>}

                        {((!feed.isCustom) && (!feed.parentName)) &&
                        <Box className={classes.button}>
                            <Button size="medium"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add/>}
                                    onClick={() => {
                                        handleSubclubRequestDialogOpen()
                                    }}
                                    fullWidth
                                    disableElevation>REQUEST NEW SUB-CLUB
                            </Button>
                        </Box>}

                        {((isEnrolled(feed))
                            && (!(feed.isCustom || (!feed.parentName))) && (feed.moderatorUsername !== AuthService.getUsername())) &&
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

                        {feed.name === "Popular" && AuthService.hasJwtToken() && getNewlyCreatedSubClubs().length > 0 &&
                        <Box>
                            <TitledSection titleIcon={<FiberNew/>}
                                           title={"Newly created sub-clubs"}>
                                <List>
                                    {getNewlyCreatedSubClubs().map(subClub =>
                                        <ListItem
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
                        subclub={feed}/>
            {(enrollDialogOpen) &&
            <EnrollPanel open={enrollDialogOpen} setOpenDialog={setEnrollDialogOpen} setEnrolled={handleEnrollment}
                         clickedSubClub={feed}/>}

            {(subclubRequestDialogOpen) &&
            <RequestSubclub open={subclubRequestDialogOpen} setOpenDialog={setSubclubRequestDialogOpen} club={feed}/>}


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

export default PostFeedLayout;