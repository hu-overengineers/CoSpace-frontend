import React from "react";
import {Container, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Chip from '@material-ui/core/Chip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
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

function CreateClub() {
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

            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">Club Request</InputLabel>
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
                    <FormHelperText>Select a club request</FormHelperText>
                </FormControl>
            </div>

            <div>
                <TextField
                    fullWidth
                    id="standard-full-width"
                    label="Club Name"
                    style={{margin: 8}}
                    placeholder="Club name"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    value={clubName}
                    onChange={handleClubNameChange}
                />
            </div>

            <div>
                <TextField
                    id="standard-full-width"
                    label="Club Description"
                    style={{margin: 8}}
                    placeholder="Club description"
                    helperText="Description should include bla bla"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    value={clubDescription}
                    onChange={handleClubDescriptionChange}
                />
            </div>

            <div className={classes.root}><Typography>Related Keywords</Typography></div>
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

                <div>
                    <IconButton aria-label="add" onClick={addTagClick}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </div>
                <div className={classes.tagText}>
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


            </div>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleClickOpen}
                >
                    Create
                </Button>
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
            </div>

        </Container>);

}


export default withRouter(CreateClub);