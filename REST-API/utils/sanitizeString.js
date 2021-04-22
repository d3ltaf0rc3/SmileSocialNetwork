function sanitizeString(str) {
    let string = str;
    string = string.replace(/[^\w.]/gim, "");
    string = string.replace(/\./gim, "\\.");
    return string.trim();
}

module.exports = sanitizeString;