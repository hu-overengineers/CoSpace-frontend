import React, {useEffect, useState} from 'react';
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {delay} from "../util/async";
import AboutClub from './AboutClub';
import Box from '@material-ui/core/Box';
import Questionnaire from './Questionnaire';
import { Button } from '@material-ui/core';
import {Assignment} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import { MemberService } from '../service/MemberService';


export default function EnrollPanel({clickedSubClub, alreadyEnrolled}){
    const [isQuest, setQuest] = useState(false);
    const [open, setSnackbarOpen] = useState(false);
    const [severity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("Welcome back!");
    const history = useHistory()
    let buttonText = "ENROLL (skip the Questionnaire for now)";


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    const onEnrollButtonClick = (event) => {
        setQuest(true);

        event.preventDefault();
        console.log("Enroll in button clicked.");
        // skip the Questionnaire for now
        MemberService.enrollToSubClub(clickedSubClub.name).then((response) => {
            console.log("Response: " + response.data);
            setSnackbarSeverity("success");
            setSnackbarMessage(response.data);
            setSnackbarOpen(true);

            delay(1000).then(() => {
                history.push("/")
            })
        }).catch(e => {
            setSnackbarSeverity("error");
            if (e.response.status === 401) {
                setSnackbarMessage("Entered credentials are incorrect.");
            } else {
                setSnackbarMessage("Something went wrong!");
            }
            setSnackbarOpen(true);
            delay(1000).then(() => {
                history.push("/")
            })
        })
    }


    if (clickedSubClub == undefined) {
        return <p>Click to a club</p>
    }
    else {
        if (!isQuest) {
            if(alreadyEnrolled){buttonText = "ALREADY ENROLLED";}
            return (
                <Box 
                    display="flex" flexDirection="column"
                    justifyContent="space-between" height="75vh">
                    
                    <AboutClub
                    clubname={clickedSubClub.name}
                    description={clickedSubClub.details}
                    timeCreated={clickedSubClub.created}
                    numberOfMembers={0}
                    numberOfPostsInLastWeek={0}/>
                    
                    <Button 
                        size="medium" style={{margin:"5px"}}
                        variant="contained"
                        color="primary"
                        startIcon={<Assignment/>}
                        onClick={(event) => {onEnrollButtonClick(event)}}
                        disabled={alreadyEnrolled}
                        disableElevation>
                        {buttonText}
                    </Button>
                
                </Box>
            )
        }
        else {
            return (
                <Box>
                    <Questionnaire></Questionnaire>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity={severity}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>)
        }    
    }

}