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
}));


export default function AboutClub({clubname, description}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>

                    <Grid container >
                        <Grid key={1} item>
                            <Container><Avatar className={classes.large}>AD</Avatar> </Container>
                        </Grid>
                        <Grid key={2} item>
                            <Typography  variant="h6" >
                                {clubname}
                            </Typography>
                            
                        </Grid>
                    </Grid>
                    

                <Divider className={classes.divider}/>
                <Typography className={classes.sectionBody}>
                    {description}
                </Typography>
                <Divider className={classes.divider}/>
                
                <Grid container >
                        <Grid key={1} item>
                            <Container><CakeIcon/> </Container>
                            
                        </Grid>
                        <Grid key={2} item>
                            <Typography  variant="body1" >
                                {"Created Oct 28, 2008 "}
                            </Typography>
                            
                        </Grid>
                    </Grid>


            </Box>
        </Paper>
    );
}