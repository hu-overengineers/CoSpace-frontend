import React from "react";
import {Container,  Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

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
  }));

function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}

export default function ReportedMembers() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);

    const [selectedMemberName, setSelectedMemberName] = React.useState("");
  
    const handleMemberNameChange = (event) => {
        setSelectedMemberName(event.target.value);
    };

    return (
    <Container>
        
            <Typography>Reported Members</Typography>

            <div> 
                <FormControl  className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">Member Reported</InputLabel>
                    <NativeSelect
                        value={selectedMemberName.name}
                        onChange={handleMemberNameChange}
                        inputProps={{
                            name: '',
                        }}>
                        <option aria-label="None" value="" />
                        <option value={10}>John</option>
                        <option value={20}>Steve</option>
                    </NativeSelect>
                    <FormHelperText>Select a reported member</FormHelperText>
                </FormControl>
            </div>
            


            <div className={classes.demo}>
                <Typography>Reasons of Reports</Typography>

                <List dense={dense}>
                {generate(
                    <ListItem>
                        <ListItemText
                            primary="Some report reason"
                        />
                         <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                        <Divider variant="inset" component="li" />
                    </ListItem>,
                    
                )}
                </List>
            </div>

    </Container>);
}