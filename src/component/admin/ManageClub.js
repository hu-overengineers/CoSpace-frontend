import React, { useEffect, useState } from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import { ClubService } from "../../service/ClubService";
import CreateQuestionnaire from "../questionnaire/CreateQuestionnaire";
import {AdminService} from "../../service/AdminService";
import { Button,Chip,Container, Dialog, DialogActions,DialogContent,DialogContentText,
        DialogTitle,FormControl,FormHelperText, Grid,IconButton,InputAdornment,
        NativeSelect,TextField,Typography,useMediaQuery} from "@material-ui/core";

import {delay} from "../../util/async";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    tagText: {
        display: 'flex',
        width: 100,
        flexWrap: 'wrap',
    },

}));

function ManageClub() {
    const classes = useStyles();

    const [isVisible, setIsVisible] = React.useState(false);


    // Dialog ----------------------------------
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const editAndSubmit = () =>{
        let selectedClubCopy = JSON.parse(JSON.stringify(selectedClub)) 
        selectedClubCopy.questions = questions;
        setSelectedClub(selectedClubCopy);    


        const createObject = {
            id : selectedClub.id,
            name: selectedClub.name,
            parentName: selectedClub.parentName,
            questions: questions,
            details: selectedClub.details
        }

        AdminService.updateSubClub(createObject).then((response) => {
           delay(2000).then(() => window.location.reload());
        })
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
    };

    // ------------------------ QUESTIONNAIRE ------------------------
    
    const [openQuestionnaireDialog, setQuestionnaireDialog] = React.useState(false);
    const [submitQuestionnaireTrigger, setSubmitQuestionnaireTrigger] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);

    const onSubmitQuestionnaire = () => {
        setSubmitQuestionnaireTrigger(!submitQuestionnaireTrigger);
        setQuestionnaireDialog(false);
    };

    const handleClickOpenQuestionnaireDialog = () => {
        setQuestionnaireDialog(true);
    };

    const handleClickCloseQuestionnaireDialog = () => {
        setQuestionnaireDialog(false);
    };

    const [subClubs, setSubClubs] = useState([]);
    useEffect(() => {
        ClubService.getSubClubs().then(response => {
            console.log("All subclasses", response.data);
            setSubClubs(response.data);
        })
    }, []);

    const [selectedClubRequestName, setSelectedClubRequestName] = React.useState("");
    const [selectedClub, setSelectedClub] = React.useState({
            created: "2021-05-26T14:43:28.090+00:00",
            details: "",
            id: 102,
            moderatorUsername: "",
            name: "",
            parentName: "",
            questions: [],
            rating: 0}
        );

    const handleClubRequestNameChange = (event) => {
        setSelectedClubRequestName(event.target.value);
        setSelectedClub(subClubs.filter(subclub => subclub.name === event.target.value)[0]);
        if (event.target.value === "") {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    const handleClubNameChange = (event) => {
        let selectedClubCopy = JSON.parse(JSON.stringify(selectedClub)) 
        selectedClubCopy.name = event.target.value;
        setSelectedClub(selectedClubCopy);
    };

    const handleClubDescriptionChange = (event) => {
        let selectedClubCopy = JSON.parse(JSON.stringify(selectedClub)) 
        selectedClubCopy.details = event.target.value;
        setSelectedClub(selectedClubCopy);
    };

    return (
        <Container>
            <Container>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-helper">Sub-Club</InputLabel>
                        <NativeSelect
                            value={selectedClubRequestName.name}
                            onChange={handleClubRequestNameChange}
                            inputProps={{
                                name: '',
                            }}>
                            <option aria-label="None" value=""/>

                            {subClubs.map((subClub) => (
                                <option value={subClub.name}>{subClub.name}</option>
                            ))}
                        </NativeSelect>
                        <FormHelperText>Select a sub-club to edit</FormHelperText>
                    </FormControl>
                </div>
            </Container>


            {isVisible ? <Grid container spacing={3}>
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    </Grid>
                    <Grid item xs={5} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    </Grid>
                    <Grid item xs={1} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    </Grid>

                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        <Container>
                            <div>
                                <TextField
                                    required
                                    fullWidth
                                    id="standard-full-width"
                                    label="Sub-Club Name"
                                    style={{margin: 8}}
                                    placeholder="Sub-Club name"
                                    margin="normal"
                                    InputLabelProps={{shrink: true,}}
                                    value={selectedClub ? selectedClub.name : ""}
                                    onChange={handleClubNameChange}
                                />
                            </div>
                        </Container>
                    </Grid>
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>

                        <Container>
                            <div>
                                <TextField
                                    required
                                    id="standard-full-width"
                                    label="Sub-Club Description"
                                    style={{margin: 8}}
                                    placeholder="Sub-Club description"
                                    helperText="Description should include bla bla"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{shrink: true,}}
                                    value={selectedClub ? selectedClub.details : ""}
                                    onChange={handleClubDescriptionChange}
                                />
                            </div>
                        </Container>
                    </Grid>
                    
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        <Container>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleClickOpenQuestionnaireDialog}
                        >
                            Create a new questionnaire
                        </Button>

                        {((questions.length < 3) && <p style={{marginTop:"5px"}}>Please add {Math.max(0, 3-questions.length)} or more Questions</p>)}

                        <Dialog 
                            open={openQuestionnaireDialog} onClose={handleClickCloseQuestionnaireDialog}
                            aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={"md"} >
                            <DialogTitle id="form-dialog-title">Create a new questionnaire</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To edit this sub-club, please create a new questionnaire;
                                </DialogContentText>

                                <CreateQuestionnaire onSubmitTrigger={submitQuestionnaireTrigger} oldQuestions={questions} callBackQuestions={setQuestions}/>


                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClickCloseQuestionnaireDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={onSubmitQuestionnaire} color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                        </Container>
                    </Grid>
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        <Container>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleClickOpen}
                            >
                                Apply
                            </Button>
                        </Container>
                    </Grid>

                    <Container>
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle
                                id="responsive-dialog-title">{"Create a club with the following information?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Typography>Club Name: {selectedClub.name}</Typography>
                                    <Typography>Club Description: {selectedClub.details} </Typography>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={editAndSubmit} color="primary" autoFocus>
                                    Apply changes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>

                </Grid>
                : null}


        </Container>);

}


export default ManageClub;