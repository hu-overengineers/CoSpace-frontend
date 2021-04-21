import {Divider, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
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
    accordionRoot: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
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
                    <Box className={classes.root}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>1. Be civil and constructive.</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    This club works best when people are kind, considerate, and thoughtful. We want
                                    people to feel comfortable and safe here, regardless of who they are.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}> 2. Get help if you think you need
                                    it.</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    If you have to ask whether you should see a doctor, then you should just go ahead
                                    and do it. No one on /r/adhd can tell you whether you have ADHD or any other
                                    disorder; whether a specific behavior or thing you do is due to ADHD or another
                                    disorder; what your doctor will diagnose you with; what you’ll be prescribed; or
                                    what your doctor’s diagnostic procedure might be like.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Typography>
            </Box>
        </Paper>
    );
}