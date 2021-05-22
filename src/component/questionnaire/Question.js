import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import QuestionLayout from "../../layout/QuestionLayout";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";


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


function AnswerButton({id, answerText, disable, locked, callBack}){
    return (
        <Button size="medium"
        variant={(locked) ? "contained" : "outlined"}
        color="primary"
        fullWidth={true}
        disabled={disable && !locked}
        onClick={() => {callBack(id)}}
        disableElevation>{answerText}</Button>
    )
}

export default function Question({question, answers}) {
    const classes = useStyles();
    const [locked, setLocked] = React.useState([false, false, false, false]);
    const [disable, setDisable] = React.useState(false);

    function handleClubTreeItemClick(givenAnswerId) {
        let temp_locked = [...locked];
        temp_locked[givenAnswerId] = true;
        setLocked(temp_locked);
        setDisable(true);
    }

    return (
        <QuestionLayout
            question={<Paper className={classes.paper}> qweqweqew </Paper>}
            answer1={<AnswerButton id={0} answerText="ans1" callBack={handleClubTreeItemClick} locked={locked[0]} disable={disable}/>}
            answer2={<AnswerButton id={1} answerText="ans2" callBack={handleClubTreeItemClick} locked={locked[1]} disable={disable}/>}
            answer3={<AnswerButton id={2} answerText="ans3" callBack={handleClubTreeItemClick} locked={locked[2]} disable={disable}/>}
            answer4={<AnswerButton id={3} answerText="ans4" callBack={handleClubTreeItemClick} locked={locked[3]} disable={disable}/>}

        />
    )
}