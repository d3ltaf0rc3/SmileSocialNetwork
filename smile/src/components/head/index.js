import React from 'react';
import { Helmet } from 'react-helmet';

const Head = (props) => {
    return (
        <Helmet>
            <meta name="description" content="Smile is a Instagram-like social network. You can create a profile and share your pictures with your friends!"/>
            <title>{props.title}</title>
        </Helmet>
    )
};

export default Head;