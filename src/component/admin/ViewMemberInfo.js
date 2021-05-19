import React from "react";
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Container, Grid, InputBase, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    search: {
        margin: theme.spacing(4),
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
    title: {
        margin: theme.spacing(4, 0, 2),
    },

}));


function ViewMemberInfo() {
    const classes = useStyles();

    const clubNames = ["Club Name 1", "Club Name 2", "Club Name 3"];
    const subClubNames = ["Sub-Club 1", "Sub-Club 2", "Sub-Club 3"];
    const ipAddr = ["192.168.1.1 - 5.06", "192.168.1.2 - 2.23", "192.168.1.3 - 22.33"]

    return (
        <Container>

            <Container className={classes.search}>
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
            </Container>


            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="birthday"
                                label="Birth Date"
                                defaultValue="2017-05-24"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="username"
                                label="User Name"
                                defaultValue="John Doe"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="registration-date"
                                label="Registration Date"
                                defaultValue="2017-05-24 13:42"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="last-login-date"
                                label="Last Login Date"
                                defaultValue="2017-05-24 13:42"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <Typography variant="h6" className={classes.title}>Membership List</Typography>

                        <div>
                            <List className={classes.root} subheader={<li/>}>
                                {clubNames.map((clubName) => (
                                    <li key={`section-${clubName}`} className={classes.listSection}>
                                        <ul className={classes.ul}>
                                            <ListSubheader>{clubName}</ListSubheader>
                                            {subClubNames.map((subClubName) => (
                                                <ListItem key={subClubName}>
                                                    <ListItemText primary={subClubName}/>
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </List>
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <Typography variant="h6" className={classes.title}>IP Login List</Typography>

                        <div>
                            <List>
                                {ipAddr.map((ip) => (
                                    <ListItem key={ip}>
                                        <ListItemText primary={ip}/>
                                    </ListItem>
                                ))}
                            </List>

                        </div>

                    </Container>
                </Grid>
            </Grid>


        </Container>)
}


export default ViewMemberInfo;