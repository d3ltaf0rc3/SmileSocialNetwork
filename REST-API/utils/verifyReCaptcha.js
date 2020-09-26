async function verifyReCaptcha(req, res) {
    require("es6-promise").polyfill();
    require("isomorphic-fetch");

    const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY;

    const humanKey = req.body.key;

    const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`
    })
        .then(res => res.json())
        .then(json => json.success)
        .catch(err => {
            return res.status(503).send(`Error in Google Siteverify API. ${err.message}`);
        });

    if (humanKey === null || !isHuman) {
        return res.status(401).send("YOU ARE NOT A HUMAN");
    }

    return res.status(204).send();
}

module.exports = verifyReCaptcha;