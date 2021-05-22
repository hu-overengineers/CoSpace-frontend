import { Avatar, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";


function PrivateMessageUserItem(props) {
  return (
    <ListItem button key={props.username}>
      <ListItemIcon>
        <Avatar alt={props.username}> {props.username[0].toUpperCase()} </Avatar>
      </ListItemIcon>
      <ListItemText primary={props.username}>{props.username}</ListItemText>
    </ListItem>
  );
}
export default PrivateMessageUserItem;
