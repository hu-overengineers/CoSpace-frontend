import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Avatar, IconButton, Typography } from "@material-ui/core";
import { MoreVertOutlined } from "@material-ui/icons";



const useStyles = makeStyles({
    avatar: {
        backgroundColor: (review) => {
            if (review.rating === 5) {
                return "#57bb8a";
            }
            if (review.rating === 4) {
                return "#9ace6a";
            }
            if (review.rating === 3) {
                return "#ffcf02";
            }
            if (review.rating === 2) {
                return "#ff9f02";
            }
            if (review.rating === 1) {
                return "#ff6f31";
            }
            return "#ffffff";
            
        }
    },
})

export default function ReviewCard({review}) {

    const classes = useStyles(review);

    return (
        <div>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {review.rating}
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertOutlined/>
                        </IconButton>
                    }
                    title={review.author}
                    subheader = "review.date will be added"
                />
                <CardContent>
                    <Typography variant = "body" color="textSecondary">
                        {review.content}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
