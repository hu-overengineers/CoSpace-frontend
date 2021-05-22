import {Route, Switch} from "react-router-dom";
import PostFeed from "../component/post/PostFeed";

export default function PostFeedSwitch() {
    return (
        <Switch>
            <Route path="/feed/:feedName">
                <PostFeed/>
            </Route>
        </Switch>
    );
}