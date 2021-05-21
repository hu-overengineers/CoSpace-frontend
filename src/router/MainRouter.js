import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../page/HomePage";
import AdminPage from "../page/AdminPage";
import ProfilePage from "../page/ProfilePage";
import NotFoundPage from "../page/NotFoundPage";
import SignUpPage from "../page/SignUpPage";
import SignInPage from "../page/SignInPage";
import EnrollPage from "../page/EnrollPage";



export default function MainRouter() {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route path="/admin">
                        <AdminPage/>
                    </Route>
                    <Route path="/profile">
                        <ProfilePage/>
                    </Route>
                    <Route path="/sign-up">
                        <SignUpPage/>
                    </Route>
                    <Route path="/sign-in">
                        <SignInPage/>
                    </Route>
                    <Route path="/enroll">
                        <EnrollPage/>
                    </Route>
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </MainLayout>
        </Router>
    );
}