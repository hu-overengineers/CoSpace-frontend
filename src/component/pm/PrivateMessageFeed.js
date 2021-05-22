import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import React, {useEffect, useRef} from "react";
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

    const scrollRef = useRef(null);

    /* whenever the list changes we need to scroll our
       last list item into view */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [messages]);

    return (
        <List className={classes.messageArea} >
            {messages.map(message =>
                <ListItem key={message.id}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText
                                align={message.senderUsername === AuthService.getUsername() ? "right" : "left"}
                                primary={message.content}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align={message.senderUsername === AuthService.getUsername() ? "right" : "left"}
                                          secondary={format(new Date(message.created), "dd.MM.yyyy HH:mm")}/>
                        </Grid>
                    </Grid>
                </ListItem>)}
            {/* this is the last item that scrolls into
             view when the effect is run */}
            <li ref={scrollRef} />
        </List>
    );
}


export default PrivateMessageFeed;