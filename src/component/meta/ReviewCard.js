import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, IconButton, Typography } from "@material-ui/core";
import { MoreVertOutlined } from "@material-ui/icons";
import {formatDistance} from "date-fns";



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
                    subheader ={formatDistance(new Date(review.created), new Date())}
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
