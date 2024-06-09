const express = require("express");
const morgan = require("morgan"); // third party middleware
//route files
const userroutes = require("./routes/userRoute");
const app = express();
app.use(express.json());
app.use(morgan("dev")); //used to log http requests and response
app.use("/users", userroutes);
app.use(express.static('./public')) // used to access static html files can't be accessed without this
module.exports = app;
