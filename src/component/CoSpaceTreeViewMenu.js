import {makeStyles} from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import Box from "@material-ui/core/Box";
import {Divider, Grid, Paper, Typography} from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React from "react";
import {PublicOutlined} from "@material-ui/icons";

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
    root: {
        marginLeft: theme.spacing(0.5)
    },
    treeViewTitleContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    treeViewIconContainer: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(0),
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
        display: 'flex',
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

function renderTree(node, classes, callback) {
    const onTreeItemClick = () => {
        callback(node);
    }
    return (
        <TreeItem className={classes.root} onClick={onTreeItemClick}
                  onLabelClick={event => {
                      event.preventDefault()
                  }}
                  key={node.text} nodeId={node.text} label={<Box className={classes.treeItemText}>{node.text}</Box>}
                  classes={{
                      root: classes.root,
                      content: classes.content,
                      expanded: classes.expanded,
                      selected: classes.selected,
                      group: classes.group,
                      label: classes.label,
                  }}>
            {Array.isArray(node.children) ? node.children.map((childNode) => renderTree(childNode, classes, callback)) : null}
        </TreeItem>
    );
}

export default function CoSpaceTreeViewMenu(
    {
        title,
        titleIcon,
        menuItems,
        callbackOnTreeItemClick,
        expandIcon,
        collapseIcon,
        defaultExpanded,
        expanded
    }) {
    const classes = useStyles();
    const treeClasses = useTreeItemStyles();

    if (expandIcon === undefined) expandIcon = <ChevronRightIcon className={treeClasses.treeItemIcon}/>;
    if (collapseIcon === undefined) collapseIcon = <Box><ExpandMoreIcon className={treeClasses.treeItemIcon}/></Box>;
    if (titleIcon === undefined) titleIcon = <PublicOutlined/>;

    return (
        <Paper variant="outlined">
            <Box className={classes.sectionRoot}>
                <Grid container>
                    <Box key={1} item className={classes.treeViewIconContainer}>
                        {titleIcon}
                    </Box>
                    <Grid key={2} item className={classes.treeViewTitleContainer}>
                        <Typography variant="h6" className={classes.sectionTitle}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={collapseIcon}
                    defaultExpanded={defaultExpanded}
                    expanded={expanded}
                    defaultExpandIcon={expandIcon}>
                    {menuItems.map((menuItem, index) => (
                        <Box key={menuItem.text}>
                            {renderTree(menuItem, treeClasses, callbackOnTreeItemClick)}
                        </Box>
                    ))}

                </TreeView>
            </Box>
        </Paper>
    );
}
