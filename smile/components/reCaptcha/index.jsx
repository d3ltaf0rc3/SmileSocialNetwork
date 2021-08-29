import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptcha = ({ setChecked }) => {
  const onChange = (key) => {
    fetch(`${window.location.origin}/api/verifyReCaptcha`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      })
      .catch(() => setChecked(false));
  };

  return <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_SITE_KEY} onChange={onChange} />;
};

export default ReCaptcha;
