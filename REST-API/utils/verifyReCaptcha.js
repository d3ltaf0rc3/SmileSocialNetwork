const fetch = require("node-fetch");
const response = require("./responseGenerator");

async function verifyReCaptcha(req, res) {
    const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY;
    const humanKey = req.body.key;

    const isHuman = await fetch("https://www.google.com/recaptcha/api/siteverify", {
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
            return res.status(503).send(response("fail", `Error in Google Siteverify API. ${err.message}`));
        });

    if (humanKey === null || !isHuman) {
        return res.status(401).send(response("fail", "YOU ARE NOT A HUMAN"));
    }

    return res.send(response("success", "ReCaptcha verified successfully!"));
}

module.exports = verifyReCaptcha;