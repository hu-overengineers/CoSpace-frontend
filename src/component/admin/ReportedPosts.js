import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AdminService} from '../../service/AdminService';
import {PostService} from '../../service/PostService';
import {PostFeedItem} from "../post/PostFeedItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import { Container,Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  content: {
      padding: theme.spacing(4),
  },
  buttons: {
    padding: theme.spacing(1),
}
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

                <Grid container>
                    <Grid key={1} item xs={4}>
                        <Container className={classes.content}>
                            <List className={classes.root}>
                                <Typography variant="h6">List of Reports</Typography>
                                {postReports ? postReports.map((report) => (
                                    
                                    <div>
                                        <ListItem 
                                            button 
                                            key = {report.postId} 
                                            selected = {selectedPost && report.postId === selectedPost.id}
                                            alignItems="flex-start" 
                                            onClick={(e) => {
                                                
                                                PostService.getPostById(report.postId).then(response => {
                                                    setSelectedPost(response.data);
                                                    
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
                        </Container>
                    </Grid>
                    <Grid key={2} item xs={6}>
                        <Container className={classes.content}>
                            <Typography variant="h6">Reported Post</Typography>
                            <div>
                                {selectedPost ? <PostFeedItem props={selectedPost}/> : null}
                            </div>
                        </Container>

                        <Container>      

                            <Grid container>
                                <Grid item key={1} className={classes.buttons}>
                                    <Button variant="outlined">Ban member</Button>
                                </Grid>

                                <Grid item key={2} className={classes.buttons} >
                                    <Button variant="outlined">Remove Post</Button>
                                </Grid>
                                <Grid item key={2} className={classes.buttons} >
                                    <Button variant="outlined">Another</Button>
                                </Grid>
                            </Grid>
        
                        </Container>
                        
                    </Grid>
                </Grid>




    );
}


export default ReportedPosts;