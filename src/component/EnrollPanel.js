import React, {useEffect, useState} from 'react';
import {Button, Paper, Grid} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import AboutFeed from './AboutFeed';
import Box from '@material-ui/core/Box';
import Questionnaire from './questionnaire/Questionnaire';
import {Assignment} from "@material-ui/icons";
import {ClubService} from '../service/ClubService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MemberService} from "../service/MemberService";


function QuestionnaireEntrance() {
    return(
        <Box padding="50px">
            <p>For enrolling a subclub, you have to take the subclub questionnaire.</p>
            <p>If your score is higher than %50, then you can enroll.</p>
            <p>After reading the following rules, click to the next button for taking the questionnaire</p>

            <h3 style={{ paddingTop:"50px", paddingBottom:"20px"}}>Enterence Rules</h3>

            <ul>
                <li>Do not use internet or any other resources.</li>
                <li>Give answer for all the questions, empty answers will be considered as wrong.</li>
                <li>After submittion there will be not editing for answers.</li>
            </ul> 
        </Box>
    )
}

function PostQuestionnaire({score}) {
    score = parseInt(score.split(" ")[1])
    const enrolled = score >= 50;
    let bg_color;
    let result_text;
    if (enrolled) {
        bg_color = "greenyellow"
        result_text = "Congrats! You are successfully enrolled with score: "+score
    }
    else{
        bg_color = "#ff8a93"
        result_text = "Sorry, you failed with score: "+score

    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{height:"50vh"}}>
            <Paper elevation={3} variant="outlined" style={{width:"75%", textAlign:"center", padding:"50px", backgroundColor:bg_color}} >
                {result_text}
            </Paper>
        </Grid>
    )
}

export default function EnrollPanel({clickedSubClub, open, setOpenDialog, setEnrolled}) {
    const [onQuestionnaire, setOnQuestionnaire] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [givenAnswers, setGivenAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [enrollResponse, setEnrollResponse] = useState();


    let buttonText = "ENROLL (skip the Questionnaire for now)";


    useEffect(() => {
        ClubService.getSubClubQuestions(clickedSubClub.name).then((response) => {
            setQuestions(response.data);
        })
    },[])

    const handleDialogClose = (event) => {
        setOnQuestionnaire(false);
        setOpenDialog(false);

    };

    const handleNext = (event) => {
        if (!onQuestionnaire) {
            setOnQuestionnaire(true);
        }
        else{
            console.log("given answers on submit", givenAnswers);
            MemberService.enrollToSubClub(givenAnswers).then((response) => {
                console.log("Response: " + response.data);
                // delay(1000).then(() => {
                //     history.push("/")
                // })
                setEnrollResponse(response.data)
                setEnrolled(true);
            }).catch((err) => {
                if (err.response) {
                    // couldn't pass the questionnaire
                    console.log("Response: " + err.response.data);
                    setEnrollResponse(err.response.data)  
                    setEnrolled(false);  
                }
            }).finally(() => {
                setSubmitted(true);
            })
        }

    }



    return (
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title"
                fullWidth={true} maxWidth={"md"}>

                <DialogTitle id="form-dialog-title">Enrolling to {clickedSubClub.name}</DialogTitle>
                <DialogContent style={{height: '600px'}}>
                        {(!onQuestionnaire) && <QuestionnaireEntrance/>}
                        {(onQuestionnaire) && 
                            <Box margin="10px">
                                {(!submitted) && <Questionnaire questions={questions} callBackOnAnswer={setGivenAnswers}/>}
                                {(submitted) && <PostQuestionnaire score={enrollResponse}/>}

                            </Box>
                        }
                        
                </DialogContent>
                <DialogActions>
                            <Button 
                                onClick={handleDialogClose}
                                color="primary">
                                Exit
                            </Button>
                            {(!submitted && (
                                <Button
                                    onClick={handleNext}
                                    color="primary">
                                    Next
                                </Button>
                                ))}
                </DialogActions>
            </Dialog>

    )
}