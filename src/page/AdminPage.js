import React from "react";
import {Container, Divider, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import AdminMenu from '../component/admin/AdminMenu'
import TabForDebug from '../component/admin/TabForDebug'

const useStyles = makeStyles({
    root: {
        marginTop: "24px" // I suppose this should not be in pixels
    },
    divider: {
        marginTop: "8px",
        marginBottom: "8px"
    },
    feedItem: {
        marginBottom: "12px",
        marginTop: "12px",
    },
    sectionTitle: {
        marginLeft: "12px",
    },
});


export default function AdminPage() {


    const classes = useStyles();



    return (
        
            <Grid container className={classes.root}>

                <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto',}}>
                    <Container>
                        <Typography variant="h4">Menu</Typography>
                        <Divider className={classes.divider}/>
                        <AdminMenu/>
                    </Container>
                </Grid>

                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>

                    <TabForDebug/>
                    
                </Grid>

                <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <Typography  variant="h4">Overview</Typography>
                        <Divider className={classes.divider}/>
                    </Container>
                </Grid>

            </Grid>
        
    );
}