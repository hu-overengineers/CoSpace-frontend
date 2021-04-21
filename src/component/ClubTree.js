import {Divider, List, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";


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


export default function ClubTree({clubs}) {
    const classes = useStyles();

    return (
        <Box>
            {/* TODO: Refactor this into a Component named something like "ClubTree" */}
            <Paper variant="outlined">
                <List>
                    <Typography variant="h6" className={classes.root}>
                        Clubs and Sub-clubs
                    </Typography>
                    <Divider className={classes.divider}/>
                    {clubs}
                </List>
            </Paper>
        </Box>
    );
}