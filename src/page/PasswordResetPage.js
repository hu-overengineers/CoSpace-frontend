import React from "react";
import { useParams } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Snackbar} from "@material-ui/core";
import Copyright from "../component/common/Copyright";
import {Alert} from "@material-ui/lab";
import {delay} from "../util/async";
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';

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
    infoText: {
        marginTop: theme.spacing(3),
    },
}));


function TypeEmailPage() {

    const classes = useStyles();
    const history = useHistory()

    const [email, setEmail] = React.useState("");
    const [isSend, setIsSend] = React.useState(false);

    const [open, setSnackbarOpen] = React.useState(false);
    const [severity, setSnackbarSeverity] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("Welcome back!");


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline/>

        {isSend ? 
        
        <div className={classes.paper}>

            <Avatar className={classes.avatar}> <DoneOutlineOutlinedIcon/> </Avatar>
            <Typography component="h1" variant="h5"> Email sent successfully! </Typography>

            
            <Typography className={classes.infoText} component= "body2" align="center">
                A password reset link was sent. Click the link in the email to create a new password. 
                If you do not receive an email within 5 minutes, please click the re-send email link below.
            </Typography>


            <Container>
                <Grid container>
                    <Grid key={1} item>
                        <Container>
                            <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => {
                                        setIsSend(false);
                                        history.push("/password-reset");
                                    }}
                                >Re-send</Button>
                            </Container>
                    </Grid>
                    <Grid key={2} item>
                        <Container>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={(event) => {
                                        history.push("/");
                                    }}
                                >Back to Home</Button>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </div>
        :
        
        <div className={classes.paper}>

            <Avatar className={classes.avatar}> <VpnKeyOutlinedIcon/> </Avatar>
            <Typography component="h1" variant="h5"> Reset Password </Typography>

            
            <Typography className={classes.infoText} component= "body2" align="center">
                Enter your email address that you used to register. 
                We'll send you an email with your username and a link to reset your password.
            </Typography>

            <form className={classes.form} noValidate>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    className={classes.margin}
                    name="email"
                    id="email"
                    label="E-mail"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                        }}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(event) => {
                        event.preventDefault();
                        AuthService.resetPassword(email).then(r => {
                            console.log(r.data.message);
                            setSnackbarSeverity("success");
                            setSnackbarMessage(r.data.message);
                            setSnackbarOpen(true);

                            delay(200).then(() => {
                                setIsSend(true);
                            })
                        }).catch(e => {
                            setSnackbarSeverity("error");
                            if (e.response !== undefined && e.response.status === 401) {
                                setSnackbarMessage("Entered credentials are incorrect.");
                            } else {
                                setSnackbarMessage("Something went wrong!");
                            }
                            setSnackbarOpen(true);
                        })
                    }}
                >
                    Reset Password
                </Button>
            </form>
        </div>

        }

        <Box mt={8}>
            <Copyright/>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={severity}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </Container>
    )
}

function TypeNewPasswordPage(probs) {
    const token = probs.passwordResetToken;

    return (
        <div>
            Type new password with token {token}
        </div>
    )
}


function PasswordResetPage() {
    const {token} = useParams();
    return (
        <div>
            {token ? <TypeNewPasswordPage passwordResetToken = {token}/> : <TypeEmailPage/>} 
        </div>
    );
}

export default PasswordResetPage;