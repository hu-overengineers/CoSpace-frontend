import React from "react";
import {Container, Divider, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import { AuthService } from '../../service/AuthService';
import {useHistory} from 'react-router-dom';
import AdminMenu from './AdminMenu'
import CreateClub from './CreateClub'

const useStyles = makeStyles({
    root: {
        marginTop: "24px" // I suppose this should not be in pixels
    },
    divider: {
        marginTop: "8px",
        marginBottom: "8px"
    },
    feedItem: {
        marginBottom: "12px",
        marginTop: "12px",
    },
    sectionTitle: {
        marginLeft: "12px",
    },
});


function Menu({clubs, callbackOnTreeItemClick}) {
    const classes = useStyles();

    return (
        <Container>
            <Typography variant="h4">Menu</Typography>
            <Divider className={classes.divider}/>
            <AdminMenu/>
        </Container>
    );
}

function AdministrationPanel() {
    const classes = useStyles();

    return (
        <Container>
            <Typography variant="h4">Administration Panel</Typography>
            <Divider className={classes.divider}/>
            <CreateClub/>

        </Container>
    );
}

function Overview() {
    const classes = useStyles();

    return (
        <Container>
            <Typography  variant="h4">Overview</Typography>
            <Divider className={classes.divider}/>
        </Container>
    );
}

export default function AdminPage() {


    const history = useHistory()
    const classes = useStyles();

    const clubs = [];


    for (let i = 0; i < 10; i++) {
        clubs.push({
            name: `Club ${i}`,
            uid: `${i}`
        })
    }

    return (
        <Grid container className={classes.root}>

            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto',}}>
                <Menu clubs= {clubs}/>
            </Grid>
            
            <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <AdministrationPanel/>
            </Grid>
            
            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <Overview/>
            </Grid>

        </Grid>
    );
}