import {makeStyles} from "@material-ui/core/styles";
import {Divider, Paper, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    sectionTitle: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sectionBody: {},
    sectionRoot: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));


export default function Section({title, content}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>
                <Typography variant="h6" className={classes.sectionTitle}>
                    {title}
                </Typography>
                <Divider className={classes.divider}/>
                <Box className={classes.sectionBody}>
                    {content}
                </Box>
            </Box>
        </Paper>
    );
}