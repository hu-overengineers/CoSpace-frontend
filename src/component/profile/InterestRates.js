import {Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import CakeIcon from '@material-ui/icons/Cake';
import Button from "@material-ui/core/Button";
import {AuthService} from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import {PrivateMessagingService} from "../../service/PrivateMessagingService"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import {FiberNew, MeetingRoom, SupervisorAccount} from "@material-ui/icons";
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
                <TitledSection titleIcon={<FiberNew/>}
                            title={title}>
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
                    </List>
                </TitledSection>
            </Box>
    );
}