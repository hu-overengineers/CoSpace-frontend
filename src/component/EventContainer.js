import {Divider, List, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

export default function EventContainer({events}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <List>
                <Typography variant="h6" className={classes.root}>
                    Events
                </Typography>
                <Divider className={classes.divider}/>
                <Typography className={classes.root}>
                    {events}
                </Typography>
            </List>
        </Paper>
    );
}