import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../page/HomePage";
import AdminPage from "../page/AdminPage";
import ProfilePage from "../page/ProfilePage";
import NotFoundPage from "../page/NotFoundPage";
import SignUpPage from "../page/SignUpPage";
import SignInPage from "../page/SignInPage";
import PasswordResetPage from '../page/PasswordResetPage';
import PrivateMessagePage from "../page/PrivateMessagePage";
import ModeratorPage from "../page/ModeratorPage";
import MetaPanelPage from "../page/MetaPanelPage";
import SearchResultsPage from "../page/SearchResultsPage";
import SubClubRecommend from "../page/SubClubRecommend"
import HomePageSwitch from "./HomePageSwitch";


export default function MainRouter() {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <Route exact path="/">
                        <HomePageSwitch/>
                    </Route>
                    <Route path="/feed">
                        <HomePageSwitch/>
                    </Route>
                    <Route path="/admin">
                        <AdminPage/>
                    </Route>
                    <Route path="/profile/:username">
                        <ProfilePage/>
                    </Route>
                    <Route path="/sign-up">
                        <SignUpPage/>
                    </Route>
                    <Route path="/sign-in">
                        <SignInPage/>
                    </Route>
                    <Route path="/subclub-recommendation">
                        <SubClubRecommend/>
                    </Route>
                    <Route path="/password-reset/:token?">
                        <PasswordResetPage/>
                    </Route>    
                    <Route path="/pm">
                        <PrivateMessagePage/>
                    </Route>
                    <Route path="/mod">
                        <ModeratorPage/>
                    </Route>
                    <Route path="/meta/:subClubName">
                        <MetaPanelPage/>
                    </Route>
                    <Route path="/search/:query">
                        <SearchResultsPage/>
                    </Route>
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </MainLayout>
        </Router>
    );
}
