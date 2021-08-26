const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Successfully connected to DB!");
    }
  );
};
