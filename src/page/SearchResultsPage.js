import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {Avatar, Box, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import PostFeed from "../component/post/PostFeed";
import {SearchService} from "../service/SearchService";
import List from "@material-ui/core/List";
import {InfoOutlined, Person} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: "5%",
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(4),
    },
    gridContainer: {},
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
    avatarContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    usernameContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        color: theme.palette.getContrastText('#00e3aa'),
        backgroundColor: '#00e3aa',
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));


function NoResultsFound() {
    const classes = useStyles();

    return (<ListItem
        key={"no-result"}>
        <ListItemAvatar className={classes.avatarContainer}>
            <Avatar className={classes.avatar}><InfoOutlined/></Avatar>
        </ListItemAvatar>
        <ListItemText primary={"No results found"}/>
    </ListItem>);
}


export default function SearchResultsPage() {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();

    const [searchResults, setSearchResults] = useState({
        posts: [],
        clubs: [],
        subClubs: [],
        members: [],
    });

    useEffect(() => {
        SearchService.search(params.query).then(r => {
            setSearchResults(r.data);
        });
    }, [params]);

    return (
        <div>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridLeftColumnBox}>
                        {/* Left empty */}
                    </Box>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                    <Box className={classes.gridMiddleColumnBox}>
                        <Typography className={classes.title} variant={"h4"}>Clubs & Sub-clubs</Typography>
                        <Divider className={classes.divider}/>
                        <Paper variant={"outlined"}>
                            <List>
                                {searchResults.clubs.length === 0 || searchResults.subClubs.length === 0 ?
                                    <NoResultsFound/>
                                    : searchResults.clubs.slice(0, 2).map(club =>
                                        <ListItem button
                                                  key={club.name}
                                                  onClick={() => history.push(`/feed/${club.name}`)}>
                                            <ListItemAvatar className={classes.avatarContainer}>
                                                <Avatar className={classes.avatar}>{club.name[0].toUpperCase()}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={club.name} secondary={"Club"}/>
                                        </ListItem>)}
                                {searchResults.subClubs.slice(0, 3).map(subClub => <ListItem
                                    onClick={() => history.push(`/feed/${subClub.name}`)} key={subClub.name}>
                                    <ListItemAvatar className={classes.avatarContainer}>
                                        <Avatar className={classes.avatar}>{subClub.name[0].toUpperCase()}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={subClub.name}
                                                  secondary={`Sub-club of ${subClub.parentName}`}/>
                                </ListItem>)}
                            </List>
                        </Paper>

                        <Typography className={classes.title} variant={"h4"}>Members</Typography>
                        <Divider className={classes.divider}/>
                        <Paper variant={"outlined"}>
                            <List>
                                {searchResults.members.length === 0 ? <NoResultsFound/>
                                    : searchResults.members.map(member =>
                                        <ListItem
                                            button
                                            key={member.username}
                                            onClick={() => history.push(`/profile/${member.username}`)}>
                                            <ListItemAvatar className={classes.avatarContainer}>
                                                <Avatar className={classes.avatar}><Person/></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {member.username}
                                            </ListItemText>
                                        </ListItem>)}
                            </List>
                        </Paper>

                        <Typography className={classes.title} variant={"h4"}>Posts</Typography>
                        <Divider className={classes.divider}/>
                        <Box>
                            {searchResults.posts.length === 0 ? <NoResultsFound/> :
                                <PostFeed preloadedPosts={searchResults.posts}/>}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Box className={classes.gridRightColumnBox}>

                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}