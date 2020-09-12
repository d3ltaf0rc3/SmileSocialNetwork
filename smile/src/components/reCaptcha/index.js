import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = (props) => {
    const onChange = (value) => {
        fetch(`${process.env.API_URL}/api/verify/reCaptcha`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: value
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Success!") {
                    props.setDisabled();
                }
            })
            .catch(err => console.error(err));
    };

    return <ReCAPTCHA sitekey="6LfBPrsZAAAAALhleYy4u0a0Te4D6G3WewLQ3mXr" onChange={onChange} />
};

export default ReCaptcha;