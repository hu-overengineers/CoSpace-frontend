import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {ClubService} from "../service/ClubService";
import Questionnaire from "../component/questionnaire/Questionnaire";
import { MemberService } from "../service/MemberService";
const useStyles = makeStyles((theme) => ({
    root: {},
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    gridRightColumnBox: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
    },
    submitButton: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)

    },
}));

function PostSubmit({enrolledSubClubs}) {
    const [open, setOpen] = useState(true);
    const history = useHistory();
    return (
        <Dialog open={open} onClose={() => {setOpen(false)}} aria-labelledby="form-dialog-title" maxWidth={"md"}>

        <DialogTitle id="form-dialog-title">Recommended SubClubs</DialogTitle>
        <DialogContent> 
            <Box margin="10px">
                {enrolledSubClubs.map(sc => {
                    return (<h3>{sc}</h3>)
                })}
            </Box>

                
        </DialogContent>
        <DialogActions>
                    <Button 
                        onClick={(event) => {history.push("/")}}
                        color="primary">
                        Go to Feed
                    </Button>
        </DialogActions>
    </Dialog>

    )
}

function SubClubRecommend() {
    const classes = useStyles();

    const [questions, setQuestions] = useState([]);
    const [givenAnswers, setGivenAnswers] = useState([]);
    const [enrolledSubs, setEnrolledSubs] = useState([]);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        ClubService.getRandomQuestionnaire().then((response) => {
            setQuestions(response.data)
        })
    }, [])

    const handleSubmit = () => {
        MemberService.bulkEnrollment(givenAnswers).then((response) => {
            let enrollments_list = response.data.split("[")[1]
            enrollments_list = enrollments_list.split("]")[0].split(", ")
            setEnrolledSubs(enrollments_list)
            setSubmitted(true)
        })
    }


    return (
        <Grid container>
            <Grid item xs={12} className={classes.gridRightColumnBox}>
                <Typography variant="h4">SubClub Recommendation Form</Typography>
                <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>


                {(questions.length !== 0) && (<Questionnaire questions={questions} callBackOnAnswer={setGivenAnswers}/>)}

                <Button className={classes.submitButton}
                        size="medium"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleSubmit()
                        }}
                        fullWidth
                        disableElevation>SUBMIT
                </Button>

                {(submitted) && (<PostSubmit enrolledSubClubs={enrolledSubs}></PostSubmit>)}

            </Grid>
            <Grid item xs={3}>
            </Grid>
        </Grid>
    );
}

export default SubClubRecommend;