import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import PrivateMessageUserItem from "../component/pm/PrivateMessageUserItem";
import PrivateMessageUserItemList from "../component/pm/PrivateMessageUserItemList";
import PrivateMessageFeed from "../component/pm/PrivateMessageFeed";
import {AuthService} from "../service/AuthService";

const messages = [
    {
        id: "1",
        timestamp: 111111,
        source: "mert",
        target: "selim",
        content: "Selim nasılsın?",
    },
    {
        id: "2",
        timestamp: 122222,
        source: "selim",
        target: "mert",
        content: "İyiyim sen nasılsın?",
    },
    {
        id: "3",
        timestamp: 133333,
        source: "mert",
        target: "selim",
        content: "İyiyim. Sorduğun için teşekkür ederim.",
    },
    {
        id: "4",
        timestamp: 144444,
        source: "mert",
        target: "samil",
        content: "Karnım acıktı, bir şeyler mi yesek?",
    },
    {
        id: "5",
        timestamp: 155555,
        source: "yusuf",
        target: "mert",
        content: "Bu kıyafetin rengi nasıl?",
    },
    {
        id: "6",
        timestamp: 166666,
        source: "mert",
        target: "cagatay",
        content: "Kapıyı açar mısın?",
    },
];

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: "100%",
    },
    headBG: {
        backgroundColor: "#e0e0e0",
    },
    borderRight500: {
        borderRight: "1px solid #e0e0e0",
    },
    messageArea: {
        height: "70vh",
        overflowY: "auto",
    },
    marginAll: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
}));

function PrivateMessagePage() {
    const classes = useStyles();

    const [userList, setUserList] = useState([]);
    const [selectedUser, setUser] = useState(null);
    const [filteredMessages, setFilteredMessages] = useState([]);

    useEffect(() => {
        const username = AuthService.getUsername();

        const usersSet = new Set();
        messages.forEach((message) => {
            if (message.source === username) {
                usersSet.add(message.target);
            } else if (message.target === username) {
                usersSet.add(message.source);
            }
        });
        const sortedUserList = [...usersSet];
        sortedUserList.sort((user1, user2) => {
            let common1 = messages.filter(
                (message) => message.source === user1 || message.target === user1
            );
            let common2 = messages.filter(
                (message) => message.source === user2 || message.target === user2
            );
            //console.log(common1);
            //console.log(common2);
            return Math.max.apply(Math, common2.map(message => message.timestamp)) -
                Math.max.apply(Math, common1.map(message => message.timestamp));
        });

        setUserList(sortedUserList);
    }, [messages]);

    useEffect(() => {
        console.log(userList);
    }, [userList])

    useEffect(() => {
        const sortedFilteredMessages = messages.filter(message => message.source === selectedUser || message.target === selectedUser);
        sortedFilteredMessages.sort((message1, message2) => message1.timestamp <= message2.timestamp);
        setFilteredMessages(sortedFilteredMessages);
    }, [selectedUser]);

    return (
        <div className={classes.marginAll}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">
                        Private Message
                    </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <PrivateMessageUserItemList
                        users={userList}
                        selectedUser={selectedUser}
                        callback={(username) => {
                            console.log("Clicked:", username);
                            setUser(username);
                        }}
                        username={AuthService.getUsername()}
                    />
                </Grid>
                <Grid item xs={9}>
                    <PrivateMessageFeed messages={filteredMessages}/>
                    <Divider/>
                    <Grid container style={{padding: "20px"}}>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-basic-email"
                                label="Type something..."
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add">
                                <SendIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default PrivateMessagePage;
