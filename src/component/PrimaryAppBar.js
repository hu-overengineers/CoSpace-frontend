import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory, useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function PrimaryAppBar() {
  const classes = useStyles();
  const history = useHistory()


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography 
            variant="h6" 
            className={classes.title} 
            onClick={() => history.push("/")}
          >
            CoSpace
         </Typography>



          <IconButton
            onClick={() => history.push("/profile")}
          >
            <AccountCircle />
          </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  );
}