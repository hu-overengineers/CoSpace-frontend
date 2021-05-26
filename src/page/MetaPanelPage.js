import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {useParams} from "react-router-dom";
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

  


    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ReviewService.getReviews(subclubname).then(response => {
            console.log("get reviews", response.data);
            setReviews(response.data);
        });
    }, [])

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