import {
    Container, Divider,
    List,
    Paper,
    Typography
} from '@material-ui/core';


export default function ClubTree({classes, clubs}) {
    return (
        <Container>
        {/* TODO: Refactor this into a Component named something like "ClubTree" */}
        <Paper variant="outlined">
            <List>
                <Typography variant="h6" className={classes.sectionTitle}>
                    Clubs and Sub-clubs
                </Typography>
                <Divider className={classes.divider}/>
                {clubs}
            </List>
        </Paper>
    </Container>
    );
}