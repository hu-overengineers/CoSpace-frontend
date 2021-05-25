import React, {useEffect, useState} from 'react';
import {Divider} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import ClubTree from '../component/common/ClubTree';
import Box from "@material-ui/core/Box";
import {AccountCircle, BorderClear, FiberNew, PublicOutlined, TrendingUp} from "@material-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import PostFeed from "../component/post/PostFeed";
import {MemberService} from "../service/MemberService";
import AboutMember from "../component/profile/AboutMember";
import {useParams} from "react-router-dom";
import {AuthService} from "../service/AuthService";




export default function ProfilePage() {
    const params = useParams();
    const subclubname = params.subclubname;

    return (<Box>MetaPanel of {subclubname}</Box>)
}