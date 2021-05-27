import {Route, Switch} from "react-router-dom";
import PostFeed from "../component/post/PostFeed";
import HomePage from "../page/HomePage";
import React from "react";

export default function HomePageSwitch() {
    return (
        <Switch>
            <Route path="/feed/:feedName/:sort?/:page?">
                <HomePage/>
            </Route>
        </Switch>
    );
}