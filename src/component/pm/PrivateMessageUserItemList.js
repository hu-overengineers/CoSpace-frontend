import PrivateMessageUserItem from "./PrivateMessageUserItem";
import List from "@material-ui/core/List";

function PrivateMessageUserItemList(props) {
  console.log("Selected:", props.selectedUser);
  return (
  <List>
      {props.users.map((user) => {
         return <PrivateMessageUserItem selected={props.selectedUser === user} callback={props.callback} key={user} username={user}/>
    })}
  </List>

  );
}
export default PrivateMessageUserItemList;
