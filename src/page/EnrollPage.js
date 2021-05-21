import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {ClubService} from "../service/ClubService";
import ClubTree from '../component/ClubTree';
import { MemberService } from '../service/MemberService';
import EnrollPanel from '../component/EnrollPanel';


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
        MemberService.getEnrolledSubClubsOfCurrentlySignedInUser().then(response => {
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
                </Grid>

                <Grid item xs={8} className={classes.gridItem}>
                    <Paper className={classes.panel}>
                        <EnrollPanel clickedSubClub={clicked} alreadyEnrolled={isAlreadyEnrolled}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}