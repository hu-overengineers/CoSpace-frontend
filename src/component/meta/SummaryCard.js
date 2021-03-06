import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {Box, Button, Dialog, DialogTitle, TextField, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import AboutFeed from "../AboutFeed";
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {Stack} from '@devexpress/dx-react-chart';
import {ReviewService} from "../../service/ReviewService";
import {BarSeries, Chart, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {useHistory} from "react-router";
import {delay} from "../../util/async";
import {ClubService} from "../../service/ClubService";
import {AuthService} from "../../service/AuthService";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    ratingStars: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing(2),
    },
    dialogTextField: {
        marginTop: theme.spacing(2),
    },
    numReviewsText: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
    }

}))


export default function SummaryCard({subClubName, reviews}) {
    const history = useHistory();
    const classes = useStyles();


    const [openDialog, setOpenDialog] = useState(false);
    const [hover, setHover] = useState(-1);
    const [subClubInfo, setSubClubInfo] = useState(null);

    useEffect(() => {
        ClubService.getSubClubs().then(subClubs => {
            const subClub = subClubs.data.filter(subClub => subClub.name === subClubName)[0];
            ClubService.getSubClubStatistics(subClub.name).then(subClubStats => {
                subClub.numberOfMembers = subClubStats.data.numberOfMembers;
                subClub.numberOfPostsInLastWeek = subClubStats.data.numberOfPostsInTimeFrame;
                setSubClubInfo(subClub);
            });
        });
    }, [subClubName]);

    const labels = {
        1: 'Useless',
        2: 'Lots of bad posts',
        3: 'OK',
        4: 'Good place to hang out',
        5: 'Excellent people and quality',
    };


    const handleDialogClose = (event) => {
        setOpenDialog(false);
    };


    const onClickSubmit = (event) => {

        ReviewService.makeReview(
            subClubName,
            inputContent,
            inputRating,
            AuthService.getUsername()).then(response => {
            console.log("RESPONSE", response.data);
            setOpenDialog(false);

            delay(1000).then(() => window.location.reload());

        });
    }
    const onContentChange = (event) => {
        setInputContent(event.target.value);
    }

    const [inputRating, setInputRating] = React.useState(3);
    const [inputContent, setInputContent] = useState("");


    let totalRating = 0;
    let rateStructure = {
        state: '+1',
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    }
    for (let i = 0; i < reviews.length; i++) {
        totalRating += reviews[i].rating;
        if (reviews[i].rating === 1) {
            rateStructure.one += 1;
        } else if (reviews[i].rating === 2) {
            rateStructure.two += 1;
        } else if (reviews[i].rating === 3) {
            rateStructure.three += 1;
        } else if (reviews[i].rating === 4) {
            rateStructure.four += 1;
        } else if (reviews[i].rating === 5) {
            rateStructure.five += 1;
        }
    }

    rateStructure.one = rateStructure.one / totalRating;
    rateStructure.two = rateStructure.two / totalRating;
    rateStructure.three = rateStructure.three / totalRating;
    rateStructure.four = rateStructure.four / totalRating;
    rateStructure.five = rateStructure.five / totalRating;

    return (subClubInfo ?
        <div>
            <Paper>
                <Container className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid key="1" item xs={4}>
                            <Typography color="textSecondary" variant="h2"
                                        align="left">{(totalRating / reviews.length).toPrecision(3)}</Typography>
                            <Rating value={(totalRating / reviews.length).toPrecision(3)} readOnly/>

                            <Grid container>
                                <Grid item>
                                    <PermIdentityOutlinedIcon className={classes.numReviewsText}/>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.numReviewsText} color="textSecondary" variant="body1">
                                        {reviews.length} total
                                    </Typography>
                                </Grid>
                            </Grid>


                            <Box>
                                <Button size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<RateReviewOutlinedIcon/>}
                                        onClick={() => {
                                            setOpenDialog(true);
                                        }}
                                        fullWidth
                                        disableElevation>Write a Review
                                </Button>
                            </Box>


                        </Grid>
                        <Grid key="3" item xs={4}>
                            <Paper>
                                <Chart data={[rateStructure]} rotated height="250">

                                    <ValueAxis/>
                                    <BarSeries
                                        valueField="five"
                                        argumentField="state"

                                        color="#57bb8a"
                                    />

                                    <BarSeries
                                        valueField="four"
                                        argumentField="state"
                                        color="#9ace6a"

                                    />
                                    <BarSeries
                                        valueField="three"
                                        argumentField="state"
                                        color="#ffcf02"
                                    />

                                    <BarSeries
                                        valueField="two"
                                        argumentField="state"
                                        color="#ff9f02"
                                    />

                                    <BarSeries
                                        valueField="one"
                                        argumentField="state"
                                        color="#ff6f31"
                                    />
                                    <Stack/>
                                </Chart>
                            </Paper>
                        </Grid>
                        <Grid key="2" item xs={4}>
                            <AboutFeed feedInfo={subClubInfo}/>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title"
                    fullWidth={true} maxWidth={"md"}>

                <DialogTitle id="form-dialog-title">Meta / {subClubInfo.name}</DialogTitle>
                <DialogContent>

                    <div className={classes.ratingStars}>

                        <Rating
                            required
                            value={inputRating}
                            onChange={(event, newValue) => {
                                setInputRating(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                        {inputRating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : inputRating]}</Box>}
                    </div>

                    <TextField
                        autoFocus
                        required
                        multiline
                        className={classes.dialogTextField}
                        label="Your opinions"
                        rows={5}
                        variant="filled"
                        type="input"
                        onChange={onContentChange}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDialogClose}
                        color="primary">
                        Exit
                    </Button>
                    <Button
                        onClick={onClickSubmit}

                        color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        </div> : <div/>
    );
}
