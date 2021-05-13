import React from 'react';
import {Container, Divider, List, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import {PostFeedItem} from "../component/PostFeedItem";
import Box from "@material-ui/core/Box";
import ClubTree from '../component/ClubTree';
import UserInfoContainer from '../component/UserInfoContainer';


export default function ProfilePage() {
    const useStyles = makeStyles({
        root: {
            marginTop: "24px" // I suppose this should not be in pixels
        },
        divider: {
            marginTop: "8px",
            marginBottom: "8px"
        },
        feedItem: {
            marginBottom: "12px",
            marginTop: "12px",
        },
        sectionTitle: {
            marginLeft: "12px",
        },
        feedTitle: {}
    });

    const classes = useStyles();

    const clubs = [];
    for (let i = 0; i < 10; i++) {
        clubs.push({
            name: `Club ${i}`,
            uid: `${i}`
        })
    }

    const posts = [];
    for (let i = 0; i < 2; i++) {
        posts.push({
            title: "Lorem ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula," +
                " ipsum eget dictum bibendum, quam sem varius justo, id maximus quam neque vitae arcu." +
                " Phasellus id tincidunt felis. ",
            time: "September 14, 2016",
            author: "jane_doe",
            uid: `${i}`
        })
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto',}}>
                <ClubTree clubs={clubs} callbackOnTreeItemClick={(id) => {
                }}/>
            </Grid>
            <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <Container>
                    <List>
                        <Typography variant="h4" className={classes.feedTitle}>
                            Posts
                        </Typography>
                        <Divider className={classes.divider}/>
                        {posts.map((post, index) => (
                            <Box className={classes.feedItem} key={post.id}>
                                {<PostFeedItem props={post}/>}
                            </Box>
                        ))}
                    </List>
                </Container>
            </Grid>
            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <UserInfoContainer/>
            </Grid>
        </Grid>
    )
}