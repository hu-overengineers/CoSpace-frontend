import {
    Divider,
    List,
    Paper,
    Typography
} from '@material-ui/core';
import EventCard from './EventCard';


export default function EventContainer({classes}) {
    return (
    <Paper variant="outlined" className={classes.root}>
        <List>
            <Typography variant="h6" className={classes.sectionTitle}>
                Events
            </Typography>
            <Divider className={classes.divider}/>
            <Typography className={classes.sectionTitle}>
                <EventCard/>
            </Typography>
        </List>
    </Paper>
    );
}