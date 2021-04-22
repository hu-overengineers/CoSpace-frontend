import React, {Component} from "react";
import {PostService} from "../service/PostService";
import {PostFeedItem} from "./PostFeedItem";
import {List} from '@material-ui/core';
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core/styles";


const useStyles = theme => ({
    feedItem: {
        marginBottom: theme.spacing(2),
    },
})


class PostFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };

    }


    componentDidMount() {
        this.getPosts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refresh !== this.props.refresh) {
            console.log('refreshing the feed')
            console.log(this.props.subclub);
            this.getPosts();
        }
    }

    getPosts = () => {
        const temp_posts = [];

        for (let i = 0; i < 100; i++) {
            temp_posts.push({
                postTitle: "This is a very entertaining post",
                postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo commodo ante," +
                    " a malesuada nunc bibendum vitae. Sed non nulla viverra, aliquet nibh a, ultricies lorem." +
                    " Praesent quis mattis odio, eu egestas urna. Nunc porta felis orci, non ornare est aliquet aliquet." +
                    " Suspendisse consectetur nulla sit amet ligula gravida, et vestibulum dui suscipit. Aliquam ac metus" +
                    " venenatis, maximus nisi vel, dapibus nisi. Vestibulum laoreet hendrerit urna, et ultrices nunc laoreet" +
                    " ac. Nullam vestibulum turpis ac tellus sollicitudin vulputate. Nulla placerat non orci at tempor. In" +
                    " iaculis sodales mi, a ultricies eros gravida in. Donec et risus sit amet dui dignissim efficitur sit" +
                    " amet non ipsum. Nulla vitae arcu sem. Vivamus sed bibendum augue.",
                time: "September 14, 2016",
                postAuthor: "jane_doe",
                uid: `${i}`
            })
        }


        PostService.getPosts(this.props.subclub).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].time = "September 14, 2016";
                response.data[i].uid = i;
            }
            this.setState({posts: response.data});
        })

    }


    render() {
        const {classes} = this.props;

        return (
            <div>
                <List className="">
                    {this.state.posts.map((post, index) => (
                        <Box key={post.uid} className={classes.feedItem}>
                            {<PostFeedItem props={post}/>}
                        </Box>
                    ))}
                </List>
            </div>
        );
    }
}


export default withStyles(useStyles)(PostFeed);
