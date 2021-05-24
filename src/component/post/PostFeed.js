import React, {useEffect, useState} from "react";
import {PostFeedItem} from "./PostFeedItem";
import {List, makeStyles} from '@material-ui/core';
import Box from "@material-ui/core/Box";
import {PostService} from "../../service/PostService";
import {useParams} from "react-router-dom";
import {subDays} from "date-fns";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
    },
    feedItem: {
        marginBottom: theme.spacing(2),
    },
}));


export default function PostFeed({preloadedPosts}) {
    const {feedName = "Popular", page = 1} = useParams();

    const classes = useStyles();

    const [postsInFeed, setPostsInFeed] = useState(preloadedPosts ?? []);

    // Get posts
    useEffect(() => {
        if (preloadedPosts === undefined) {
            PostService.getPosts(feedName, page, 10, subDays(new Date(), 7), new Date()).then(response => {
                console.log(`Fetched posts of ${feedName}`);
                console.log(response.data)
                setPostsInFeed(response.data);
            }).catch(e => {
                console.error(e);
                console.log(`No posts in ${feedName}`);
                setPostsInFeed([]);
            });
        } else {
            setPostsInFeed(preloadedPosts);
        }
    }, [feedName, preloadedPosts]);

    return (
        <div>
            <List className={classes.root}>
                {postsInFeed.map((post, index) => (
                    <Box key={post.id} className={classes.feedItem}>
                        {<PostFeedItem props={post}/>}
                    </Box>
                ))}
            </List>
        </div>
    );
}
