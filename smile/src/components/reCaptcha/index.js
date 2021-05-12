import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = (props) => {
    const onChange = (key) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/user/verify/reCaptcha`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key
            })
        })
            .then(res => {
                if (res.ok) {
                    props.setChecked(true);
                } else {
                    props.setChecked(false);
                }
            })
            .catch(err => console.error(err));
    };

    return <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={onChange} />
};

export default ReCaptcha;