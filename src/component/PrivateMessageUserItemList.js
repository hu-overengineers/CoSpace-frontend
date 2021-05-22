import PrivateMessageUserItem from "./PrivateMessageUserItem";
import List from "@material-ui/core/List";

function PrivateMessageUserItemList(props) {
  return (
  <List>
      {props.messages.map((message) => {
         if (message.source === props.username ) {
          return <PrivateMessageUserItem username={message.target}/>
         }

         else if (message.target === props.username) {
          return <PrivateMessageUserItem username={message.source}/>
         }
    })}
  </List>

  );
}
export default PrivateMessageUserItemList;
