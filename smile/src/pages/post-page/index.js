import React, { useEffect, useState } from 'react';
import Post from '../../components/post-components';
import { withRouter } from 'react-router-dom';
import PostContext from '../../contexts/PostContext';

const PostPage = (props) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        
        fetch(`http://localhost:7777/api/posts/get-post/${props.id}`, {
            signal: controller.signal
        })
            .then(res => res.json())
            .then(post => setPost(post))
            .catch(err => {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            });
        return () => {
            controller.abort();
        };
    }, [props.id, post]);

    return (
        <PostContext.Provider value={{ post }}>
            <Post closeImage={props.closeImage} />
        </PostContext.Provider>
    )
};

export default withRouter(PostPage);