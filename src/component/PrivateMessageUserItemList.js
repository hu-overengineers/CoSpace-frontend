import PrivateMessageUserItem from "./PrivateMessageUserItem";
import List from "@material-ui/core/List";

function PrivateMessageUserItemList(props) {
  return (
  <List>
      {props.users.map((user) => {
         return <PrivateMessageUserItem key={user} username={user}/>
    })}
  </List>

  );
}
export default PrivateMessageUserItemList;
