import React from 'react';
import PrimaryAppBar from "../component/PrimaryAppBar";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    // Load app bar information from the theme
    toolbar: theme.mixins.toolbar,
}));

export default function MainLayout({children}) {
    const classes = useStyles();

    return (
        <Box>
            <PrimaryAppBar/>

            {/* side drawer */}
            {/* <div>side drawer</div> */}

            {/* main content */}
            <Box>
                {/* Shift content by appbar width */}
                <div className={classes.toolbar}/>
                {children}
            </Box>
        </Box>
    )
}