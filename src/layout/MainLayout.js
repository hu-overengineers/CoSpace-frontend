import React from 'react';
import PrimaryAppBar from "../component/PrimaryAppBar";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    // Load app bar information from the theme
    toolbar: theme.mixins.toolbar,
}));

export default function MainLayout({children}) {
    const classes = useStyles();

    return (
        <div>

            <PrimaryAppBar/>

            {/* side drawer */}
            {/* <div>side drawer</div> */}

            {/* main content */}
            <div>
                {/* Shift content by appbar width */}
                <div className={classes.toolbar}/>
                {children}
            </div>
        </div>
    )
}