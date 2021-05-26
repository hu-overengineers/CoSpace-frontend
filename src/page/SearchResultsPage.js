import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {Box, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginTop: "5%",
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default function SearchResultsPage() {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();

    return (
        <Container component="main" className={classes.root}>
        </Container>
    );
}