import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Question from "./Question";
import { Box, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(3),
    }
  }));


export default function Questionnaire() {
    const classes = useStyles();

    return (
        <Grid style={{padding:"10px", marginTop:"10px"}}>
          <Question  className={classes.root}/>
        </Grid>
    )
}
