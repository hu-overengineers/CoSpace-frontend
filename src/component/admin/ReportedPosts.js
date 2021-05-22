import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AdminService} from '../../service/AdminService';
import {PostService} from '../../service/PostService';
import {PostFeedItem} from "../post/PostFeedItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import { Container,Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));



function ReportedPosts() {
    const classes = useStyles();
    const [postReports, setPostReports] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    // Get Reports
    useEffect(() => {
        AdminService.getPostReports().then(response => {
            setPostReports(response.data);
        });
    }, []);

    return (
        <Container>

                <Grid container>
                    <Grid key={1} item >
                        <List className={classes.root}>
                            <Typography variant="h6">List of Reports</Typography>
                            {postReports ? postReports.map((report) => (
                                
                                <div>
                                    <ListItem 
                                        button 
                                        key = {report.postId} 
                                        alignItems="flex-start" 
                                        onClick={() => {
                                            PostService.getPostById(report.postId).then(response => {
                                                setSelectedPost(response.data);
                                                console.log(response.data);
                                            });
                                         }}>
                                        <ListItemIcon>
                                            <ReportOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Reported by: ${report.author}`}
                                            secondary={
                                            <React.Fragment>
                                                <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                                >
                                                {`Report reason: `}
                                                </Typography>
                                                {report.content}
                                            </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>
                                    
                            )) : null}
                        </List>
                    </Grid>
                    <Grid key={2} item >
                        {selectedPost ? <PostFeedItem props={selectedPost}/> : null}
                    </Grid>
                </Grid>



        </Container>

    );
}


export default ReportedPosts;