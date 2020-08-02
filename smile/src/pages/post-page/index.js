import React, { useEffect, useState } from 'react';
import Post from '../../components/post-components';
import { withRouter } from 'react-router-dom';
import PostContext from '../../contexts/PostContext';

const PostPage = (props) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:7777/api/posts/get-post/${props.match.params.id}`)
            .then(res => res.json())
            .then(post => setPost(post))
            .catch(err => console.error(err));
    }, [props.match.params.id]);

    return (
        <PostContext.Provider value={{ post }}>
            <Post />
        </PostContext.Provider>
    )
};

export default withRouter(PostPage);