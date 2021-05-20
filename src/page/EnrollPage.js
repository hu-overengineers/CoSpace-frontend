import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import AllClubs from "../component/AllClubs";
import Questionnaire from '../component/Questionnaire';
import {ClubService} from "../service/ClubService";
import ClubTree from '../component/ClubTree';
import AboutClub from '../component/AboutClub';
import { Button } from '@material-ui/core';
import {Assignment} from "@material-ui/icons";
import { MemberService } from '../service/MemberService';


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop: theme.spacing(5)
    },
    gridItem: {
        padding: theme.spacing(2),
        marginLeft: theme.spacing(3)
    },
    panel: {
        minHeight: "75vh",
        maxHeight: "75vh",
    }
  }));


function EnrollPanel({clickedClub, alreadyEnrolled}){
    const [isQuest, setQuest] = useState(false);
    let buttonText = "";
    if (clickedClub == undefined) {
        return <p>Click to a club</p>
    }
    else {
        if (!isQuest) {
            if(alreadyEnrolled){buttonText = "ALREADY ENROLLED"}
            else{buttonText = "TAKE THE QUESTIONNAIRE"}
            return (
                <Box 
                    display="flex" flexDirection="column"
                    justifyContent="space-between" height="75vh">
                    
                    <AboutClub
                    clubname={clickedClub.name}
                    description={clickedClub.details}
                    timeCreated={clickedClub.created}
                    numberOfMembers={0}
                    numberOfPostsInLastWeek={0}/>
                    
                    <Button 
                        size="medium" style={{marginRight:"5px"}}
                        variant="contained"
                        color="primary"
                        startIcon={<Assignment/>}
                        onClick={() => {
                            setQuest(true);
                        }}
                        disabled={alreadyEnrolled}
                        disableElevation>
                        {buttonText}
                    </Button>
                
                </Box>
            )
        }
        else {
            return <Questionnaire></Questionnaire>
        }    
    }

}

export default function EnrollPage() {
    const classes = useStyles();

    const [subclubs, setSubClubs] = useState([]);
    const [enrolledSubs, setEnrolledSubs] = useState([]);
    const [clicked, setClicked] = useState();
    const [isAlreadyEnrolled, setAlreadyEnrolled] = useState(false);



    // Get all sub-clubs
    useEffect(() => {
        ClubService.getSubClubs().then(response => {
            console.log("Parsing sub-clubs");
            console.log(response.data);
            setSubClubs(ClubService.parseSubClubs(response.data));
        })
    }, []);


    // Get enrolled sub-clubs
    useEffect(() => {
        MemberService.getEnrolledSubClubs().then(response => {
            console.log("enrolled subclubs: ");
            console.log(response.data);
            setEnrolledSubs(response.data.map(sub => sub.name));
        })
    }, []);


    const handleSubClubClick = (subclub) => {
        console.log("clicked club", subclub);
        setClicked(subclub)
        let alreadyEnrolled =  enrolledSubs.includes(subclub.name);
        console.log(enrolledSubs, alreadyEnrolled, subclub.name);
        setAlreadyEnrolled(alreadyEnrolled)

    }


    return (
        <div>
            <Grid container  spacing={1} className={classes.gridContainer}>
                <Grid item xs={3} className={classes.gridItem}>
                        <ClubTree
                            callbackOnTreeItemClick={handleSubClubClick}
                            clubs={subclubs}>
                        </ClubTree>
                        {/* <AllClubs className={classes.panel} callbackOnClubClick={(club) => {handleSubClubClick(club)}}></AllClubs> */}
                </Grid>

                <Grid item xs={8} className={classes.gridItem}>
                    <Paper className={classes.panel}>

                        <EnrollPanel clickedClub={clicked} alreadyEnrolled={isAlreadyEnrolled}/>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}