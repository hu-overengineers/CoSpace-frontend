import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import AllClubs from "../component/AllClubs";
import Questionnaire from '../component/Questionnaire';


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: theme.spacing(5),

        
    },
    gridItem: {
        padding: theme.spacing(2)
    },
    panel: {
    }
  }));

export default function EnrollPage() {
    const classes = useStyles();


    const handleClubClick = (club) => {
        console.log("clicked club", club);
    }


    return (
        <div>
            <Grid container  spacing={1} className={classes.gridContainer}>
                <Grid item xs={4} className={classes.gridItem}>
                        <AllClubs className={classes.panel} callbackOnClubClick={(club) => {handleClubClick(club)}}></AllClubs>
                </Grid>

                <Grid item xs={8} className={classes.gridItem}>
                    <Paper className={classes.panel}>
                        <Questionnaire></Questionnaire>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}