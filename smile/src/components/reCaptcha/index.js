import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = (props) => {
    const onChange = (value) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/verify/reCaptcha`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: value
            })
        })
            .then(res => {
                if (res.ok) {
                    props.setDisabled();
                }
            })
            .catch(err => console.error(err));
    };

    return <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={onChange} />
};

export default ReCaptcha;