const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Successfully connected to DB!");
    }
  );
};
