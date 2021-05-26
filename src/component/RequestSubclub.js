import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { MemberService } from '../service/MemberService';
import {delay} from "../util/async";


export default function EnrollPanel({open, setOpenDialog, club}) {

    const [nameValue, setNameValue] = useState("");
    const [detailValue, setDetailValue] = useState("");
    const [nameEmpty, setNameEmpty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const handleDialogClose = (event) => {
        setOpenDialog(false);
    };

    const onNameChange = (event) => {
        setNameValue(event.target.value)
        setNameEmpty(false);
    }

    const onDetailsChange = (event) => {
        setDetailValue(event.target.value)
    }

    const handleSubmit = (event) => {
        if (nameValue === "" || nameValue === undefined) { 
            setNameEmpty(true);
            return
        }        
        MemberService.requestSubClub(club.name, nameValue, detailValue).then((response) => {
            console.log(response.data);
            setSubmitted(true);
            delay(1000).then(() => {
                setOpenDialog(false);
            })
        }).catch((err) => {
            console.log(err);
        })

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
                            label="Sub-club name"
                            variant="outlined"
                            type="input"
                            onChange={onNameChange}
                            fullWidth
                            />
                    <TextField 
                        style={{marginTop:"5vh"}}
                        id="outlined-multiline"
                        label="Details"
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
                            <Button
                                onClick={handleSubmit}
                                disabled={submitted}
                                color="primary">
                                Request
                            </Button>
                </DialogActions>
            </Dialog>

    )
}