import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AuthService} from "../../service/AuthService";
import {formatRelative, format, formatDistance} from "date-fns";


const useStyles = makeStyles((theme) => ({
    messageArea: {
        height: "70vh",
        overflowY: "auto",
    },
}));


function PrivateMessageFeed({messages}) {

    const classes = useStyles();

    return (
        <List className={classes.messageArea}>
            {messages.map(message =>
                <ListItem key={message.id}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText
                                align={message.source === AuthService.getUsername() ? "right" : "left"}
                                primary={message.content}
                            ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align={message.source === AuthService.getUsername() ? "right" : "left"}
                                          secondary={format(new Date(message.timestamp), "dd.MM.yyyy HH:mm")}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>)}
        </List>
    );
}


export default PrivateMessageFeed;