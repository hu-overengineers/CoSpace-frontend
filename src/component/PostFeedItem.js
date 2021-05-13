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
import parse from "html-react-parser"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {PostService} from "../service/PostService";
import {AuthService} from "../service/AuthService";

const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    },
    voteLabel: {
        flexGrow: 1,
    },
    postCardContent: {
        margin: 0,
        padding: 0
    },
    postContentBox: {
        marginRight: theme.spacing(2),
    },
}));


export function PostFeedItem({props}) {
    const classes = useStyles();

    // Up-voting & down-voting
    const [vote, setVote] = useState(0);

    const handleUpVote = () => {
        setVote(vote + 1);
    }

    const handleDownVote = () => {
        setVote(vote - 1);
    }

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
        PostService.reportPost({
            reportAuthor: AuthService.getUsername(),
            reportMessage: reportMessage,
            reportedPostId: props.id.toString(),
        }).then(r => {
            console.log(r);
            handleReportDialogClose();
            // TODO: Maybe send a feedback that it was successfully reported.
        })}

    return (
        <Box>

            <Card variant="outlined" className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.postAuthor.charAt(0).toUpperCase()}
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
                            </Menu>
                        </CardActions>
                    }
                    title={props.postAuthor}
                    subheader={new Date(props.created).toLocaleString()}/>

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
                            <Box className={classes.postContentBox}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.postTitle}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="span">
                                    {parse(props.postContent)}
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
        </Box>
    );
}
