import {Container, Divider, Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import CakeIcon from '@material-ui/icons/Cake';


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
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    dateCreatedContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
}));


export default function AboutClub({clubname, description, timeCreated, numberOfMembers, numberOfPostsInLastWeek}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>

                <Grid container>
                    <Grid key={1} item>
                        <Container><Avatar className={classes.large}> {clubname[0].toUpperCase()} </Avatar> </Container>
                    </Grid>
                    <Grid key={2} item>
                        <Typography variant="h6">
                            {clubname}
                        </Typography>
                    </Grid>
                </Grid>


                <Divider className={classes.divider}/>
                <Typography className={classes.sectionBody}>
                    {description}
                </Typography>
                <Divider className={classes.divider}/>

                <Grid container className={classes.divider} justify="center">
                    <Grid key={1} item>

                        <Container>
                            <Typography variant="h6">
                                {numberOfMembers}
                            </Typography>
                            <Typography variant="body1">
                                {"members"}
                            </Typography>
                        </Container>


                    </Grid>
                    {<Grid key={2} item>
                        <Container>
                            <Typography variant="h6">
                                {numberOfPostsInLastWeek}
                            </Typography>
                            <Typography variant="body1">
                                {"posts last week"}
                            </Typography>
                        </Container>
                    </Grid>}
                </Grid>

                <Divider className={classes.divider}/>
                <Grid container className={classes.dateCreatedContainer}>
                    <Grid key={1} item>
                        <Container><CakeIcon/> </Container>
                    </Grid>
                    <Grid key={2} item>
                        <Typography variant="body1">
                            {`Created, ${new Date(timeCreated).toLocaleString(navigator.language, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}`}
                        </Typography>
                    </Grid>
                </Grid>


            </Box>
        </Paper>
    );
}