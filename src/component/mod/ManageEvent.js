import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControlLabel, FormGroup, Snackbar, Switch, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Box from "@material-ui/core/Box";
import "date-fns"; // DO NOT REMOVE, OR YOU WILL BE DOOMED!
import DateFnsUtils from "@date-io/date-fns";
import {ModeratorService} from "../../service/ModeratorService";
import {Alert} from "@material-ui/lab";
import {delay} from "../../util/async";
import {useHistory} from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {},
    explanation: {
        marginBottom: theme.spacing(2),
    },
    formInput: {
        marginBottom: theme.spacing(2),
    },
    switchInput: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    dateInput: {
        marginTop: 0,
    },
    form: {
        display: "flex",
    },
    submitButton: {}
}));

const initialFormValues = {
    id: -1,
    title: null,
    details: null,
    date: new Date(),
    isOnline: false,
    location: null,
    utilLink: null,
}


export function ManageEvent() {
    const classes = useStyles();
    const history = useHistory();

    const [events, setEvents] = useState([initialFormValues]);
    const [selectedEvent, setSelectedEvent] = useState(initialFormValues);


    useEffect(()=> {
        ModeratorService.getEvents().then(response => {
            setEvents(response.data);
        })
    }, [])

    return (
        <Box>
            <Typography className={classes.explanation}>Edit this event for your sub-club.</Typography>

            <FormControl className={classes.form} variant="filled">
                <InputLabel >Select an Event to Edit</InputLabel>
                <Select
                    value={selectedEvent ?  selectedEvent.id : -1}
                    onChange={(e) => {
                        let id = e.target.value;
                        if (id !== -1) {
                            setSelectedEvent(events.find(e => e.id === id));
                            console.log(selectedEvent);
                        }else {
                            setSelectedEvent(initialFormValues);
                        }
                    }}
                >
                    <MenuItem key ={-1} value={-1}>
                        <em>None</em>
                    </MenuItem>

                    {events.map((event) => (
                        <MenuItem key={event ? event.id : -1} filled value={event ? event.id : -1}>{event.title}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            {selectedEvent.id === -1 ? null : 
                <FormGroup className={classes.form}>

                    <TextField
                        className={classes.formInput}
                        key="event title"
                        required
                        variant={"filled"}
                        onChange={() => {}}
                        value ={selectedEvent.title}
                        label = "Event title"
                    />

                    <TextField
                        className={classes.formInput}
                        key="event details"
                        required
                        variant={"filled"}
                        onChange={() => {}}
                        value ={selectedEvent.details}
                        label = "Event details"

                    />

                    <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        
                        className={classes.formInput}
                        key="{inputField.id}">
                        <KeyboardDateTimePicker
                            className={classes.dateInput}
                            disableToolbar
                            required
                            inputVariant={"filled"}
                            format="MM.dd.yyyy HH:mm"
                            margin="normal"
                            name="{inputField.name}"
                            label="Date and time"
                            value={selectedEvent.date}
                            onChange={(e) => {
                                let eventCopy = JSON.parse(JSON.stringify(selectedEvent)) 
                                eventCopy.date = e;

                                setSelectedEvent(eventCopy);

                                console.log("asfasf", e);
                                console.log("selec", selectedEvent);
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>


                    <Box className={classes.switchInput}>
                        <FormControlLabel
                            control={<Switch
                                        key="{inputField.id}"
                                        name="{inputField.name}"
                                        label="Will it be online?"
                                        color={"primary"}
                                        onChange={(e) => {
                                            console.log("Switch:", e.target.checked, typeof e.target.checked);
                                            e.target.value = e.target.checked;
                                            
                                        }}
                            />} label="Will it be online?"/>
                    </Box>
                    
                    <TextField
                        className={classes.formInput}
                        key="event location"
                        required
                        variant={"filled"}
                        onChange={() => {}}
                        value ={selectedEvent.location}
                        label = "Location of event"

                    />

                    <Button
                        className={classes.submitButton}
                        key={"submit"}
                        type="submit"
                        variant={"outlined"}
                        onClick={() =>{}}
                        >
                        EDIT EVENT
                    </Button>
                    <Button
                        className={classes.submitButton}
                        key={"delete"}
                        type="submit"
                        variant={"outlined"}
                        onClick={() =>{}}
                        disabled
                        >
                        DELETE EVENT
                    </Button>

                </FormGroup>

            }
            
        </Box>
    );
}
