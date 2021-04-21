import {
    Divider,
    List,
    Paper,
    Typography
} from '@material-ui/core';


export default function EventContainer({classes}) {
    return (
    <Paper variant="outlined" className={classes.root}>
        <List>
            <Typography variant="h6" className={classes.sectionTitle}>
                Events
            </Typography>
            <Divider className={classes.divider}/>
            <Typography className={classes.sectionTitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
        </List>
    </Paper>
    );
}