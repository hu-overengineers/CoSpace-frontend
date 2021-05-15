import React from "react";
import {Container,  Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Chip from '@material-ui/core/Chip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const [tag, setTag] = React.useState({
        tag: '',
      });
    
    const handleClose = () => {
        setOpen(false);
    };

    
     const handleTagChange = (event) => {
        setTag({
          [tag]: event.target.value,
        });
      };


    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'game' },
        { key: 1, label: 'gta5' },
        { key: 2, label: 'video-game' },
        { key: 3, label: 'gta5-cospace' },
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
        <Container>
        
            <div> 
                <FormControl fullwidth className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">Club Request</InputLabel>
                    <NativeSelect
                        value={state.age}
                        onChange={handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-helper',
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
                    id="standard-full-width"
                    label="Club Name"
                    style={{ margin: 8 }}
                    placeholder="Club name"
                    fullWidth
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

            <div className={classes.root}>
                {chipData.map((data) => {
                    return (
                    <li key={data.key}>
                        <Chip
                        label={data.label}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                        />
                    </li>
                    );
                })}
                <div>
                    <IconButton aria-label="delete" onClick={handleClickOpen}>
                        <AddCircleOutlineIcon />
                    </IconButton>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Related Keywords</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add a related keywords.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                onChange={handleTagChange}
                                id={tag}
                                label="Keyword"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>

        </Container>);

}
