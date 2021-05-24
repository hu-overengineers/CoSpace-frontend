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
import TextField from '@material-ui/core/TextField';


export default function EnrollPanel({open, setOpenDialog, club}) {

    const [nameValue, setNameValue] = useState("");
    const [nameEmpty, setNameEmpty] = useState(false);
    const [detailsEmpty, setDetailsEmpty] = useState(false);

    const handleDialogClose = (event) => {
        setOpenDialog(false);
    };

    const onNameChange = (event) => {
        if (nameValue === "") {
            setNameEmpty(true);
        }
        else{
            setNameEmpty(false);
        }
        console.log(event.target.value);
    }

    const onDetailsChange = (event) => {
        if (event.target.value === "") {
            setDetailsEmpty(true);
        }
        else{
            setDetailsEmpty(false);
        }
        console.log(event.target.value);
    }

    const handleSubmit = (event) => {
        console.log("asdsad");

    }



    return (
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title"
                fullWidth={true} maxWidth={"md"}>

                <DialogTitle id="form-dialog-title">Request SubClub for {club.name}</DialogTitle>
                <DialogContent >

                    <TextField
                            autoFocus
                            required
                            error={nameEmpty}
                            label="SubClub Name"
                            variant="outlined"
                            type="input"
                            onChange={onNameChange}
                            fullWidth
                            />
                    <TextField 
                        style={{marginTop:"5vh"}}
                        required
                        error={detailsEmpty}
                        id="outlined-multiline"
                        label="details"
                        multiline
                        rowsMax={4}
                        onChange={onDetailsChange}

                        variant="outlined"
                        fullWidth
                        />
                        

                </DialogContent>
                <DialogActions>
                            <Button 
                                onClick={handleDialogClose}
                                color="primary">
                                Exit
                            </Button>
                            {(!false && (
                                <Button
                                    onClick={handleSubmit}
                                    color="primary">
                                    Request
                                </Button>
                                ))}
                </DialogActions>
            </Dialog>

    )
}