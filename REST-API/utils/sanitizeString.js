function sanitizeString(str) {
    str = str.replace(/[^\w.]/gim, "");
    return str.trim();
}

module.exports = sanitizeString;