import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../component/Copyright";
import {useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";
import {delay} from "../util/async";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInPage() {
    const classes = useStyles();
    const history = useHistory()

    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    const [open, setSnackbarOpen] = React.useState(false);


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>

                <Avatar className={classes.avatar}> <LockOutlinedIcon/> </Avatar>
                <Typography component="h1" variant="h5"> Sign in </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username or email address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => {
                            // TODO: Accept email as well.
                            setUsername(event.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(event) => {
                            event.preventDefault();
                            console.log("Sign up button clicked.");
                            AuthService.login(username, password).then(r => {
                                console.log("Response: " + r.data.toString())

                                AuthService.saveJwtToken(r.data.toString());

                                setSnackbarOpen(true);

                                delay(1000).then(() => {
                                        history.push("/");
                                    }
                                );
                            })
                        }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/password-reset" variant="body2"> Forgot password? </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2"> {"Don't have an account? Sign up."} </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    Welcome back!
                </Alert>
            </Snackbar>
        </Container>
    );
}