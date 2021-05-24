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


const useStyles = makeStyles((theme) => ({
    root: {},
    explanation: {
        marginBottom: theme.spacing(2),
    },
    formInput: {
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


const inputFields = [
    {
        name: "title",
        label: "Event title",
        id: "title",
        type: "text",
        required: true,
    },
    {
        name: "details",
        label: "Event details",
        id: "details-input",
        multiline: true,
        type: "text",
        required: true,
    },
    {
        name: "date",
        label: "Date and time",
        id: "date",
        type: "date",
        required: true,
    },
    {
        name: "isOnline",
        label: "Will it be online?",
        id: "is-online",
        type: "switch",
        required: true,
    },
    {
        name: "location",
        conditionalLabel: {
            condition: "isOnline",
            correct: "URL of the event medium",
            wrong: "Location of the event"
        },
        id: "location",
        type: "text",
        required: true,
    },
];


const initialFormValues = {
    title: null,
    details: null,
    date: new Date(),
    isOnline: false,
    location: null,
    utilLink: null,
}


export function CreateEvent() {
    const classes = useStyles();
    const history = useHistory();

    // We'll update "values" as the form updates
    const [values, setValues] = useState(initialFormValues);
    // "errors" is used to check the form for errors
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = values) => {
        // this function will check if the form values are valid
        let errorsUpdate = {...errors}

        const requiredFields = inputFields.filter(input => input.required).map(input => input.name);

        requiredFields.forEach((name) => {
            if (name in fieldValues)
                errorsUpdate[name] = fieldValues[name] ? "" : "This field is required."
        });

        setErrors({
            ...errorsUpdate
        });
    }

    const handleInputValue = (e = values) => {
        // this function will be triggered by the text field's onBlur and onChange events
        console.log("Input event:", e);
        const {name, value} = e.target;
        console.log("Handle input value:", name, value);
        setValues({
            ...values,
            [name]: value
        });
        validate({[name]: value});
    }

    const handleFormSubmit = (e) => {
        // this function will be triggered by the submit event
        console.log("Creating event:", values);
        ModeratorService.createEvent(
            values.title,
            values.details,
            values.date.toISOString(),
            values.isOnline === "true",
            values.location,
            values.utilLink,
        ).then(response => {
            console.log("Event created:", response);
            setSnackbarSeverity("success");
            setSnackbarMessage("Event successfully created!");
            setSnackbarOpen(true);
            delay(5000).then(() => history.push("/feed/Popular"));
        }).catch(error => {
            console.error("Error while creating event:", error);
            setSnackbarSeverity("error");
            setSnackbarMessage("Something is wrong. " + error);
            setSnackbarOpen(true);
        });
    }

    const formIsValid = (fieldValues = values) => {
        // this function will check if the form values are valid and return a boolean value

        const requiredFields = inputFields.filter(i => i.required).map(i => i.name);
        console.log("Required fields:", requiredFields);
        console.log("Is valid fields:", fieldValues);

        let isValid = true;
        requiredFields.forEach((name) => {
            isValid = isValid && (fieldValues[name] !== undefined && fieldValues[name] !== null);
        });

        isValid = isValid && Object.values(errors).every((x) => x === "");

        console.log("Is valid:", isValid);

        return isValid;
    }

    useEffect(() => {
        console.log("Values:", values);
    }, [values]);

    useEffect(() => {
        console.log("Errors:", errors);
    }, [errors]);

    // Snackbar
    const [openSnackbar, setSnackbarOpen] = React.useState(false);
    const [severity, setSnackbarSeverity] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("Welcome back!");

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box>
            <Typography className={classes.explanation}>Create an event for your sub-club.</Typography>
            <FormGroup className={classes.form}>
                {inputFields.map((inputField) => {
                    return (
                        (() => {
                            switch (inputField.type) {
                                case "text":
                                    return (
                                        <TextField
                                            className={classes.formInput}
                                            key={inputField.id}
                                            onBlur={handleInputValue}
                                            variant={"filled"}
                                            onChange={handleInputValue}
                                            required={inputField.required}
                                            name={inputField.name}
                                            label={inputField.conditionalLabel === undefined ? inputField.label :
                                                ((values[inputField.conditionalLabel.condition] === "true")
                                                    ? inputField.conditionalLabel.correct
                                                    : inputField.conditionalLabel.wrong)
                                            }
                                            multiline={inputField.multiline ?? false}
                                            rows={inputField.rows}
                                            autoComplete="none"
                                            {...(errors[inputField.name] && {
                                                error: true,
                                                helperText: errors[inputField.name]
                                            })}

                                        />);
                                case "date":
                                    return (
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                            name={inputField.name}
                                            className={classes.formInput}
                                            key={inputField.id}>
                                            <KeyboardDateTimePicker
                                                disableToolbar
                                                format="MM.dd.yyyy HH:mm"
                                                margin="normal"
                                                className={classes.dateInput}
                                                id={inputField.id}
                                                name={inputField.name}
                                                label={inputField.label}
                                                required={inputField.required}
                                                value={values[inputField.name]}
                                                inputVariant={"filled"}
                                                onChange={(date) => {
                                                    handleInputValue({target: {name: inputField.name, value: date}});
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                {...(errors[inputField.name] && {
                                                    error: true,
                                                    helperText: errors[inputField.name]
                                                })}
                                            />
                                        </MuiPickersUtilsProvider>);
                                case "switch":
                                    return (
                                        <Box className={classes.formInput}>
                                            <FormControlLabel
                                                control={<Switch
                                                    key={inputField.id}
                                                    id={inputField.id}
                                                    name={inputField.name}
                                                    label={inputField.label}
                                                    onChange={(e) => {
                                                        console.log("Switch:", e.target.checked, typeof e.target.checked);
                                                        e.target.value = e.target.checked;
                                                        handleInputValue(e);
                                                    }}
                                                    color={"primary"}
                                                />} label={inputField.label}/>
                                        </Box>
                                    );
                                default:
                                    return null;
                            }
                        })()
                    )
                })}
                <Button
                    className={classes.submitButton}
                    key={"submit"}
                    type="submit"
                    variant={"outlined"}
                    onClick={handleFormSubmit}
                    disabled={!formIsValid()}>
                    CREATE EVENT
                </Button>
            </FormGroup>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
