import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    question: {
        marginBottom:theme.spacing(1)
    }
  }));

  function Answer({children }) {
    return (
      <Grid item xs={12} sm={6} md={6}>
        {children}
      </Grid>
    );
  }

export default function QuestionLayout(props) {
    const classes = useStyles();
    return (
      <div>
        <Grid container spacing={1}>
            <Grid item sm={12} className={classes.question}>
                {props.question}
            </Grid>
            <Answer children={props.answer1} />
            <Answer children={props.answer2} />
            <Answer children={props.answer3} />
            <Answer children={props.answer4} />
        </Grid>
      </div>
    );
  }