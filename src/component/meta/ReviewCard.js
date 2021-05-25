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
import { blue, green, red, yellow } from "@material-ui/core/colors";


const useStyles = makeStyles({
    avatar: {
        backgroundColor: (review) => {
            if (review.rating > 8) {
                return green[700];
            }
            if (review.rating > 6) {
                return blue[review.rating * 100];
            }
            if (review.rating > 3) {
                return yellow[400 + review.rating * 100];
            }
            return red[300];
        }
    }
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
                    subheader={review.rating}
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
