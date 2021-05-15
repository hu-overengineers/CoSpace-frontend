import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import AllClubs from "../component/AllClubs";
import Questionnaire from '../component/Questionnaire';


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        padding: theme.spacing(3)
    },
    gridItem: {
      padding: theme.spacing(3),
      marginTop:theme.spacing(3),
    },
    panel: {
    }
  }));

export default function EnrollPage() {
    const classes = useStyles();


    return (
        <div>
            <Grid container  spacing={3} className={classes.gridContainer} style={{ backgroundColor: '#cfe8fc'}}>
                <Grid item xs={6} className={classes.gridItem}>
                    <Paper className={classes.panel}>
                        <AllClubs></AllClubs>
                    </Paper>
                </Grid>

                <Grid item xs={6} className={classes.gridItem}>
                    <Paper className={classes.panel}>
                        <Questionnaire></Questionnaire>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}