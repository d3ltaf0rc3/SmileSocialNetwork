import React from 'react';
import { Helmet } from 'react-helmet';

const Head = (props) => {
    return (
        <Helmet>
            <meta name="description" content="Smile is an Instagram-like social network. You can create a profile and share your photos and videos with other people!" />
            <meta name="keywords" content="Smile, Smile social network, smile, social network, social, media, smile social network, social media, instagram, instagram-like network, instagram-like media, smile instagram" />
            <title>{props.title}</title>
        </Helmet>
    )
};

export default Head;