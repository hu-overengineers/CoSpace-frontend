import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Container, Divider, Typography} from "@material-ui/core";
import CoSpaceTreeViewMenu from "../component/CoSpaceTreeViewMenu";
import {useHistory} from "react-router-dom";
import {SupervisorAccount} from "@material-ui/icons";


const modMenu = [
    {
        text: "Events",
        children: [
            {
                text: "Create event",
                path: "/mod/create-event"
            },
            {
                text: "Manage event",
                path: "/mod/manage-event"
            }
        ]
    },
    {
        text: "Reports",
        children: [
            {
                text: "Reported posts",
                path: "/mod/reported-posts"
            },
        ]
    },
];


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "24px"
    },
    divider: {
        marginTop: "8px",
        marginBottom: "8px"
    }
}));


function ModeratorPanelLayout({children}) {
    const classes = useStyles();
    const history = useHistory();


    const onItemClick = (item) => {
        console.log(item);
        console.log(item.path);
        history.push(item.path);
    }

    return (

        <Grid container className={classes.root}>

            <Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto',}}>
                <Container>
                    {/*<Typography variant="h4">Menu</Typography>*/}
                    {/*<Divider className={classes.divider}/>*/}
                    <CoSpaceTreeViewMenu title={"Menu"}
                                         titleIcon={<SupervisorAccount/>}
                                         menuItems={modMenu}
                                         defaultExpanded={modMenu.map(menuItem => menuItem.text)}
                                         callbackOnTreeItemClick={onItemClick}/>
                </Container>
            </Grid>

            <Grid item xs={8} style={{maxHeight: '100vh', overflow: 'auto'}}>
                <Typography variant="h4">Moderator Panel</Typography>
                <Divider className={classes.divider}/>
                {children}
            </Grid>

            {/* TODO: Include whenever available in backend */}
            {/*<Grid item xs={3} style={{maxHeight: '100vh', overflow: 'auto'}}>*/}
            {/*    <Container>*/}
            {/*        <Typography variant="h4">Overview</Typography>*/}
            {/*        <Divider className={classes.divider}/>*/}
            {/*    </Container>*/}
            {/*</Grid>*/}

        </Grid>

    );
}

export default ModeratorPanelLayout;