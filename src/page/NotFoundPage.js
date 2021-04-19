import React from "react";
import {Box, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginTop: "5%",
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        marginTop: "2%"
    },
});

export default function NotFoundPage() {
    const classes = useStyles();
    const history = useHistory()

    return (
        <Container component="main" className={classes.root}>
            <Typography variant="h2">
                Page not found :(
            </Typography>
            <Box className={classes.button}>
                <Button variant="outlined"
                        onClick={() => history.push("/")}>
                    Go to home page
                </Button></Box>
        </Container>
    );
}