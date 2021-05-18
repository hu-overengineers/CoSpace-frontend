import React from "react";
import {Container, Divider, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import AdminMenu from '../component/admin/AdminMenu'
import CreateClub from '../component/admin/CreateClub'
import ManageClub from '../component/admin/ManageClub'
import ViewMemberInfo from '../component/admin/ViewMemberInfo'
import ReportedPosts from '../component/admin/ReportedPosts'

const useStyles = makeStyles({
    root: {
        marginTop: "24px" 
    },
    divider: {
        marginTop: "8px",
        marginBottom: "8px"
    }
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
                        <Typography  variant="h4">Administration Panel</Typography>
                        <Divider className={classes.divider}/>
                        
                        <CreateClub/>
                        <ManageClub/>
                        <ViewMemberInfo/>
                        <ReportedPosts/>
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