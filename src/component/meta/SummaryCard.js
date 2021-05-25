import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Avatar, Box, Button, IconButton, ThemeProvider, Typography } from "@material-ui/core";
import { Add, MoreVertOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import AboutFeed from "../AboutFeed";
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import { Legend } from '@devexpress/dx-react-chart-material-ui';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
  } from '@devexpress/dx-react-chart-material-ui';
  
  
  import { scaleBand } from '@devexpress/dx-chart-core';
  import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
  

  

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    }
   
}))



export default function SummaryCard({reviews}) {

    const classes = useStyles();

    const [rating, setRating] = React.useState(3.2);


    let totalRating=0;
    let rateStructure = {
        state: '',
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    }
    for (let i = 0; i < reviews.length; i++) {
        totalRating += reviews[i].rating;
        if (reviews[i].rating === 1){
            rateStructure.one +=1;
        }
        else if (reviews[i].rating === 2){
            rateStructure.two +=1;
        }
        else if (reviews[i].rating === 3){
            rateStructure.three +=1;
        }
        else if (reviews[i].rating === 4){
            rateStructure.four +=1;
        }
        else if (reviews[i].rating === 5){
            rateStructure.five +=1;
        }
    }

    rateStructure.one = rateStructure.one / totalRating;
    rateStructure.two = rateStructure.two / totalRating;
    rateStructure.three = rateStructure.three / totalRating;
    rateStructure.four = rateStructure.four / totalRating;
    rateStructure.five = rateStructure.five / totalRating;


    const feed = {
        created: "2021-05-25T17:00:26.586+00:00",
        details: "Molestiae nulla itaque quaerat dolor molestiae illo est.",
        id: 102,
        moderatorUsername: "yusuf",
        name: "eaque ut",
        numberOfMembers: 64,
        numberOfPostsInLastWeek: 29,
        parentName: "quia",
    }

    
    return (
        <div>
            <Paper>
                <Container className={classes.root}>    
                    <Grid container spacing={3}>
                        <Grid key="1" item xs={4}>
                            <Typography color="textSecondary" variant="h2" align="left">{totalRating / 5}</Typography>
                            <Rating value={rating} readOnly />
                            
                            <Typography color="textSecondary" variant="body1">
                                <PermIdentityOutlinedIcon/> {reviews.length} total
                            </Typography>
                            
                            
                            
                            <Box >
                                <Button size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<RateReviewOutlinedIcon/>}
                                        onClick={() => {
                                            
                                        }}
                                        fullWidth
                                        disableElevation>Write a Review
                                </Button>
                            </Box>
                            
                          

                        </Grid>
                        <Grid key="3" item xs={4}>
                        <Paper>
                            <Chart data={[rateStructure]} rotated height="250">
                    
                                            <ArgumentAxis />
                                            <ValueAxis />
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
                                            <Stack />
                                        </Chart>
                            </Paper>
                        </Grid>
                        <Grid key="2" item xs={4}>
                            <AboutFeed feedInfo={feed}/>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>


            
        </div>
    );
}
