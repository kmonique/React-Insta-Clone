import React from "react";
import Header from "./header";
import Img from "./img";
import Comments from "../CommentSection/comment";
import PropTypes from "prop-types";
import "./post.css";

//post component creates the header for the user post and passes the comment data to the comments component
const Post = (props) => {
    return (
        <>
            <div className="header">
                <Header post={props.post}/>
            </div>
            <Img img={props.post}/>
            <div className="comments">
                <Comments
                    postId={props.post.username}
                    comment={props.post.comments} 
                    likes={props.post.likes} 
                    text={props.text}
                    time={props.post.timestamp}
                    increment={props.increment}
                />
            </div>
        </>
    )
}

Post.propTypes = {
    post: PropTypes.shape({
        username: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        imageUrl: PropTypes.string,
        likes: PropTypes.number,
        timestamp: PropTypes.string,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                username: PropTypes.string,
                text: PropTypes.string,
            })
        )
    }).isRequired 
}

export default Post;