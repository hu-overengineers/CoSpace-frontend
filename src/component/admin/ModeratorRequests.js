import React, { useEffect, useState } from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import {
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    NativeSelect,
    TextField,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { ClubService } from "../../service/ClubService";
import CreateQuestionnaire from "../questionnaire/CreateQuestionnaire";
import {AdminService} from "../../service/AdminService";
import MemberInfo from "./MemberInfo";


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
        ClubService.getSubClubs().then(response => {
            setSubClubs(response.data);
        })
    }, []);

    const handleSubClubNameChange = (event) => {
        const tempSubClub = subClubs.filter(subc => {return subc.name === event.target.value})[0]
        setSelectedSubClub(tempSubClub);
        if (event.target.value === "") {
            setIsRequestsVisible(false);
        } else {
            setIsRequestsVisible(true);
        }
        setIsMemberInfoVisible(false);
    };


    const handleRandomSelection = (event) => {
        AdminService.assignRandomModerator(selectedSubClub.name).then((response) => {
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


        <Container>

            <Container>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-helper">Sub-Club</InputLabel>
                        <NativeSelect
                            onChange={handleSubClubNameChange}
                            inputProps={{
                                name: '',
                            }}>
                            <option aria-label="None" value=""/>

                            {subClubs.map((subClub) => (
                                <option value={subClub.name}>{subClub.name}</option>
                            ))}
                        </NativeSelect>
                        <FormHelperText>Select a sub-club</FormHelperText>
                    </FormControl>
                </div>
            </Container>


            {(isRequestsVisible) && (
                <Grid container spacing={3} style={{marginLeft:"12px"}}>
                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto', marginTop:"5vh"}}>
                        <Button size="medium"
                                        variant="contained"
                                        color="primary"
                                        disabled={selectedSubClub.moderatorUsername !== ""}
                                        onClick={() => {
                                            handleRandomSelection()
                                        }}
                                        disableElevation>SELECT A RANDOM MODERATOR
                        </Button>
                        {(selectedSubClub.moderatorUsername !== "") && (
                            <p> {selectedSubClub.name} already have a moderator!</p>
                        )}
                    </Grid>

                    <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                        {(isMemberInfoVisible) && (
                            <div>
                                {(selectedModRequest !== "") && (<MemberInfo info={selectedModRequest}></MemberInfo>)}
                                {(selectedModRequest === "") && (<p>There are no moderator request for {selectedSubClub.name}</p>)}
                                
                            </div>
                        )}
                    </Grid>

                </Grid>
            )}

        </Container>);

}


export default ModeratorRequests;