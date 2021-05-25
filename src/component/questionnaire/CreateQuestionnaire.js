import React, {Fragment, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CreateQuestion from "./CreateQuestion";
import {Box, Button, Grid} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection:"column",
      height:"60vh",

    },
    questions: {

    },
    divider: {
        margin:theme.spacing(3)
    }
  }));


export default function CreateQuestionnaire({onSubmitTrigger, callBackQuestions, oldQuestions}) {
    const classes = useStyles();
    const [questionNum, setQuestinNum] = useState(1)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const newlist = questions.concat(oldQuestions)
        callBackQuestions(newlist)
    },[onSubmitTrigger])

    function isQuestionValid(questionObj){
        if (questionObj.content === "" || questionObj.answer1 === "" || questionObj.answer2 === "" ||
        questionObj.answer3 === "" || questionObj.answer4 === "" || questionObj.groundTruth === "") {
            return false
        }
        else {
            return true
        }
    }

    function saveQuestionObj(qid, questionObj) {
        if (!isQuestionValid(questionObj)) {
            return
        }
        const templist = [...questions];
        if(qid === questions.length) {
            templist.push(questionObj);
        }
        else {
            templist[qid] = questionObj
        }
        setQuestions(templist);
    }




    function addNewQuestion(event) {
        setQuestinNum(questionNum + 1);
    }

    return (
        <Grid className={classes.root}>

            
            <Box component="div"  overflow="visible" flexGrow={1} display="flex" flexDirection="column"  >
                <Fragment>
                {[...Array(questionNum)].map((quest, i) => {
                    return (<Box key={"q"+i.toString()}>
                        <h2>Question {i+1}</h2>
                        <CreateQuestion qid={i} callBackOnSave={saveQuestionObj}/>

                        {i+1 !== questionNum && (
                            <Divider className={classes.divider}/>
                        )}
                    </Box>)
                }
                )}
                </Fragment>
            </Box>

            <Button
                size="medium" style={{marginTop:"20px"}}
                variant="contained"
                color="primary"
                startIcon={<Add/>}
                onClick={(event) => {addNewQuestion(event)}}
                disableElevation>
            </Button>

        </Grid>
    )
}

