import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Divider, List} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {ClubService} from "../service/ClubService";
import {subDays} from "date-fns";
import {AuthService} from "../service/AuthService";
import {MemberService} from "../service/MemberService";
import Box from "@material-ui/core/Box";
import ClubTree from "../component/common/ClubTree";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {useParams} from "react-router-dom";
import {Add, Edit, FiberNew, TrendingUp, Whatshot} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import AboutFeed from "../component/AboutFeed";
import EventContainer from "../component/event/EventContainer";
import CreatePost from "../component/CreatePost";
import EventItem from "../component/event/EventItem";
import EnrollPanel from "../component/EnrollPanel";
import RequestSubclub from "../component/RequestSubclub.js"
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import ReviewCard from "../component/meta/ReviewCard";
import Masonry from "react-masonry-css"

const useStyles = makeStyles((theme) => ({
   
}));



export default function ProfilePage() {
    const classes = useStyles();
    const params = useParams();
    const subclubname = params.subclubname;

    const [reviews, setReviews] = useState([
        {
            author: "cagatay",
            content: "Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur ipsam.",
            rating: 0,
            parentName: "parentname",
        },
        {
            author: "cagatay",
            content: "Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel.Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur Quidem soluta et consequuntur consequatur ipsam.",
            rating: 1,
            parentName: "parentname",
        },
        {
            author: "yigit",
            content: "Accusantium eum quo aut suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 2,
            parentName: "parentname"
        },
        {
            author: "asfa",
            content: "sfasfasf eum quo aut suscipit quo. Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequaturNumquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 3,
            parentName: "parentname"
        },
        {
            author: "ASFASFasf",
            content: "sfasfasadfasdfsf eum quo aut suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 4,
            parentName: "parentname"
        },
        {
            author: "WHO I AM",
            content: "sfasfasadfasdfsf eum quo Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 5,
            parentName: "parentname"
        },
        {
            author: "WHO I AM",
            content: "sfasfasadfasdfsf eum quo Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 6,
            parentName: "parentname"
        },
        {
            author: "WHO I AM",
            content: "sfasfasadfasdfsf eum quo Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 7,
            parentName: "parentname"
        },
        {
            author: "WHO I AM",
            content: "sfasfasadfasdfsf eum quo Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 8,
            parentName: "parentname"
        },
        {
            author: "WHO I AM",
            content: "sfasfasadfasdfsf eum quo Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 9,
            parentName: "parentname"
        },
        {
            author: "WHO I AM",
            content: "sfasfasadfasdfsf eum quo Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 10,
            parentName: "parentname"
        },
    ]);

    
    return (
        <Container>
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {reviews.map(review => (
                    <div key={review.author}>
                        <ReviewCard review={review}/>
                    </div>       
                ))}    
            </Masonry>
        </Container>
    )
}