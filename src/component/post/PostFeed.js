import React, {useEffect, useState} from "react";
import {PostFeedItem} from "./PostFeedItem";
import {List, makeStyles, Typography} from '@material-ui/core';
import Box from "@material-ui/core/Box";
import {PostService} from "../../service/PostService";
import {useHistory, useParams} from "react-router-dom";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
    },
    feedItem: {
        marginBottom: theme.spacing(2),
    },
}));


export default function PostFeed({posts}) {
    // const {feedName, sort = "today", page = 0} = useParams();

    // console.log("Feed: ", feedName, sort, page);

    const classes = useStyles();
    const history = useHistory();

    // const [postsInFeed, setPostsInFeed] = useState(preloadedPosts ?? []);
    //
    // // Get posts
    // useEffect(() => {
    //     if (preloadedPosts === undefined) {
    //         PostService.getPosts(feedName, page, 10, sort).then(response => {
    //             console.log(`Fetched posts of ${feedName}`);
    //             console.log(response.data)
    //             setPostsInFeed(response.data);
    //         }).catch(e => {
    //             console.error(e);
    //             console.log(`No posts in ${feedName}`);
    //             setPostsInFeed([]);
    //         });
    //     } else {
    //         setPostsInFeed(preloadedPosts);
    //     }
    // }, [feedName, page, preloadedPosts]);

    return (
        <div>
            <List className={classes.root}>
                {posts ? (posts.length > 0 ? posts.map((post, index) => (
                    <Box key={post.id} className={classes.feedItem}>
                        {<PostFeedItem props={post}/>}
                    </Box>
                )) : <Container>
                    <Typography variant={"h5"}>
                        It's quiet around here...
                    </Typography>
                </Container>) : history.push("/notfound")}
            </List>
        </div>
    );
}
