import {Divider, ListItem, ListItemIcon, ListItemText, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ForumIcon from "@material-ui/icons/Forum";
import React from "react";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


const useStyles = makeStyles((theme) => ({
    root: {},
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    sectionTitle: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sectionBody: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sectionRoot: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function renderTree (nodes) {
    return (<TreeItem key={nodes.uid} nodeId={nodes.uid} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>);
}

export default function ClubTree({clubs}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>
                <Typography variant="h6" className={classes.sectionTitle}>
                    Clubs and Sub-clubs
                </Typography>
                <Divider className={classes.divider}/>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpanded={["1"]}
                    defaultExpandIcon={<ChevronRightIcon/>}>
                    {clubs.map((club, index) => (
                        renderTree(club)
                    ))}
                </TreeView>
            </Box>
        </Paper>
    );
}