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
import {PrivateMessagingService} from "../service/PrivateMessagingService";
import {unstable_batchedUpdates} from "react-dom";

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
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState(null);
    
    useEffect(() => {
        PrivateMessagingService.getPrivateMessages().then(response => {
            console.log("PM:", response.data);
            
            setMessages(response.data)
        })
    }, []);

    useEffect(() => {
        const username = AuthService.getUsername();

        const usersSet = new Set();
        messages.forEach((message) => {
            if (message.senderUsername === username) {
                usersSet.add(message.receiverUsername);
            } else if (message.receiverUsername === username) {
                usersSet.add(message.senderUsername);
            }
        });
        const sortedUserList = [...usersSet];
        sortedUserList.sort((user1, user2) => {
            let common1 = messages.filter(
                (message) => message.senderUsername === user1 || message.receiverUsername === user1
            );
            let common2 = messages.filter(
                (message) => message.senderUsername === user2 || message.receiverUsername === user2
            );
            //console.log(common1);
            //console.log(common2);
            return Math.max.apply(Math, common2.map(message => message.created)) -
                Math.max.apply(Math, common1.map(message => message.created));
        });

        setUserList(sortedUserList);
    }, [messages]);

    useEffect(() => {
        console.log(userList);
    }, [userList])

    useEffect(() => {
        const sortedFilteredMessages = messages.filter(message => message.senderUsername === selectedUser || message.receiverUsername === selectedUser);
        sortedFilteredMessages.sort((message1, message2) => message1.timestamp <= message2.timestamp);
        setFilteredMessages(sortedFilteredMessages);
    }, [messages, selectedUser]);

    const handleSendMessage = () => {
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
                                value={messageContent}
                                id="outlined-basic-email"
                                label="Type something..."
                                onChange={(event) => setMessageContent(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab onClick={() => handleSendMessage()} color="primary" aria-label="add">
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