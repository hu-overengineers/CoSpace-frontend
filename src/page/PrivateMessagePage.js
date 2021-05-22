import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const DUMMY_DATA = [
    {
        id:'1',
        timestamp:111111,
        source:'mert',
        target:'selim',
        content:'Selim nasılsın?'

    },
    {
        id:'2',
        timestamp:122222,
        source:'selim',
        target:'mert',
        content:'İyiyim sen nasılsın?',
    },
    {
        id:'3',
        timestamp:133333,
        source:'mert',
        target:'selim',
        content:'İyiyim. Sorduğun için teşekkür ederim.',
    },
    {
        id:'4',
        timestamp:144444,
        source:'mert',
        target:'samil',
        content:'Karnım acıktı, bir şeyler mi yesek?',
    },
    {
        id:'5',
        timestamp:155555,
        source:'yusuf',
        target:'mert',
        content:'Bu kıyafetin rengi nasıl?',
    },
    {
        id:'6',
        timestamp:166666,
        source:'mert',
        target:'cagatay',
        content:'Kapıyı açar mısın?',
    },
    
    
];


  const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
      },
      chatSection: {
        width: '100%',
      },
      headBG: {
          backgroundColor: '#e0e0e0'
      },
      borderRight500: {
          borderRight: '1px solid #e0e0e0'
      },
      messageArea: {
        height: '70vh',
        overflowY: 'auto'
      },
  
      marginAll: {
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(3),
          marginRight: theme.spacing(3),
      }

  }));
  



function PrivateMessageLayout() {
    const classes = useStyles();

    return (<div className={classes.marginAll}>
    <Grid container>
        <Grid item xs={12} >
            <Typography variant="h5" className="header-message">Private Message</Typography>
        </Grid>
    </Grid>
    <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
            <List>
                <ListItem button key="user1">
                    <ListItemIcon>
                    <Avatar alt="user1" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="user1"></ListItemText>
                </ListItem>
            </List>
            <Divider />
            <Divider />
            <List>
                <ListItem button key="user2">
                    <ListItemIcon>
                        <Avatar alt="user2" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="user2">user2</ListItemText>
                </ListItem>
                <ListItem button key="user3">
                    <ListItemIcon>
                        <Avatar alt="user3" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="user3">user3</ListItemText>
                </ListItem>
                <ListItem button key="user4">
                    <ListItemIcon>
                        <Avatar alt="user4" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="user4">user4</ListItemText>
                </ListItem>
            </List>
        </Grid>
        <Grid item xs={9}>
            <List className={classes.messageArea}>
                <ListItem key="1">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align="right" primary="Message 1"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="right" secondary="09:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="2">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align="left" primary="Message 2"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="left" secondary="09:31"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="3">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align="right" primary="Message 3"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="right" secondary="10:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            <Divider />
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Type something..." fullWidth />
                </Grid>
                <Grid xs={1} align="right">
                    <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  </div>
);


}
export default PrivateMessageLayout;