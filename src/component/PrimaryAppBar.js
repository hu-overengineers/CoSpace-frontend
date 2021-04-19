import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useHistory} from 'react-router-dom';
import {InputBase} from "@material-ui/core";
import logo from "../image/logo.png"


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 0,
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
                marginRight:'none',
            },

        },
    },
    search: {
        flexGrow:1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        //marginRight: theme.spacing(20),
        //marginLeft: theme.spacing(20),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '15%',
            marginRight: '15%',
            //marginRight: theme.spacing(20),
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
        // vertical padding + font size from searchIcon
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
}));

export default function PrimaryAppBar() {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" variant="outlined" className={classes.appBar}>
                <Toolbar>
                    <img src={logo} alt="CoSpace" className={classes.logo} />
                    <Typography
                        variant="h6"
                        className={classes.title}
                        onClick={() => history.push("/")}
                    >
                        CoSpace
                    </Typography>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search anything…"
                            classes={{
                                root: classes.searchInputRoot,
                                input: classes.searchInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>

                    <IconButton
                        onClick={() => history.push("/profile")}
                    >
                        <AccountCircle/>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    );
}