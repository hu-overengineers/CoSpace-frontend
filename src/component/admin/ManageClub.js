import React, { useEffect, useState } from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import {
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    NativeSelect,
    TextField,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { ClubService } from "../../service/ClubService";
import CreateQuestionnaire from "../questionnaire/CreateQuestionnaire";
import {AdminService} from "../../service/AdminService";


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
        const createObject = {
            id : selectedClub.id,
            name: selectedClub.name,
            parentName: selectedClub.parentName,
            questions: selectedClub.questions,
            details: selectedClub.details
        }

        console.log(createObject);

        AdminService.updateSubClub(createObject).then((response) => {
            console.log("update", response.data);
        })
        
        // call update club
        setOpen(false);
    }
    const handleClose = () => {
        // call update club
        setOpen(false);
    };

    // 
    const [openCreateClub, setCreateClub] = React.useState(false);

    const handleClickOpenCreateClub = () => {
        setCreateClub(true);
    };

    const handleCloseCreateClub = () => {
        setCreateClub(false);
    };
    // ------------------------------------------------


    // ------------------------ QUESTIONNAIRE ------------------------
    const [openClubDialog, setClubDialog] = React.useState(false);

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
        let selectedClubCopy = JSON.parse(JSON.stringify(selectedClub)) 
        selectedClubCopy.questions = questions;
        setSelectedClub(selectedClubCopy);    
        setQuestionnaireDialog(false);

    };

    const [openQuestionary, setQuestionary] = React.useState(false);


    // ------------------------------------------------
    const [chipData, setChipData] = React.useState([
        {key: 0, label: 'game'},
        {key: 1, label: 'gta5'},
        {key: 2, label: 'video-game'},
    ]);

    const handleChipDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    // ------------------------------------------------

    const [tag, setTag] = React.useState("");

    const handleTagTextFieldChange = (event) => {
        setTag(event.target.value);
    };

    const addTagClick = () => {
        const newChips = [];
        var i;
        var flag = false;
        for (i = 0; i < chipData.length; i++) {
            if (chipData[i].label === tag) {
                flag = true;
            }
            chipData[i].key = i;
            newChips.push(chipData[i]);
        }
        if (flag) {

        } else {
            newChips[i] = {key: i, label: tag};
        }
        setChipData(newChips);
    };

    const [subClubs, setSubClubs] = useState([]);
    useEffect(() => {
        ClubService.getSubClubs().then(response => {
            console.log(response.data);
            setSubClubs(response.data);
        })
    }, []);

    // ------------------------------------------------
    const [selectedClubRequestName, setSelectedClubRequestName] = React.useState("");
    const [selectedClub, setSelectedClub] = React.useState(null);

    const handleClubRequestNameChange = (event) => {
        setSelectedClubRequestName(event.target.value);
        console.log("val", event.target.value);

                
        setSelectedClub(subClubs.filter(subclub => subclub.name === event.target.value)[0]);
        console.log("selected club", subClubs.filter(subclub => subclub.name === event.target.value)[0])

        
        
        //let selectedClubCopy = JSON.parse(JSON.stringify(selectedClub)) 
        //selectedClubCopy.parentName = event.target.value;
        //setSelectedClub(selectedClubCopy);    
        


        if (event.target.value === "") {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };
    // ------------------------------------------------

    const [clubName, setClubName] = React.useState("");

    const handleClubNameChange = (event) => {
        let selectedClubCopy = JSON.parse(JSON.stringify(selectedClub)) 
        selectedClubCopy.name = event.target.value;
        setSelectedClub(selectedClubCopy);
        //setClubName(event.target.value);
    };

    // ------------------------------------------------
    const [clubDescription, setClubDescription] = React.useState("");

    const handleClubDescriptionChange = (event) => {
        let selectedClubCopy = JSON.parse(JSON.stringify(selectedClub)) 
        selectedClubCopy.details = event.target.value;
        setSelectedClub(selectedClubCopy);
        //setClubDescription(event.target.value);
    };



    return (


        <Container>

            <Dialog open={openCreateClub} onClose={handleCloseCreateClub} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new parent club</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new club to this website, please enter a club name and a club description.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Club Name"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Club Description"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateClub} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseCreateClub} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

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
                        <Container>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">A Parent Club</InputLabel>
                                <NativeSelect
                                    value={selectedClub.parentName}
                                    onChange={handleClubRequestNameChange}
                                    inputProps={{
                                        name: '',
                                    }}>
                                    <option aria-label="None" value=""/>
                                    {subClubs.map((subClub) => (
                                        <option value={subClub.parentName}>{subClub.parentName}</option>
                                    ))}
                                    
                               
                                </NativeSelect>
                                <FormHelperText>Select a parent club or add a new one</FormHelperText>
                            </FormControl>
                        </Container>
                    </Grid>
                    <Grid item xs={1} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        <IconButton aria-label="add" onClick={handleClickOpenCreateClub}>
                            <AddCircleOutlineIcon/>
                        </IconButton>

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
                                    value={selectedClub.name}
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
                                    value={selectedClub.details}
                                    onChange={handleClubDescriptionChange}
                                />
                            </div>
                        </Container>
                    </Grid>
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        <div className={classes.root}><Typography>Related Keywords</Typography></div>
                        <Container>
                            <div className={classes.root}>
                                {chipData.map((data) => {
                                    return (
                                        <li key={data.key}>
                                            <Chip
                                                label={data.label}
                                                onDelete={handleChipDelete(data)}
                                                className={classes.chip}
                                            />
                                        </li>
                                    );
                                })}
                            </div>
                        </Container>
                    </Grid>

                    <Grid item xs={5} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        <Typography className={classes.root}>Add New Keyword</Typography>
                        <Container>
                            <div>
                                <TextField
                                    placeholder="some-tag"
                                    className={clsx(classes.margin, classes.textField)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                    }}
                                    value={tag}
                                    onChange={handleTagTextFieldChange}
                                />
                            </div>
                        </Container>
                    </Grid>
                    <Grid item xs={1}>
                        <Container>
                            <IconButton aria-label="add" onClick={addTagClick}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
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
                            Edit  questionnaire
                        </Button>

                        {((questions.length < 3) && <p style={{marginTop:"5px"}}>Please add {Math.max(0, 3-questions.length)} or more Questions</p>)}

                        <Dialog 
                            open={openQuestionnaireDialog} onClose={handleClickCloseQuestionnaireDialog}
                            aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={"md"} >
                            <DialogTitle id="form-dialog-title">Edit questionnaire</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To edit this sub-club to this website, please edit this questionnaire;
                                </DialogContentText>

                                <CreateQuestionnaire onSubmitTrigger={submitQuestionnaireTrigger} oldQuestions={selectedClub.questions} callBackQuestions={setQuestions}/>


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
                                    <Typography>Related Keywords: {chipData.map((chip) => (
                                        chip.label + " "
                                    ))}</Typography>

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={editAndSubmit} color="primary" autoFocus>
                                    Edit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>

                </Grid>
                : null}


        </Container>);

}


export default ManageClub;