import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

import {Divider, List} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";

import {useParams} from "react-router-dom";
import AboutFeed from "../component/AboutFeed";
import ReviewCard from "../component/meta/ReviewCard";
import SummaryCard from "../component/meta/SummaryCard";
import Masonry from "react-masonry-css"
import { ReviewService } from "../service/ReviewService";

const useStyles = makeStyles((theme) => ({
    summaryContainer: {
        paddingTop: theme.spacing(3),
    }
}));



export default function MetaPanelPage() {
    const classes = useStyles();
    const params = useParams();
    const subclubname = params.subclubname;

    useEffect(() => {
        ReviewService.getReviews(subclubname).then(response => {
            console.log(response.data);
        });
    }, [])


    const [reviews, setReviews] = useState([
        {
            author: "cagatay",
            content: "Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur ipsam.",
            rating: 5,
            date: "September 14, 2016",
            parentName: "parentname",
        },
        {
            author: "cagatay",
            content: "Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel.Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur Quidem soluta et consequuntur consequatur ipsam.",
            rating: 5,
            date: "September 14, 2016",
            parentName: "parentname",
        },
        {
            author: "cagatay",
            content: "Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel.Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur Quidem soluta et consequuntur consequatur ipsam.",
            rating: 5,
            date: "September 14, 2016",
            parentName: "parentname",
        },
        {
            author: "cagatay",
            content: "Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel.Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur Quidem soluta et consequuntur consequatur ipsam.",
            rating: 4,
            date: "September 14, 2016",
            parentName: "parentname",
        },
        {
            author: "yigit",
            content: "Accusantium eum quo aut suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating:3,
            date: "September 14, 2016",
            parentName: "parentname"
        },
        {
            author: "yigit",
            content: "Accusantium eum quo aut suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 2,
            date: "September 14, 2016",
            parentName: "parentname"
        },
        {
            author: "yigit",
            content: "Accusantium eum quo aut suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 5,
            date: "September 14, 2016",
            parentName: "parentname"
        },
        {
            author: "yigit",
            content: "Accusantium eum quo aut suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 3,
            date: "September 14, 2016",
            parentName: "parentname"
        },
        {
            author: "yigit",
            content: "Accusantium eum quo aut suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 3,
            date: "September 14, 2016",
            parentName: "parentname"
        },
        {
            author: "cagatay",
            content: "Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel.Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur Quidem soluta et consequuntur consequatur ipsam.",
            rating: 2,
            date: "September 14, 2016",
            parentName: "parentname",
        },
        
        {
            author: "WHO I AM",
            date: "September 14, 2021",
            content: "sfasfasadfasdfsf eum quo Minus earum neque. Earum distinctio corrupti odio harum et officia. Iusto distinctio ad ex ab eligendi. Qui praesentium vel. Quidem soluta et consequuntur consequatur suscipit quo. Numquam aut cum aut quis aperiam totam quaerat. Delectus numquam cupiditate recusandae earum est est nemo. Eaque molestias impedit eligendi.",
            rating: 1,
            parentName: "parentname"
        },
    ]);

    

    return (
        
        <Container>

            <Container className={classes.summaryContainer}>
                <SummaryCard subClubName = {subclubname} reviews={reviews}/>
            </Container>
        

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

        </Container>
    )
}