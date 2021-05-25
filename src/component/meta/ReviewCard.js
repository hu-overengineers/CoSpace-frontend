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
import { blue, green, lightGreen, orange, red, yellow } from "@material-ui/core/colors";


const useStyles = makeStyles({
    avatar: {
        // TODO: Make these looking good!
        backgroundColor: (review) => {
            switch(review.rating) {
                case 10:
                    return "#76FF03";
                case 9:
                    return "#64DD17";
                case 8:
                    return "#2E7D32";
                case 7:
                    return "#B9F6CA";
                case 6:
                    return "#00695C";
                case 5:
                    return "#80CBC4";              
                case 4:
                    return "#FDD835";
                case 3:
                    return "#FB8C00";
                case 2:
                    return "#E65100";
                case 1:
                    return "#EF5350";
                case 0:
                    return "#D50000";
        }
    },
}})

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
