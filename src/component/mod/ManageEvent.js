import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControlLabel, FormGroup,  Switch, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Box from "@material-ui/core/Box";
import "date-fns"; // DO NOT REMOVE, OR YOU WILL BE DOOMED!
import DateFnsUtils from "@date-io/date-fns";
import {ModeratorService} from "../../service/ModeratorService";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {DeleteForever,  Update} from "@material-ui/icons";
import {delay} from "../../util/async";


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
    submitButton: {
        marginBottom: theme.spacing(2)
    }
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

    const [events, setEvents] = useState([initialFormValues]);
    const [selectedEvent, setSelectedEvent] = useState(initialFormValues);
    const [eventChanged, setEventChanged] = useState(false);


    useEffect(()=> {
        ModeratorService.getEvents().then(response => {
            setEvents(response.data);
        })
    }, [])

    return (
        <Box>
            <Typography className={classes.explanation}>Edit this event for your sub-club.</Typography>

            <FormControl className={classes.form} variant="filled">
                <InputLabel >Select an event to edit</InputLabel>
                <Select className={classes.formInput}
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
                        onChange={(e) => {
                            let eventCopy = JSON.parse(JSON.stringify(selectedEvent)) 
                            eventCopy.title = e.target.value;
                            setSelectedEvent(eventCopy);
                        }}
                        disabled={eventChanged}
                        value ={selectedEvent.title}
                        label = "Event title"
                    />

                    <TextField
                        className={classes.formInput}
                        key="event details"
                        required
                        variant={"filled"}
                        disabled={eventChanged}
                        onChange={(e) => {
                            let eventCopy = JSON.parse(JSON.stringify(selectedEvent)) 
                            eventCopy.details = e.target.value;
                            setSelectedEvent(eventCopy);
                        }}
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
                            disabled={eventChanged}
                            onChange={(date) => {
                                let eventCopy = JSON.parse(JSON.stringify(selectedEvent)) 
                                eventCopy.date = date;
                                setSelectedEvent(eventCopy);
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
                                        disabled={eventChanged}
                                        onChange={(e) => {
                                            e.target.value = e.target.checked;
                                            let eventCopy = JSON.parse(JSON.stringify(selectedEvent)) 
                                            eventCopy.isOnline = e.target.value;
                                            setSelectedEvent(eventCopy);
                                        }}
                            />} label="Will it be online?"/>
                    </Box>

                    <TextField
                        className={classes.formInput}
                        key="event location"
                        required
                        variant={"filled"}
                        disabled={eventChanged}
                        onChange={(e) => {
                            let eventCopy = JSON.parse(JSON.stringify(selectedEvent))
                            eventCopy.location = e.target.value;
                            setSelectedEvent(eventCopy);
                        }}
                        value ={selectedEvent.location}
                        label = "Location of event"

                    />

                    <TextField
                        className={classes.formInput}
                        key="event util link"
                        required
                        variant={"filled"}
                        disabled={eventChanged}
                        onChange={(e) => {
                            let eventCopy = JSON.parse(JSON.stringify(selectedEvent))
                            eventCopy.utilLink = e.target.value;
                            setSelectedEvent(eventCopy);
                        }}
                        value ={selectedEvent.utilLink}
                        label = "When2meet"

                    />

                    <Button
                        className={classes.submitButton}
                        key={"submit"}
                        type="submit"
                        variant={"outlined"}
                        disabled={eventChanged}
                        startIcon={<Update/>}
                        onClick={() =>{
                            console.log("event will be: ", selectedEvent);
                            ModeratorService.updateEvent(selectedEvent).then(response => {
                                console.log("Successfully updated:", response.data);
                                setEventChanged(true);
                                delay(2000).then(() => window.location.reload());
                            })
                        }}
                        >
                        EDIT EVENT
                    </Button>

                    <Button
                        className={classes.submitButton}
                        key={"delete"}
                        type="submit"
                        variant={"outlined"}
                        disabled={eventChanged}
                        startIcon={<DeleteForever/>}
                        onClick={() =>{
                            ModeratorService.deleteEvent(selectedEvent.id).then(response => {
                                console.log("Successfully deleted:", response.data);
                                setEventChanged(true);
                                delay(2000).then(() => window.location.reload());
                            })
                        }}
                        
                        >
                        DELETE EVENT
                    </Button>

                </FormGroup>

            }
            
        </Box>
    );
}
