import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

function PrivateMessageUserItem(props) {
  const classes = useStyles();

  return (
    <ListItem
      button
      className={classes.root}
      selected={props.selected}
      key={props.username}
      onClick={() => props.callback(props.username)}
    >
      <ListItemIcon>
        <Avatar alt={props.username}>
          {" "}
          {props.username[0].toUpperCase()}{" "}
        </Avatar>
      </ListItemIcon>
      <ListItemText primary={props.username}>{props.username}</ListItemText>
    </ListItem>
  );
}
export default PrivateMessageUserItem;
