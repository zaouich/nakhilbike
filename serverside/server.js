const app = require("./app");
const dotenv = require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const DB = process.env.DB;
app.listen(3000, () => {
  console.log("listning to the port 3000...");
  mongoose.connect(DB).then(() => {
    console.log("db connected");
  });
});
module.exports = app;
