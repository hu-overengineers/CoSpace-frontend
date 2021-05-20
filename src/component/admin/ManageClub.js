import React from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import {
    Container, Grid, TextField,Typography,Dialog,
    Button, DialogActions, DialogContent, 
    DialogContentText,DialogTitle,useMediaQuery,
    InputAdornment, IconButton, Chip, NativeSelect,
    FormControl, FormHelperText} from "@material-ui/core";


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

    // Dialog ----------------------------------
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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

    const [openQuestionary, setQuestionary] = React.useState(false);

    const handleClickOpenQuestionary = () => {
        setQuestionary(true);
    };

    const handleClickCloseQuestionary = () => {
        setQuestionary(false);
    };


    


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

    // ------------------------------------------------
    const [selectedClubRequestName, setSelectedClubRequestName] = React.useState("");

    const handleClubRequestNameChange = (event) => {
        setSelectedClubRequestName(event.target.value);
    };
    // ------------------------------------------------

    const [clubName, setClubName] = React.useState("");

    const handleClubNameChange = (event) => {
        setClubName(event.target.value);
    };

    // ------------------------------------------------
    const [clubDescription, setClubDescription] = React.useState("");

    const handleClubDescriptionChange = (event) => {
        setClubDescription(event.target.value);
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

            
            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        <Container>
                        <div>
                            <FormControl   className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">Sub-Club</InputLabel>
                                <NativeSelect
                                    value={selectedClubRequestName.name}
                                    onChange={handleClubRequestNameChange}
                                    inputProps={{
                                        name: '',
                                    }}>
                                    <option aria-label="None" value=""/>
                                    <option value={10}>Game</option>
                                    <option value={20}>GTA5</option>
                                </NativeSelect>
                                <FormHelperText>Select a sub-club to edit</FormHelperText>
                            </FormControl>
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={5} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                            <FormControl   className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">A Parent Club</InputLabel>
                                <NativeSelect
                                    value={selectedClubRequestName.name}
                                    onChange={handleClubRequestNameChange}
                                    inputProps={{
                                        name: '',
                                    }}>
                                    <option aria-label="None" value=""/>
                                    <option value={10}>Parent 1</option>
                                    <option value={20}>Parent 2</option>
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
                                label="New Sub-Club Name"
                                style={{margin: 8}}
                                placeholder="Sub-Club name"
                                margin="normal"
                                InputLabelProps={{shrink: true,}}
                                value={clubName}
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
                                label="New Sub-Club Description"
                                style={{margin: 8}}
                                placeholder="Sub-Club description"
                                helperText="Description should include bla bla"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true,}}
                                value={clubDescription}
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
                            <div >
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
                <Grid item xs={1} >
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
                            onClick={handleClickOpenQuestionary}
                        >
                            Edit questionary
                        </Button>
                        <Dialog open={openQuestionary} onClose={handleClickCloseQuestionary} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Create a questionary</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To add a new sub-club to this website, please create a questionary;
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="some label"
                                    type="email"
                                    fullWidth
                                />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClickCloseQuestionary} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClickCloseQuestionary} color="primary">
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
                                <Typography>Club Name: {clubName}</Typography>
                                <Typography>Club Description: {clubDescription} </Typography>
                                <Typography>Related Keywords: {chipData.map((chip) => (
                                    chip.label + " "
                                ))}</Typography>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Container>

            </Grid>

            




        </Container>);

}



export default ManageClub;