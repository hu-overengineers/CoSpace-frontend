import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {},
}));


export function ReportedPosts() {
    const classes = useStyles();

    return (
        <Box>
            <Paper variant="outlined" className={classes.root}>
            </Paper>
        </Box>
    );
}
