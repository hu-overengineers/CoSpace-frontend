import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'; 

export default function HomePage() {

    
    return (
        <Grid container>
            <Grid item xs={3}>
                <Container >Club Tree</Container>
            </Grid>
            <Grid item xs={6}>
                <Container >Feed</Container>
            </Grid>
            <Grid item xs={3}>
                <Container >Misc</Container>
            </Grid>
        </Grid>
    )
}