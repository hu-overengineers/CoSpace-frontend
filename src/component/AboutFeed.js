import {Container, Divider, Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import CakeIcon from '@material-ui/icons/Cake';
import {AuthService} from "../service/AuthService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {SupervisorAccount} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    feedNameContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    avatar: {
        color: theme.palette.getContrastText('#00e3aa'),
        backgroundColor: '#00e3aa',
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
    dateCreatedContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
}));


export default function AboutFeed({feedInfo, stats}) {
    const classes = useStyles();

    const history = useHistory();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>

                <Grid container>
                    <Grid key={1} item className={classes.avatarContainer}>
                        <Avatar className={classes.avatar}> {feedInfo.name[0].toUpperCase()} </Avatar>
                    </Grid>
                    <Grid key={2} item className={classes.feedNameContainer}>
                        <Typography variant="h5">
                            {feedInfo.name}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider className={classes.divider}/>

                <Typography className={classes.sectionBody}>
                    {feedInfo.details}
                </Typography>

                {(!feedInfo.isCustom) &&  // If it's not a custom feed like popular or random
                <Box>
                    {feedInfo.parentName &&  // If it's a sub-club
                    <Box>
                        <Divider className={classes.divider}/>

                        <Grid container justify="center">
                            <Grid key={1} item>
                                <Container>
                                    <Typography variant="h6">
                                        {stats ? stats.numberOfMembers : "0"}
                                    </Typography>
                                    <Typography variant="body1">
                                        {"members"}
                                    </Typography>
                                </Container>
                            </Grid>

                            {<Grid key={2} item>
                                <Container>
                                    <Typography variant="h6">
                                        {stats ? stats.numberOfPostsInLastWeek : "0"}
                                    </Typography>
                                    <Typography variant="body1">
                                        {"posts last week"}
                                    </Typography>
                                </Container>
                            </Grid>}
                        </Grid>
                    </Box>}

                    <Divider className={classes.divider}/>

                    <Grid container className={classes.dateCreatedContainer}>
                        <Grid key={1} item>
                            <Container><CakeIcon/> </Container>
                        </Grid>
                        <Grid key={2} item>
                            <Typography variant="body1">
                                {`Created, ${new Date(feedInfo.created).toLocaleString(navigator.language, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}`}
                            </Typography>
                        </Grid>
                    </Grid>

                    {feedInfo.moderatorUsername === AuthService.getUsername() &&
                    <Box>
                        <Divider className={classes.divider}/>

                        <Grid container className={classes.buttonContainer}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                                startIcon={<SupervisorAccount/>}
                                onClick={(event) => {
                                    history.push("/mod")
                                }}>
                                MODERATOR PANEL
                            </Button>
                        </Grid>
                    </Box>}
                </Box>}


            </Box>
        </Paper>
    );
}