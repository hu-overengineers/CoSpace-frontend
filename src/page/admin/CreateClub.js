import React from "react";
import {Container,  Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Chip from '@material-ui/core/Chip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';

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
        flexWrap: 'wrap',
      },
  }));

export default function CreateClub() {
    const classes = useStyles();

    // ------------------------------------------------
    const [chipData, setChipData] = React.useState([
        { key: 0, label: '#game' },
        { key: 1, label: '#gta5' },
        { key: 2, label: '#video-game' },
        { key: 3, label: '#gta5-cospace' },
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
        // add tag to the chipData
    };

    // ------------------------------------------------
    const [selectedClubRequestName, setSelectedClubRequestName] = React.useState("");
  
    const handleClubRequestNameChange = (event) => {
        setSelectedClubRequestName(event.target.value);
    };
    // ------------------------------------------------
    

    return ( 
        <Container>
        
            <div> 
                <FormControl  className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">Club Request</InputLabel>
                    <NativeSelect
                        value={selectedClubRequestName.name}
                        onChange={handleClubRequestNameChange}
                        inputProps={{
                            name: '',
                        }}>
                        <option aria-label="None" value="" />
                        <option value={10}>Game</option>
                        <option value={20}>GTA5</option>
                        <option value={30}>GTA5 acin lutfen</option>
                    </NativeSelect>
                    <FormHelperText>Select a club request</FormHelperText>
                </FormControl>
            </div>

            <div>
                <TextField
                    fullWidth
                    id="standard-full-width"
                    label="Club Name"
                    style={{ margin: 8 }}
                    placeholder="Club name"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                />
            </div>
                    
            <div>
                <TextField
                    id="standard-full-width"
                    label="Club Description"
                    style={{ margin: 8 }}
                    placeholder="Club description"
                    helperText="Description should include bla bla"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
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
                        <AddCircleOutlineIcon />
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

        </Container>);

}
