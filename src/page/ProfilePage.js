import React from 'react';
import {Button, Container, Divider, List, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import ClubTree from '../component/ClubTree';
import UserInfoContainer from '../component/UserInfoContainer';
import { AuthService } from '../service/AuthService';
import {useHistory} from 'react-router-dom';

export default function ProfilePage() {

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
        feedTitle: {}
    });

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
                <ClubTree clubs={clubs} callbackOnTreeItemClick={(id) => {}}/>
            </Grid>
            
            <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <Container>
                    <List>
                        <Typography variant="h4" className={classes.feedTitle}>
                            Posts
                        </Typography>
                        <Divider className={classes.divider}/>
                    </List>
                </Container>
            </Grid>
            
            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <UserInfoContainer/>
                <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(event) => {
                            AuthService.logout()
                            history.push("/sign-in")
                        }}
                    >
                       Logout
                </Button>
                
                <Button
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={(event) => {
                            history.push("/admin")
                        }}
                    >
                       Admin Panel
                </Button>
            </Grid>

        </Grid>
    );
}
