import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AdminService} from '../../service/AdminService';
import {PostFeedItem} from "../post/PostFeedItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import {Grid, Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {PostService} from "../../service/PostService";
import Box from "@material-ui/core/Box";
import MemberInfo from "./MemberInfo";
import NoResultsFound from "../common/NoResultsFound";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
    paper: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    gridReportInfoContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    gridHorizontalSection: {
        paddingRight: theme.spacing(2),
    },
}));


function ReportedPosts() {
    const classes = useStyles();
    const [postReports, setPostReports] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedPostOwner, setSelectedPostOwner] = useState({});

    // Get Reports
    useEffect(() => {
        AdminService.getPostReports().then(response => {
            setPostReports(response.data);
        });
    }, [selectedReport]);

    const handleReportClick = (e, report) => {
        setSelectedReport(report);
        PostService.getPostById(report.postId).then(response => {
            setSelectedPost(response.data);
            AdminService.searchMembersByName(response.data.author, 0, 1).then(response => {
                setSelectedPostOwner(response.data[0]);
            });
        });
    };

    return (

        <Grid container>
            <Grid key={1} item xs={4}>
                <Typography variant="h6" className={classes.title}>List of Reports</Typography>
                <Paper variant={"outlined"} className={classes.paper}>
                    <List className={classes.root}>
                        {postReports === null || postReports.length === 0 ? <NoResultsFound/> : postReports.map((report) =>
                            <div>
                                <ListItem
                                    button
                                    key={report.postId}
                                    selected={selectedPost && report.postId === selectedPost.id}
                                    alignItems="flex-start"
                                    onClick={(e) => handleReportClick(e, report)}>
                                    <ListItemIcon>
                                        <ReportOutlinedIcon/>
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
                                                    {`Reason: `}
                                                </Typography>
                                                {report.content}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </div>
                        )}
                    </List>
                </Paper>
            </Grid>


            <Grid className={classes.gridReportInfoContainer} key={2} container xs={8}>
                {selectedPost ?
                    <Box>

                        <Grid item>
                            <Typography variant="h6" className={classes.title}>Reported Post</Typography>
                            <Box className={classes.postFeedItemWrapper}>{selectedPost ?
                                <PostFeedItem key={selectedPost.postId} props={selectedPost}/> : null}
                            </Box>
                        </Grid>

                        <Grid container>
                            <Grid item key={1} xs={6} className={classes.gridHorizontalSection}>
                                <Typography variant="h6" className={classes.title}>Author Information</Typography>
                                {selectedPostOwner ? <MemberInfo info={selectedPostOwner}/> : null}
                            </Grid>

                            <Grid item key={2} xs={6} className={classes.gridHorizontalSection}>
                                <Typography variant="h6" className={classes.title}>Actions</Typography>
                                <Grid container>
                                    <Grid item key={1} className={classes.button}>
                                        <Button variant="outlined" onClick={()=>{
                                            // TODO: call kick member function from AdminService
                                        }}>KICK MEMBER from COSPACE</Button>
                                    </Grid>

                                    <Grid item key={2} className={classes.button}>
                                        <Button variant="outlined" onClick = {() => {
                                            AdminService.deleteReport(selectedReport.id).then(response => {
                                                console.log(response.data);
                                                setSelectedReport(null);
                                                setSelectedPost(null);
                                                setSelectedPostOwner(null);
                                            })
                                        }}>REMOVE Report</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                    </Box>
                    : <Typography className={classes.title}>Select a report to see the details.</Typography>}
            </Grid>
        </Grid>


    );
}


export default ReportedPosts;
