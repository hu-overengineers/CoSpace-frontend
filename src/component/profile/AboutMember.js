import {Container, Divider, Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import CakeIcon from '@material-ui/icons/Cake';
import Button from "@material-ui/core/Button";
import {AuthService} from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import {PrivateMessagingService} from "../../service/PrivateMessagingService"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    sectionTitle: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sectionBody: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sectionRoot: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    avatarContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    usernameContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        color: theme.palette.getContrastText('#00e3aa'),
        backgroundColor: '#00e3aa',
    },
    buttonContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flexGrow: 1,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    dateRegisteredContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
}));


export default function AboutMember({hasCommonSubClub, isSelf, username, timeRegistered, numberOfPostsInLastWeek}) {
    console.log("Populating AboutMember section: " + username);
    const history = useHistory();

    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>

                <Grid container className={classes.usernameContainer}>
                    <Grid key={1} item className={classes.avatarContainer}>
                        <Avatar className={classes.avatar}> {username[0].toUpperCase()} </Avatar>
                    </Grid>
                    <Grid key={2} item>
                        <Typography variant="h5">
                            {username}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider className={classes.divider}/>

                <Grid container className={classes.divider} justify="center">
                    <Grid key={2} item>
                        <Container>
                            <Typography variant="h6">
                                {numberOfPostsInLastWeek}
                            </Typography>
                            <Typography variant="body1">
                                {"posts last week"}
                            </Typography>
                        </Container>
                    </Grid>
                </Grid>

                <Divider className={classes.divider}/>
                <Grid container className={classes.dateRegisteredContainer}>
                    <Grid key={1} item>
                        <Container><CakeIcon/> </Container>
                    </Grid>
                    <Grid key={2} item>
                        <Typography variant="body1">
                            {`Registered on ${new Date(timeRegistered).toLocaleString(navigator.language, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>
                
                {
                    isSelf ? null : 
                        <Grid container className={classes.buttonContainer}>
                            <Tooltip title= {!hasCommonSubClub ? "You are not a member of a common club or sub club!" : "Send a private message!"  }>
                                <span className={classes.buttonContainer}>
                                    <Button
                                        startIcon={<EmailOutlinedIcon />}
                                        disabled = {!hasCommonSubClub}
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => {
                                    
                                            PrivateMessagingService.send(username, "").then(response => {
                                                console.log(response.data);
                                                history.push("/pm");
                                            })
                                            
                                        }}
                                    >Send Message</Button>
                                </span>
                            </Tooltip>
                        </Grid>
                }


                {AuthService.getUsername() === username && <Box>
                    <Divider className={classes.divider}/>
                    <Grid container className={classes.buttonContainer}>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={(event) => {
                                AuthService.logout()
                                history.push("/sign-in")
                            }}
                        >
                            Logout
                        </Button>

                        {AuthService.getAuthRoles().includes("ADMIN") && <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            onClick={(event) => {
                                history.push("/admin")
                            }}
                        >
                            Admin Panel
                        </Button>}
                    </Grid>
                </Box>
                }

            </Box>
        </Paper>
    );
}