
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});
/* 
ENV - globbaly available used to define env in which node app is running

Set in terminal 
SET NODE_ENV = production
or with file
*/
const app = require('./app');
console.log(process.env);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server started");
});