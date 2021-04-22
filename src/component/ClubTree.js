import {Divider, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import React from "react";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


const useStyles = makeStyles((theme) => ({
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
    },
    sectionClub: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
}));

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content': {
            backgroundColor: '#afffea',
            color: 'var(--tree-view-color)',
        },
        '&$selected > $content': {
            //backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            backgroundColor: '#00e3aa',
            color: 'var(--tree-view-color)',

        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),

        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        //display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
    treeItemIcon: {
        marginLeft: theme.spacing(2)
    },
    treeItemText: {
        marginLeft: theme.spacing(1)
    }
}));

function renderTree(nodes, classes) {
    const onSubClubClick = () => {
    }
    return (
        <TreeItem className={classes.root} onClick={onSubClubClick}
                  key={nodes.name} nodeId={nodes.name} label={<Box className={classes.treeItemText}>{nodes.name}</Box>}
                  classes={{
                      root: classes.root,
                      content: classes.content,
                      expanded: classes.expanded,
                      selected: classes.selected,
                      group: classes.group,
                      label: classes.label,
                  }}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node, classes)) : null}
        </TreeItem>
    );
}

export default function ClubTree({clubs}) {
    const classes = useStyles();
    const treeClasses = useTreeItemStyles();

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>
                <Typography variant="h6" className={classes.sectionTitle}>
                    Clubs and Sub-clubs
                </Typography>
                <Divider className={classes.divider}/>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<Box ><ExpandMoreIcon className={treeClasses.treeItemIcon}/></Box>}
                    defaultExpanded={["1"]}
                    defaultExpandIcon={<ChevronRightIcon className={treeClasses.treeItemIcon} />}>
                    {clubs.map((club, index) => (
                        <Box>
                            {renderTree(club, treeClasses)}
                        </Box>
                    ))}

                </TreeView>
            </Box>
        </Paper>
    );
}