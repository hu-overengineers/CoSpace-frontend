import {Paper, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({
    // TODO: Add remaining style items here.
    title: {
        marginLeft: "12px", // I suppose this should not be in pixels
        marginTop: "12px"
    },
    body: {
        marginBottom: "12px",
        marginLeft: "12px",
        marginRight: "12px",
    }
});

export function PostFeedItem({title, body}) {
    // TODO: Add remaining information and buttons here.
    //  Currently, this just a dummy item.
    const classes = useStyles();
    return (
        <Paper variant="outlined">
            <Box className={classes.title}>
                <Typography variant="h6">
                    {title}
                </Typography>
            </Box>
            <Box className={classes.body}>
                <Typography variant="body2">
                    {body}
                </Typography>
            </Box>
        </Paper>
    );
}