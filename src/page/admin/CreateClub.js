import React from "react";
import {Container,  Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 500,
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
  }));

export default function CreateClub() {
    const classes = useStyles();

    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
      ]);
    
      const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };
    
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
      });
    
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };
    
    return (
        <div>
            <FormControl fullwidth className={classes.formControl}>
                <InputLabel htmlFor="age-native-helper">Club Request</InputLabel>

                <NativeSelect
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-native-helper',
                }}
                >
                <option aria-label="None" value="" />
                <option value={10}>Game</option>
                <option value={20}>GTA5</option>
                <option value={30}>GTA5 acin lutfen</option>
                </NativeSelect>
                <FormHelperText>Select a club request</FormHelperText>
            </FormControl>
            
            <TextField
                id="standard-full-width"
                label="Club Name"
                style={{ margin: 8 }}
                placeholder="Club name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                id="standard-full-width"
                label="Club Description"
                style={{ margin: 8 }}
                placeholder="Club description"
                helperText="Description should include bla bla"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />


<div><Paper component="ul" className={classes.root}>
        {chipData.map((data) => {
            let icon;

            if (data.label === 'React') {
            icon = <TagFacesIcon />;
            }

            return (
            <li key={data.key}>
                <Chip
                icon={icon}
                label={data.label}
                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                className={classes.chip}
                />
            </li>
            );
        })}
        </Paper></div>

        </div>

    );

}
