const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
/* 
ENV - globbaly available used to define env in which node app is running

Set in terminal 
SET NODE_ENV = production
or with file
*/
const app = require("./app");
const port = process.env.PORT;

mongoose
  .connect(process.env.CONN_STRING)
  .then((conn) => {
    console.log("DB CONNECION SUCCESS");
  })
  .catch((error) => {
    console.log("something went wrong :", error);
  });

app.listen(port, () => {
  console.log("server started");
});
