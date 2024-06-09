/* -----------------------------CREATING SERVER ------------------
STEP 1 : start serveR
*/
const http = require('http');
const server  = http.createServer((request, response) => {
   console.log('some input');
   // write appends
   response.write('hello');
   //returns with header content and body
   response.end('welcome to page');
});
//step 2  : listen to it
server.listen(8045, () => {
  console.log('server started');
})