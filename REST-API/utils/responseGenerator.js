const responseGenerator = (type, data) => {
    if (type === "success") {
        return {
            success: true,
            data,
        };
    } else if (type === "fail") {
        return {
            success: false,
            data,
        };
    }
};

module.exports = responseGenerator;
