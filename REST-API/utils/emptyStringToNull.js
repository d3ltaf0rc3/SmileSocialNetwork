const emptyStringToNull = (req) => {
    const body = JSON.parse(JSON.stringify(req.body));

    for (const key in body) {
        if (body[key] === "") {
            body[key] = null;
        }
    }

    return body;
};

module.exports = emptyStringToNull;
