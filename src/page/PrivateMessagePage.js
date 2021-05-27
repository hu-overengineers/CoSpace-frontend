import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import PrivateMessageUserItemList from "../component/pm/PrivateMessageUserItemList";
import PrivateMessageFeed from "../component/pm/PrivateMessageFeed";
import {AuthService} from "../service/AuthService";
import {PrivateMessagingService} from "../service/PrivateMessagingService";
import {unstable_batchedUpdates} from "react-dom";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    divider: {

    },
    chatSection: {
        width: "100%",
    },
    headBG: {
        backgroundColor: "#e0e0e0",
    },
    borderRight500: {
        borderRight: `1px solid ${theme.palette.secondary.dark}`,
    },
    messageArea: {
        height: "70vh",
        overflowY: "auto",
    },
    marginAll: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(12),
        marginRight: theme.spacing(12),
    },
    title: {
        marginBottom: theme.spacing(2)
    },
}));

function PrivateMessagePage() {
    const classes = useStyles();

    const [userList, setUserList] = useState([]);
    const [selectedUser, setUser] = useState(null);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState(null);

    useEffect(() => {
        PrivateMessagingService.getPrivateMessages().then(response => {
            console.log("PM:", response.data);
            setMessages(response.data);
        })
    }, []);

    useEffect(() => {
        const self = AuthService.getUsername();

        const usersSet = new Set();
        messages.forEach((message) => {
            if (message.senderUsername === self) {
                usersSet.add(message.receiverUsername);
            } else if (message.receiverUsername === self) {
                usersSet.add(message.senderUsername);
            }
        });
        let sortedUserList = [...usersSet];

        sortedUserList.sort((user1, user2) => {
            let common1 = messages.filter(
                (message) => (message.senderUsername === user1 || message.receiverUsername === user1) 
            );
            let common2 = messages.filter(
                (message) => (message.senderUsername === user2 || message.receiverUsername === user2)
            );

            return Math.max.apply(Math, common2.map(message => new Date(message.created).getTime())) -
                Math.max.apply(Math, common1.map(message => new Date(message.created).getTime()));
        });

        sortedUserList = sortedUserList.filter(user => {
            let receivedMessages = messages.filter(message => message.senderUsername === user && message.receiverUsername === self);
            if (receivedMessages.length === 1) {
                return receivedMessages[0].content !== "";
            } else {
                return true;
            }
        });

        setUserList(sortedUserList);
    }, [messages]);

    useEffect(() => {
        console.log("User List:", userList);
        if (selectedUser === null && userList.length > 0) setUser(userList[0]);
    }, [userList])

    useEffect(() => {
        let sortedFilteredMessages = messages.filter(message => message.senderUsername === selectedUser || message.receiverUsername === selectedUser);
        sortedFilteredMessages.sort((message1, message2) => message1.timestamp <= message2.timestamp);
        sortedFilteredMessages = sortedFilteredMessages.filter(message => message.content !== "");
        setFilteredMessages(sortedFilteredMessages);
    }, [messages, selectedUser]);

    const handleSendMessage = () => {
        if (messageContent === null || messageContent === "") return;
        PrivateMessagingService.send(selectedUser, messageContent).then(response => {
            const aux = messages.slice();
            aux.push(response.data);
            unstable_batchedUpdates(() => {
                setMessages(aux);
                setMessageContent("");
            })
        })
    }

    return (
        <div className={classes.marginAll}>
            <Grid container className={classes.title}>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">
                        Private Messages
                    </Typography>
                </Grid>
            </Grid>
            <Paper variant={"outlined"}>
                <Grid container className={classes.chatSection}>
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
                        <Divider className={classes.divider}/>
                        <Grid container style={{padding: "20px"}}>
                            <Grid item xs={11}>
                                <TextField
                                    value={messageContent}
                                    label="Type something..."
                                    onChange={(event) => setMessageContent(event.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1} align="right">
                                <Fab disabled={selectedUser === null} onClick={() => handleSendMessage()} color="primary" aria-label="add">
                                    <SendIcon/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default PrivateMessagePage;
