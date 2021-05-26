import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Divider, Typography} from "@material-ui/core";
import CoSpaceTreeViewMenu from "../component/common/CoSpaceTreeViewMenu";
import {useHistory} from "react-router-dom";
import {SupervisorAccount} from "@material-ui/icons";
import Box from "@material-ui/core/Box";


const adminMenu = [
    {
        text: "Clubs & Sub-clubs",
        children: [
            {
                text: "Create club",
                path: "/admin/create-club"
            },
            {
                text: "Manage club",
                path: "/admin/manage-club"
            }
        ]
    },
    {
        text: "Members",
        children: [
            {
                text: "View member information",
                path: "/admin/view-member-info"
            },
            {
                text: "Assign New Moderators",
                path: "/admin/moderator-requests"
            },
        ]
    },
    {
        text: "Reports",
        children: [
            {
                text: "Reported posts",
                path: "/admin/reported-posts"
            },
        ]
    },
];


const useStyles = makeStyles((theme) => ({
    root: {},
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    gridLeftColumnBox: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(0),
    },
    gridRightColumnBox: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
    },
}));


function AdminPanelLayout({children}) {
    const classes = useStyles();
    const history = useHistory();


    const onItemClick = (item) => {
        console.log(item);
        console.log(item.path);
        history.push(item.path);
    }

    return (

        <Grid container className={classes.root}>

            <Grid item xs={3} className={classes.gridLeftColumnBox}>
                <Box>
                    {/*<Typography variant="h4">Menu</Typography>*/}
                    {/*<Divider className={classes.divider}/>*/}
                    <CoSpaceTreeViewMenu title={"Menu"}
                                         titleIcon={<SupervisorAccount/>}
                                         menuItems={adminMenu}
                                         defaultExpanded={adminMenu.map(menuItem => menuItem.text)}
                                         callbackOnTreeItemClick={onItemClick}/>
                </Box>
            </Grid>

            <Grid item xs={9} className={classes.gridRightColumnBox}>
                <Typography variant="h4">Administration Panel</Typography>
                <Divider className={classes.divider}/>
                {children}
            </Grid>

        </Grid>

    );
}

export default AdminPanelLayout;