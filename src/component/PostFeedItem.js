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

    const [vote, setVote] = useState(12);

    const handleUpVote = () => {
        setVote(vote + 1);
    }

    const handleDownVote = () => {
        setVote(vote - 1);
    }

    return (
        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        P
                    </Avatar>
                }
                action={
                    <CardActions>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    </CardActions>
                }
                title={props.postAuthor}
                subheader={props.time}/>

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
    );
}
