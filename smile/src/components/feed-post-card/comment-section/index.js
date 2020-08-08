import React from 'react';
import Comment from '../comment';

const CommentSection = (props) => {
    if (!props.comments) {
        return <div></div>
    }

    return (
        <ul>
            {props.description ? <Comment key="description" author={props.creator} comment={props.description} /> : null}
            {props.comments.map(comment => <Comment key={comment._id} author={comment.postedBy.username} comment={comment.comment} />)}
        </ul>
    )
};

export default CommentSection;