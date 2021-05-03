import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default Head;