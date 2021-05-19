import {Route, Switch} from "react-router-dom";
import ReportedPosts from "../component/admin/ReportedPosts";
import ViewMemberInfo from "../component/admin/ViewMemberInfo";
import ManageClub from "../component/admin/ManageClub";
import CreateClub from "../component/admin/CreateClub";

export default function AdminPanelSwitch() {
    return (
        <Switch>
            <Route path="/admin/create-club">
                <CreateClub/>
            </Route>
            <Route path="/admin/manage-club">
                <ManageClub/>
            </Route>
            <Route path="/admin/view-member-info">
                <ViewMemberInfo/>
            </Route>
            <Route path="/admin/reported-posts">
                <ReportedPosts/>
            </Route>
        </Switch>
    );
}