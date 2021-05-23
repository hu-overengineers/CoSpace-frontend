import React, {useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import QuestionLayout from "../../layout/QuestionLayout";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.primary
    },
    question: {
        marginBottom:theme.spacing(1)
    }
  }));


function AnswerButton({id, answerText, locked, callBack}){
    return (
        <Button size="medium"
        variant={(locked) ? "contained" : "outlined"}
        color="primary"
        fullWidth={true}
        // disabled={disable && !locked}
        onClick={() => {callBack(id)}}
        disableElevation>{answerText}</Button>
    )
}

export default function Question({question, callBackOnChange}) {
    const classes = useStyles();
    const [locked, setLocked] = React.useState([false, false, false, false]);
    const [givenAnswerId, setGivenAnswerId] = React.useState();

    useEffect(() => {
        if (givenAnswerId === undefined) {
            return;
        }
        callBackOnChange(question.id, question["answer"+(givenAnswerId+1).toString()]);
    }, [givenAnswerId])

    function handleAnswerClick(newGivenAnswerId) {
        let temp_locked = [...locked];
        temp_locked[newGivenAnswerId] = true;
        // if any previous answer
        if(givenAnswerId !== newGivenAnswerId){
            temp_locked[givenAnswerId] = false;
        }
        setLocked(temp_locked);
        setGivenAnswerId(newGivenAnswerId);
    }

    return (
        <QuestionLayout
            question={<Paper elevation={3} variant="outlined" className={classes.paper}> {question.content} </Paper>}
            answer1={<AnswerButton id={0} answerText={question.answer1} callBack={handleAnswerClick} locked={locked[0]}/>}
            answer2={<AnswerButton id={1} answerText={question.answer2} callBack={handleAnswerClick} locked={locked[1]}/>}
            answer3={<AnswerButton id={2} answerText={question.answer3} callBack={handleAnswerClick} locked={locked[2]}/>}
            answer4={<AnswerButton id={3} answerText={question.answer4} callBack={handleAnswerClick} locked={locked[3]}/>}
        />
    )
}