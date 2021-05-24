import Box from "@material-ui/core/Box";
import {Divider, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";


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
    titleContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleIconContainer: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(0),
    },
}));


export default function TitledSection({titleIcon, title, children}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>
                <Grid container>
                    <Box key={1} item className={classes.titleIconContainer}>
                        {titleIcon}
                    </Box>
                    <Grid key={2} item className={classes.titleContainer}>
                        <Typography variant="h6" className={classes.sectionTitle}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>
                {children}
            </Box>
        </Paper>
    );
}