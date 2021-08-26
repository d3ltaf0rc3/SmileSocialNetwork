function sanitizeString(str) {
    let string = str;
    string = string.replace(/[^\w.]/gim, "");
    string = string.replace(/\./gim, "\\.");
    return string;
}

module.exports = sanitizeString;
