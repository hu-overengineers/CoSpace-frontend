import {List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from "react-router-dom";
import {EmojiSymbols} from "@material-ui/icons";
import TitledSection from '../common/TitledSection';

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
    avatarContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    usernameContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        color: theme.palette.getContrastText('#00e3aa'),
        backgroundColor: '#00e3aa',
    },
    buttonContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flexGrow: 1,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    dateRegisteredContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
}));


export default function InterestRates({interests, isSelf}) {
    const history = useHistory();
    const classes = useStyles();
    let title = "Interests"
    if (isSelf) {
        title = "My " + title;
    }
    else {
        title = "Common " + title;
    }

    return (
            <Box>
                <TitledSection titleIcon={<EmojiSymbols/>}
                            title={title}>
                    {(interests.length !== 0) && (
                        <List>
                            {interests.map(interest =>
                            <ListItem>
                                <ListItemAvatar className={classes.avatarContainer}>
                                    <Avatar
                                        className={classes.avatar}>{interest.subClubName[0].toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={interest.subClubName}
                                            secondary={`% ${interest.interestRate}`}/>
                            </ListItem>
                            )}
                        </List>)}
                    {(interests.length === 0) && (
                        <p style={{marginLeft:"2vh"}}>{isSelf ? ("Not enrolled to any sub-club yet.") : ("No common interests.")}</p>
                    )}

                </TitledSection>
            </Box>
    );
}