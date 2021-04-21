import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ReportIcon from '@material-ui/icons/Report';
import {useState} from "react";
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
    vote: {
        //paddingTop: '50.25%',
    }
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
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={props.author}
                subheader={props.time}
            />
            <CardContent>

                <Grid container spacing={1}>
                    <Grid item xs={1}>       
                            <IconButton aria-label="up-vote" onClick={handleUpVote}>
                                <ArrowDropUpOutlinedIcon/>
                            </IconButton>
                            
                            <Typography variant="h6" color="textSecondary" align="left">{vote}</Typography>
                            
                            <IconButton aria-label="down-vote" onClick={handleDownVote}>
                                <ArrowDropDownOutlinedIcon/>
                            </IconButton>
                    </Grid>

                    <Grid item xs={11}>
                        <Container>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span">
                                {parse(props.body)}
                            </Typography>
                        </Container>
                    </Grid>
                </Grid>

            </CardContent>

            <CardActions>
                <IconButton aria-label="add to favorites">
                    <ReportIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
            </CardActions>

        </Card>
    );
}