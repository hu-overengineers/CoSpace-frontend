import {
    Divider,
    List,
    Paper,
    Typography
} from '@material-ui/core';


export default function AboutClub({classes}) {
    return (
    <Paper variant="outlined">
        <List>
            <Typography variant="h6" className={classes.sectionTitle}>
                About
            </Typography>
            <Divider className={classes.divider}/>
            <Typography className={classes.sectionTitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
        </List>
    </Paper>
    );
}