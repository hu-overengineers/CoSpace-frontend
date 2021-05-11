import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {PostService} from "../service/PostService";
import {AuthService} from "../service/AuthService";

export default class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: ""
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({editorState: editorState});
    };

    onTitleChange = (titleState) => {
        this.setState({title: titleState.target.value})
    }

    handleClose = () => {
        this.resetForm();
        this.props.setOpen(false);
    };

    share = () => {
        //const current = new Date();
        const post = {
            postTitle: this.state.title,
            postContent: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            // time: current.toLocaleString(),
            postAuthor: AuthService.getUsername(),
            postSubClubName: this.props.subclub.name
        }
        PostService.createPost(post).then(result => {
            this.props.newPostEvent();
            console.log("post created on dialog");
        })
        this.handleClose()

    }

    resetForm = () => {
        this.setState({title: ""});
        this.setState({editorState: EditorState.createEmpty()});
    }


    border_props = {
        padding: 1,
        borderColor: 'grey.500',
    };


    render() {
        const {editorState} = this.state;

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title"
                        fullWidth={true} maxWidth={"md"}>
                    <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
                    <DialogContent style={{height: '600px'}}>

                        <TextField
                            autoFocus
                            margin="dense"
                            value={this.state.title}
                            label="Title"
                            variant="outlined"
                            type="input"
                            onChange={this.onTitleChange}
                            fullWidth
                        />
                        <Box border={1} {...this.border_props}>
                            <Editor style={{height: 'auto'}}
                                    editorState={editorState}
                                    placeholder="Content"
                                    editorStyle={{height: '400px'}}
                                    onEditorStateChange={this.onEditorStateChange}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.share} color="primary">
                            Share
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}