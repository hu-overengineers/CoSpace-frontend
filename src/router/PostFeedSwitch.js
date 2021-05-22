import {Route, Switch} from "react-router-dom";
import ReportedPosts from "../component/admin/ReportedPosts";
import ViewMemberInfo from "../component/admin/ViewMemberInfo";
import ManageClub from "../component/admin/ManageClub";
import CreateClub from "../component/admin/CreateClub";
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