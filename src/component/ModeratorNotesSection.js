


import {Divider, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SimpleAccordion from "./Accordion"

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
    }
}));
export default function ModeratorNotesSection({notes}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>
                <Typography variant="h6" className={classes.sectionTitle}>
                    Rules and considerations
                </Typography>
                <Divider className={classes.divider}/>
                <Typography className={classes.sectionBody}>
                    <SimpleAccordion/>
                </Typography>
            </Box>
        </Paper>
    );
}