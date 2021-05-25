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
import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import { MoreVertOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';


const useStyles = makeStyles({
   
})

export default function SummaryCard({reviews}) {

    const classes = useStyles();
    const [rating, setRating] = React.useState(2);

    return (
        <div>
            <Paper>
                <Container>    

                    <Grid container>
                        <Grid key="1" item xs={1}>
                            <Typography color="textSecondary" variant="h2" align="center">3.6</Typography>
                            <Rating value={rating} readOnly />
                            
                            <Typography color="textSecondary" variant="body1">
                                <PermIdentityOutlinedIcon/> 42 total
                            </Typography>
                        </Grid>
                        <Grid key="2" item>

                        </Grid>
                        <Grid key="3" item>

                        </Grid>
                    </Grid>

                        
                       
                    
                </Container>

                
            </Paper>
        </div>
    );
}
