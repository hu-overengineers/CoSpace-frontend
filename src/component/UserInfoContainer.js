import {Container} from '@material-ui/core';


import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, deepPurple} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

function LetterAvatars({letter}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar className={classes.purple}>{letter}</Avatar>

        </div>
    );
}

export default function UserInfoContainer() {


    return (
        <Container>
            <Container maxWidth="sm">
                <LetterAvatars letter={"CY"}/>
                User Name
            </Container>

        </Container>
    );

}