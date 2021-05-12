import React, {Component} from "react";
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
        this.state = {};

    }


    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        const {classes} = this.props;

        return (
            <div>
                <List className="">
                    {this.props.posts.map((post, index) => (
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
