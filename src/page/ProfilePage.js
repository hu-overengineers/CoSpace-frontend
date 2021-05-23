import React, {useEffect, useState} from 'react';
import {Divider} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import ClubTree from '../component/ClubTree';
import Box from "@material-ui/core/Box";
import {AccountCircle, FiberNew, PublicOutlined, TrendingUp} from "@material-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import PostFeed from "../component/post/PostFeed";
import {MemberService} from "../service/MemberService";
import AboutMember from "../component/profile/AboutMember";
import {useParams} from "react-router-dom";
import {AuthService} from "../service/AuthService";

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


export default function ProfilePage() {
    const params = useParams();
    const username = params.username;

    console.log("Profile Page: " + username);

    const classes = useStyles();

    const [commonClubsAndSubClubs, setCommonClubsAndSubClubs] = useState([]);
    const [posts, setPosts] = useState([]);
    const [subClub, setSubClub] = useState({name: "Loading..."});
    const [sortingOrder, setSortingOrder] = React.useState('new');

    const handleSortingOrder = (event) => {
        console.log("Sorting order: " + event.target.value);
        setSortingOrder(event.target.value);
    };

    // Get the member's enrolled sub-clubs
    useEffect(() => {
        MemberService.getCommonSubClubs(username).then(response => {
            console.log(`Common sub-clubs of ${username} and ${AuthService.getUsername()}`, response.data);
            const clubsToSubClubs = {};
            response.data.forEach(aSubClub => {
                if (!(aSubClub.parentName in clubsToSubClubs)) {
                    clubsToSubClubs[aSubClub.parentName] = []
                }
                clubsToSubClubs[aSubClub.parentName].push(aSubClub);
            });
            const clubsAsList = [];
            for (let k in clubsToSubClubs) {
                clubsAsList.push({name: k, children: clubsToSubClubs[k]})
            }
            setCommonClubsAndSubClubs(clubsAsList);
        }).catch(error => {
            console.error(`Error while fetching common sub-clubs of ${username} and ${AuthService.getUsername()}`, error);
        });
    }, [username]);

    const handleClubTreeItemClick = (node) => {
        setSubClub(node);
    }

    useEffect(() => {
        MemberService.getPostsByAuthorAndSubClub(username, subClub.name).then(response => {
            console.log(`Posts of ${username} on ${subClub.name}`, response.data);
            setPosts(response.data);
        }).catch(error => {
            console.error(`Error while fetching posts of ${username} on ${subClub.name}`, error);
        })
    }, [username, subClub]);

    const isSelf = AuthService.getUsername() === username;

    return (
        <div>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridLeftColumnBox}>

                        <Box className={classes.sectionBox}>
                            <ClubTree
                                titleIcon={isSelf ? <AccountCircle/> : <PublicOutlined/>}
                                callbackOnTreeItemClick={handleClubTreeItemClick}
                                clubs={commonClubsAndSubClubs}
                                title={isSelf ? "Your Clubs" : "Common Clubs"}/>
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
                                <ToggleButton value="new" aria-label="centered">
                                    <FiberNew/>
                                </ToggleButton>
                                <ToggleButton value="top" aria-label="right aligned">
                                    <TrendingUp/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Divider className={classes.divider}/>

                        <PostFeed posts={posts} subclub={subClub.name}/>
                    </Box>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridRightColumnBox}>
                        <Box className={classes.sectionBox}>
                            <AboutMember username={username}
                                         timeRegistered={null}
                                         numberOfPostsInLastWeek={0}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
