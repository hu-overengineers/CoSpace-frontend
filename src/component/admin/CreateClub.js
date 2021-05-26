import React, {useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
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
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import CreateQuestionnaire from "../questionnaire/CreateQuestionnaire"
import {AdminService} from "../../service/AdminService";
import {ClubService} from "../../service/ClubService";
import Box from "@material-ui/core/Box";

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
    questionnaireDialog: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    selectFromReqs: {
        marginLeft: "5vh"
    }

}));

function CreateClub() {
    const classes = useStyles();
    const [canCreate, setCanCreate] = React.useState(false);

    // ------------------------ CREATE CLUB DIALOG ------------------------
    const [openClubDialog, setClubDialog] = React.useState(false);
    const [createClubName, setCreateClubName] = React.useState("");
    const [createClubDetails, setCreateClubDetails] = React.useState("");
    const [refreshClubsTrigger, setRefreshClubsTrigger] = React.useState(false);

    const handleCloseCreateClub = () => {
        setCreateClubDetails("")
        setCreateClubName("")

        setClubDialog(false);
    };

    const handleSubmitCreateClub = () => {
        AdminService.createClub(createClubName, createClubDetails).then((response) => {
            setRefreshClubsTrigger(!refreshClubsTrigger);
        })
        handleCloseCreateClub()
    };

    const onClubCreateNameChange = (event) => {
        setCreateClubName(event.target.value);
    }

    const onClubCreateDetailsChange = (event) => {
        setCreateClubDetails(event.target.value);
    }

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


    // ------------------------ REQUESTED/NEW SUBCLUBS ------------------------

    const [requests, setRequests] = React.useState([]);


    useEffect(() => {
        AdminService.getRequestedSubclubs().then((response) => {
            setRequests(response.data);
        })
    }, []);

    const [selectedSubClubRequest, setSelectedSubClubRequest] = React.useState({});
    const [subclubName, setSubclubName] = React.useState("");

    const handleClubRequestNameChange = (event) => {
        if (event.target.value === "" || event.target.value === undefined) {
            setClubName("")
            setSubclubName("")
            return
        }
        const requestObj = JSON.parse(event.target.value)
        setSelectedSubClubRequest(requestObj);
        setSubclubName(requestObj.subClubName);
        if (createdClubs.includes(requestObj.clubName)) {
            setClubName(requestObj.clubName);
        } else {
            setClubName("")
        }
    };

    const handleSubClubNameTextChange = (event) => {
        setSubclubName(event.target.value)
        if (!(requests.map((req) => {
            return req.subClubName
        }).includes(event.target.value))) {
        }
    }

    // ------------------------ CLUBS ------------------------
    const [createdClubs, setCreatedClubs] = React.useState([]);
    const [clubName, setClubName] = React.useState("");

    useEffect(() => {
        ClubService.getClubs().then((response) => {
            setCreatedClubs(response.data.map((clb) => {
                return clb.name
            }));
        })
    }, [refreshClubsTrigger]);


    const handleClubNameChange = (event) => {
        setClubName(event.target.value);
    };

    // ------------------------ SUBCLUB DETAILS ------------------------
    const [subclubDescription, setSubClubDescription] = React.useState("");

    const handleClubDescriptionChange = (event) => {
        setSubClubDescription(event.target.value);
    };

    // ------------------------ KEYWORDS ------------------------
    const [chipData, setChipData] = React.useState([]);

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


    useEffect(() => {
        if (questions.length >= 3 && subclubName !== "" && clubName !== "" && subclubDescription !== "") {
            setCanCreate(true);
        } else {
            setCanCreate(false)
        }
    }, [questions, subclubName, clubName, subclubDescription])


    const handleSubmitCreation = (event) => {
        const createObject = {
            name: subclubName,
            parentName: clubName,
            questions: questions,
            details: subclubDescription
        }
        AdminService.createSubClub(createObject).then((response) => {
            console.log(response.data);
        })

    }


    return (
        <Box>

            <Dialog open={openClubDialog} onClose={handleCloseCreateClub} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new parent club</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new club to this website, please enter a club name and a club description.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Club name"
                        onChange={onClubCreateNameChange}
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Club description"
                        onChange={onClubCreateDetailsChange}
                        type="email"

                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateClub} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={createClubName === "" || createClubDetails === ""}
                            onClick={handleSubmitCreateClub} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>


            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Sub-club requests</InputLabel>
                                <Select
                                    onChange={handleClubRequestNameChange}>
                                    <option aria-label="None" value=""/>
                                    {requests.map((req, i) => (
                                        <option key={i}
                                                value={JSON.stringify(req)}>{req.clubName} / {req.subClubName}</option>
                                    ))}
                                </Select>
                                <FormHelperText>Select a sub-club request</FormHelperText>
                            </FormControl>
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={5} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <FormControl className={classes.formControl}>
                            <InputLabel>A parent club</InputLabel>
                            <Select
                                required
                                onChange={handleClubNameChange}
                                value={clubName}
                            >
                                <option aria-label="None" value=""/>
                                {createdClubs.map((clb, i) => (
                                    <option key={i} value={clb}>{clb}</option>
                                ))}
                            </Select>
                            <FormHelperText>Select a parent club or add a new one</FormHelperText>
                        </FormControl>
                    </Container>
                </Grid>
                <Grid item xs={1} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <IconButton aria-label="add" onClick={() => {
                        setClubDialog(true)
                    }}>
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
                                label="Sub-club name"
                                style={{margin: 8}}
                                placeholder="Sub-club name"
                                margin="normal"
                                InputLabelProps={{shrink: true,}}
                                value={subclubName}
                                onChange={handleSubClubNameTextChange}
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
                                label="Sub-club description"
                                style={{margin: 8}}
                                placeholder="Sub-club description"
                                helperText="Description should include bla bla"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true,}}
                                value={subclubDescription}
                                onChange={handleClubDescriptionChange}
                            />
                        </div>
                    </Container>
                </Grid>
                {/*<Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>*/}
                {/*    <div className={classes.root}><Typography>Related keywords</Typography></div>*/}
                {/*    <Container>*/}
                {/*        <div className={classes.root}>*/}

                {/*            {(chipData.length === 0 && (*/}
                {/*                <Chip*/}
                {/*                    label="Empty"*/}
                {/*                    className={classes.chip}/>))}*/}

                {/*            {chipData.map((data) => {*/}
                {/*                return (*/}
                {/*                    <li key={data.key}>*/}
                {/*                        <Chip*/}
                {/*                            label={data.label}*/}
                {/*                            onDelete={handleChipDelete(data)}*/}
                {/*                            className={classes.chip}*/}
                {/*                        />*/}
                {/*                    </li>*/}
                {/*                );*/}
                {/*            })}*/}
                {/*        </div>*/}
                {/*    </Container>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={5} style={{maxHeight: '100vh', overflow: 'auto'}}>*/}
                {/*    <Typography className={classes.root}>Add new keyword</Typography>*/}
                {/*    <Container>*/}
                {/*        <div>*/}
                {/*            <TextField*/}
                {/*                placeholder="some-tag"*/}
                {/*                className={clsx(classes.margin, classes.textField)}*/}
                {/*                InputProps={{*/}
                {/*                    startAdornment: <InputAdornment position="start">#</InputAdornment>,*/}
                {/*                }}*/}
                {/*                value={tag}*/}
                {/*                onChange={handleTagTextFieldChange}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </Container>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={1}>*/}
                {/*    <Container>*/}
                {/*        <IconButton aria-label="add" onClick={addTagClick}>*/}
                {/*            <AddCircleOutlineIcon/>*/}
                {/*        </IconButton>*/}
                {/*    </Container>*/}

                {/*</Grid>*/}
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleClickOpenQuestionnaireDialog}
                        >
                            Add a questionnaire
                        </Button>

                        {((questions.length < 3) &&
                            <p style={{marginTop: "5px"}}>Please add {Math.max(0, 3 - questions.length)} or more
                                Questions</p>)}

                        <Dialog
                            open={openQuestionnaireDialog} onClose={handleClickCloseQuestionnaireDialog}
                            aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={"md"}>
                            <DialogTitle id="form-dialog-title">Create a questionnaire</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To add a new sub-club to this website, please create a questionnaire;
                                </DialogContentText>

                                <CreateQuestionnaire onSubmitTrigger={submitQuestionnaireTrigger}
                                                     oldQuestions={questions} callBackQuestions={setQuestions}/>


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
                            disabled={!canCreate}
                            onClick={handleSubmitCreation}
                        >
                            Create
                        </Button>
                    </Container>
                </Grid>
            </Grid>


        </Box>);

}


export default CreateClub;