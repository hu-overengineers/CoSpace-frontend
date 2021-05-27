import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import parse from "html-react-parser";
import {delay} from "../../util/async";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem,
    Snackbar,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {PostService} from "../../service/PostService";
import {AuthService} from "../../service/AuthService";
import {Alert} from "@material-ui/lab";
import {formatDistance, parseISO} from "date-fns";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
       // width: null,
       // height: 300,
       // "object-fit": "contain",
       // resize: "inline",
       // resizeMode: "contain",
       // overflow: "hidden",
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        cursor: "pointer",
    },
    voteLabel: {
        flexGrow: 1,
    },
    postCardContent: {
        margin: 0,
        padding: 0
    },
    contentBox: {
        marginRight: theme.spacing(2),
    },
    contentTypography: {
        maxWidth: theme.spacing(30),
    },
}));


export function PostFeedItem({props}) {
    const classes = useStyles();
    const history = useHistory();

    // Up-voting & down-voting
    const [vote, setVote] = useState(props.voting);

    const handleUpVote = () => {
        PostService.upvotePost(props.id).then(response => {
            console.log(response);
            if (response.data === "") {
                setSnackbarSeverity("error");
                setSnackbarMessage("You are not authorized to vote on this post!");
                setSnackbarOpen(true);
            } else {
                setVote(response.data.voting);
            }
        }).catch(e => {
            console.error(e);
            setSnackbarSeverity("error");
            if (e.response.status === 403) {
                setSnackbarMessage("You are not authorized to vote on this post!");
            } else {
                setSnackbarMessage("Something went wrong!");
            }
            setSnackbarOpen(true);
        });
    }

    const handleDownVote = () => {
        PostService.downvotePost(props.id).then(response => {
            if (response.data === "") {
                setSnackbarSeverity("error");
                setSnackbarMessage("You are not authorized to vote on this post!");
                setSnackbarOpen(true);
            } else {
                setVote(response.data.voting);
            }
        }).catch(e => {
            console.error(e);
            setSnackbarSeverity("error");
            if (e.response.status === 403) {
                setSnackbarMessage("You are not authorized to vote on this post!");
            } else {
                setSnackbarMessage("Something went wrong!");
            }
            setSnackbarOpen(true);
        });
    }

    // Snackbar
    const [openSnackbar, setSnackbarOpen] = React.useState(false);
    const [severity, setSnackbarSeverity] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("Welcome back!");

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    // Post menu
    const [postMenuAnchorElement, setPostMenuAnchorElement] = React.useState(null);
    const open = Boolean(postMenuAnchorElement);

    const handleMenuButtonClick = (event) => {
        setPostMenuAnchorElement(event.currentTarget);
    }

    const handlePostMenuClose = () => {
        setPostMenuAnchorElement(null);
    };

    // Reporting
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [reportMessage, setReportMessage] = useState("");

    const handleReportDialogOpen = () => {
        setReportDialogOpen(true);
    };

    const handleReportDialogClose = () => {
        setReportDialogOpen(false);
        setPostMenuAnchorElement(null);
    };

    const handleSendReport = () => {
        PostService.reportPost(AuthService.getUsername(), reportMessage, props.id).then(r => {
            console.log(r);
            handleReportDialogClose();
            setSnackbarSeverity("success");
            setSnackbarMessage("Thanks for trying to make CoSpace a better place!");
            setSnackbarOpen(true);
        }).catch(e => {
            console.error(e);
            setSnackbarSeverity("error");
            setSnackbarMessage("Something went wrong while reporting the post! Try again later.");
            setSnackbarOpen(true);
        });
    }

    const handleAuthorClick = () => history.push(`/profile/${props.author}`);


    
    const handleDeletePost = () => {

       PostService.deleteOwnPost(props.id).then(response => {
            console.log(response.data);
            window.location.reload()
          
       });
    };


    return (
        <Box>
            <Card variant="outlined" className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar onClick={handleAuthorClick} aria-label="recipe" className={classes.avatar}>
                            {props.author.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <CardActions>
                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>
                            <IconButton aria-label="settings" onClick={handleMenuButtonClick}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id="post-menu"
                                anchorEl={postMenuAnchorElement}
                                keepMounted
                                open={open}
                                onClose={handlePostMenuClose}>
                                <MenuItem key="report" onClick={handleReportDialogOpen}>
                                    Report
                                </MenuItem>
                                
                                {AuthService.getUsername() === props.author ? 
                                <MenuItem key="delete" onClick={handleDeletePost}>
                                    Delete
                                </MenuItem>
                                : null}
                                
                            </Menu>
                        </CardActions>
                    }
                    title={<Box style={{"cursor": "pointer"}} onClick={handleAuthorClick}>{props.author}</Box>}
                    subheader={`${formatDistance(parseISO(props.created), new Date(), {addSuffix: true})} on ${props.parentName}`}/>
                <CardContent className={classes.postCardContent}>
                    <Grid container spacing={1}>
                        <Grid item xs={1} style={{textAlign: "center"}}>
                            <IconButton aria-label="up-vote" onClick={handleUpVote}>
                                <KeyboardArrowUpIcon/>
                            </IconButton>

                            <Box display="flex" flexDirection="center">
                                <Typography className={classes.voteLabel}
                                            variant="body1"
                                            color="textSecondary">{vote}</Typography>
                            </Box>

                            <IconButton aria-label="down-vote" onClick={handleDownVote}>
                                <KeyboardArrowDownIcon/>
                            </IconButton>
                        </Grid>

                        <Grid item xs={11}>
                            <Box className={classes.contentBox}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <Box className={classes.media}>
                                        {parse(props.content)}
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
            <Dialog open={reportDialogOpen} onClose={handleReportDialogClose} aria-labelledby="report-dialog-title">
                <DialogTitle id="report-dialog-title">Report</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Why should we remove it? Please write down your rationale.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Rationale"
                        type="multiline"
                        fullWidth
                        onChange={(event) => {
                            setReportMessage(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReportDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSendReport} color="primary">
                        Report
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
