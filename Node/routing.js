/* ---------------- ROUTING -------------------
  - process of determining how an application responds to client requests to different endpoints 
  - file routing (www.sample.com/index.html)
  - content routing (www.sample.com/about)
*/


const http = require('http');
const fs = require('fs');

const htmlFile = fs.readFileSync('./view/index.html', 'utf-8');

const server = http.createServer((request, response) => {
    const url = request.url;
    console.log('new request', url);
    if( url == '/'  || url.toLocaleLowerCase() == '/home')  {
        response.end(htmlFile.replace('{{%content%}}', url));
    } else
    if( url.toLocaleLowerCase() == '/about')  {
        response.end(htmlFile.replace('{{%content%}}', url));
    } else
    if( url.toLocaleLowerCase() == '/contact')  {
        response.end(htmlFile.replace('{{%content%}}', url));
    } else {
        response.end('404 :) page not found');
    }
})
server.listen(8090, () => {
    console.log('server started');
})