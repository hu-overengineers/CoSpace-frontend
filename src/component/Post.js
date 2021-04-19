import {Container, List, Paper, Typography} from "@material-ui/core";
import React from "react";


export function PostFeedItem({title, body}) {
    // TODO.
    return (
        <Paper variant="outlined">
            <Typography variant="h6">
                {title}
            </Typography>
            <Typography variant="body2">
                {body}
            </Typography>
        </Paper>
    );
}