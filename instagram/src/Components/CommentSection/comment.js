import React from "react";
import PropTypes from "prop-types";
import CommentBox from "./commentbox";
import "./comment.css";
import Username from "../Styles/reusable";
import styled from "styled-components";

const CommentText = styled.div`
    margin: 5px 0;
`

const TimeStamp = styled.div`
    font-size: .8rem;
    color: grey;
`
//comments component maps over the comment array and passes that data to comment component
class Comments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            input: "",
            comments: this.props.comment,
            likes: this.props.likes,
            likedFlag: false,
        }
    }
    //tracks user input for the comment section
    handleInput = (event) => {
        this.setState({input: event.target.value})
    }

    /*adds comment to any post
    if the username of the current post matches the comment box we are adding the comment to, the new comment is pushed as an addition to the comment section. Otherwise the orginal post is returned
    */
    addNewComment = () => {
        let data = {
            username: localStorage.getItem("user"),
            text: this.state.input,
        }
        this.state.comments.push(data)
        //attempted stretch goal not working as intended
        // localStorage.setItem("comment", JSON.stringify(this.state.comments))
        // let newComments = JSON.parse(localStorage.getItem("comment"))
        this.setState({
            comments: this.state.comments,
            input: "",
        })
    }

    //increases likes for heart click
    increment = () => {
        if(!this.state.likedFlag){
            this.setState(prevState => ({
                likedFlag: true,
                likes: prevState.likes + 1,
            }))
        }else {
            this.setState(prevState => ({
                likedFlag: false,
                likes: prevState.likes - 1}))
        }
    }
    render() {
        return (
            <>
                <div>
                    <i className="far fa-heart fa-3x" onClick={() => this.increment()}></i>
                    <i className="far fa-comment fa-3x"></i>
                </div>
                <Username size="1rem" weight="bold">{this.state.likes} likes</Username>
                {this.state.comments.map((comment) => {
                    return (
                    <CommentText key={comment.text}>
                        <Username size="1rem" weight="bold">{comment.username}</Username>
                        <Username size="1rem">{comment.text}</Username>
                    </CommentText>
                    )
                })}
                <TimeStamp>
                    {this.props.time}
                </TimeStamp>
                <CommentBox 
                    text={this.state.input}
                    input={this.handleInput}
                    add={this.addNewComment}
                />
            </>
        )
    }
}

Comments.propTypes = {
    likes: PropTypes.number,
    comment: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string,
            text: PropTypes.string,
        })
    ).isRequired
}

export default Comments;