import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Question from "./Question";
import {Box, Grid} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    questionBox: {
      margin: theme.spacing(5),
      marginTop: theme.spacing(0)
    },
    divider: {
      marginTop: theme.spacing(5)
    }
  }));


export default function Questionnaire({questions, callBackOnAnswer}) {
    const classes = useStyles();
    const [givenAnswers, setGivenAnswers] = useState(questions.map((q) => {return {id:q.id, groundTruth:"", parentName:q.parentName}}));

    useEffect(() => {
      // since the questionnaire is open once, pass the empty answers at the begenning
      callBackOnAnswer(givenAnswers);
    }, [])
    

    const handleQuestionAnswering = (question_id, newGivenAnswer) => {
      console.log(givenAnswers);
      let givenAnswerIndex = givenAnswers.findIndex(a => a.id == question_id)
      let givenAnswer = givenAnswers[givenAnswerIndex]
      givenAnswer.groundTruth = newGivenAnswer;
      const tempList = [...givenAnswers];
      tempList[givenAnswerIndex] = givenAnswer;
      setGivenAnswers(tempList);
      callBackOnAnswer(givenAnswers)
    }

    return (
        <Grid style={{ }}>
          {questions.map((quest, index) => {
              return (<Box className={classes.questionBox} key={"q"+index.toString()}>
                  <h2 style={{padding:"10px"}}>Question {index+1}</h2>
                  <Question question={quest} callBackOnChange={handleQuestionAnswering}/>
                  {index+1 != questions.length && (
                      <Divider className={classes.divider}/>
                  )}
              </Box>)
          }
          )}

        </Grid>
    )
}
