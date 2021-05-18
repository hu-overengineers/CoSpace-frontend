import React from "react";
import {Container,  Typography} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 0,
        marginLeft: theme.spacing(1),
    },
    search: {
        flexGrow: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.text.primary, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.text.primary, 0.20),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInputRoot: {
        color: 'inherit',
    },
    searchInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    logo: {
        maxWidth: '50px',
    },
    appBar: {}
}));

export default function Members() {
    const classes = useStyles();

    return (
    <Container>
            <Typography>Members</Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                    <InputBase
                        placeholder="Search a member"
                        classes={{
                            root: classes.searchInputRoot,
                            input: classes.searchInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
            </div>
    </Container>);
}