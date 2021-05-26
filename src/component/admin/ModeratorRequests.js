import React, {useEffect, useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import {Button, Container, FormControl, FormHelperText, Grid, Select} from "@material-ui/core";
import {ClubService} from "../../service/ClubService";
import {AdminService} from "../../service/AdminService";
import MemberInfo from "./MemberInfo";
import Box from "@material-ui/core/Box";
import {Casino} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    tagText: {
        display: 'flex',
        width: 100,
        flexWrap: 'wrap',
    },
    typography: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    button: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    iconButton: {
        margin: theme.spacing(2),
    },
}));

function ModeratorRequests() {
    const classes = useStyles();
    const [isRequestsVisible, setIsRequestsVisible] = useState(false);
    const [isMemberInfoVisible, setIsMemberInfoVisible] = useState(false);

    const theme = useTheme();
    const [subClubs, setSubClubs] = useState([]);
    const [selectedSubClub, setSelectedSubClub] = React.useState({});

    const [selectedModRequest, setSelectedModRequest] = React.useState({});


    useEffect(() => {
        AdminService.getModeratorRequests().then(response => {
            setSubClubs(response.data);
        })
    }, []);

    const handleSubClubNameChange = (event) => {
        setSelectedSubClub(event.target.value);
        if (event.target.value === "") {
            setIsRequestsVisible(false);
        } else {
            setIsRequestsVisible(true);
        }
        setIsMemberInfoVisible(false);
    };


    const handleRandomSelection = (event) => {
        AdminService.assignRandomModerator(selectedSubClub).then((response) => {
            if (response.data === "") {
                setSelectedModRequest("")                
            }
            else{
                setSelectedSubClub(response.data)
                setSelectedModRequest({Moderator: response.data.moderatorUsername})
            }
            setIsMemberInfoVisible(true);
        })
    }

    return (
        <Box>
            <Box>
                <div>
                    <FormControl variant={"filled"} className={classes.formControl}>
                        <InputLabel htmlFor="age-native-helper">Sub-Club</InputLabel>
                        <Select
                            onChange={handleSubClubNameChange}
                            inputProps={{
                                name: '',
                            }}>
                            <option aria-label="None" value=""/>

                            {subClubs.map((subClub) => (
                                <option value={subClub}>{subClub}</option>
                            ))}
                        </Select>
                        <FormHelperText>Select a sub-club</FormHelperText>
                    </FormControl>
                    {(subClubs.length === 0 ) && (
                        <h3>There are no moderation request.</h3>
                    )}
                </div>
            </Box>


            {(isRequestsVisible) && (
                <Grid container spacing={3} >
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto', marginTop:"5vh"}}>
                        <Button  className={classes.button} size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Casino/>}
                                        disabled={isMemberInfoVisible}
                                        onClick={() => {
                                            handleRandomSelection()
                                        }}
                                        disableElevation>SELECT A RANDOM MODERATOR
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        {(isMemberInfoVisible) && (
                            <div>
                                {(selectedModRequest !== "") && (<MemberInfo info={selectedModRequest}/>)}                                
                            </div>
                        )}
                    </Grid>

                </Grid>
            )}

        </Box>);

}


export default ModeratorRequests;