import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {ModeratorService} from "../../service/ModeratorService";
import NoResultsFound from "../common/NoResultsFound";
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import MemberInfo from "../admin/MemberInfo";
import {delay} from "../../util/async";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
    paper: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    gridReportInfoContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex"
    },
    gridHorizontalSection: {
        paddingRight: theme.spacing(2),
    },
    dismissBtn : {
        marginTop: theme.spacing(2),
    }
}));

export default function DismissList() {
    const classes = useStyles();

    const [dismissList, setDismissList] = useState([
    {
        "username": "tammara.kemmer",
        "email": "tammara.kemmer@gmail.com",
        "created": "2021-05-26T22:49:16.503+00:00",
        "lastLogin": null,
        "attendedEvents": []
    },
    {
        "username": "jimmie.mante",
        "email": "jimmie.mante@gmail.com",
        "created": "2021-05-26T22:49:17.907+00:00",
        "lastLogin": null,
        "attendedEvents": []
    }

    ]);

    useEffect(() => {
        ModeratorService.getDismissList().then(response => {
            console.log(response);
            //setDismissList(reponse.data);
        });
    }, []);
    
    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (e, member) => {
        setSelectedMember(member)
    }

    const handleDismissClick = () => {
        ModeratorService.dismiss(selectedMember.username).then(response => {
            
            delay(1000).then(e => {
                window.location.reload();
            });
        });
    }

    return (
        <Grid container>
        <Grid key={1} item xs={6}>
            <Typography variant="h6" className={classes.title}>List of Dismissible Members</Typography>
            <Paper variant={"outlined"} className={classes.paper}>
                <List className={classes.root}>
                    {dismissList === null || dismissList.length === 0 ?
                        <NoResultsFound/> : dismissList.map((member) =>
                            <div>
                                <ListItem
                                    button
                                    key={member.email}
                                    alignItems="flex-start"
                                    onClick={(e) => handleMemberClick(e, member)}>
                                    <ListItemIcon>
                                        <ReportOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Member Name: ${member.username}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                </Typography>
                                                You can dismiss this member.
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </div>
                        )}
                </List>
            </Paper>
        </Grid>
        <Grid className={classes.gridReportInfoContainer} key={2} container xs={6}>
            {selectedMember ?
                <Box>
                    <Grid item>
                        <Typography variant="h6" className={classes.title}>Selected Member</Typography>
                        <Box>
                            {selectedMember ? <MemberInfo info={selectedMember}/> : null}
                        </Box>
                        <Button className={classes.dismissBtn} variant="outlined" onClick={handleDismissClick}>Dismiss </Button>
                    </Grid>
                </Box>
            : <Typography className={classes.title}>Select a member to see the details.</Typography>}
        </Grid>

    </Grid>
    )
}