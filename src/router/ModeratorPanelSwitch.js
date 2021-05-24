import {Route, Switch} from "react-router-dom";
import {CreateEvent} from "../component/mod/CreateEvent";
import {ManageEvent} from "../component/mod/ManageEvent";
import {ReportedPosts} from "../component/mod/ReportedPosts";

export default function ModeratorPanelSwitch() {
    return (
        <Switch>
            <Route path="/mod/create-event">
                <CreateEvent/>
            </Route>
            <Route path="/mod/manage-event">
                <ManageEvent/>
            </Route>
            <Route path="/mod/reported-posts">
                <ReportedPosts/>
            </Route>
        </Switch>
    );
}