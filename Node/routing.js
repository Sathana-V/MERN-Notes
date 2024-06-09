/* ---------------- ROUTING -------------------
  - process of determining how an application responds to client requests to different endpoints 
  - file routing (www.sample.com/index.html)
  - content routing (www.sample.com/about)
*/


const http = require('http');
const fs = require('fs');
const url_p = require('url');

const htmlFile = fs.readFileSync('./view/index.html', 'utf-8');
let jsonFile = fs.readFileSync('./data/products.json', 'utf-8');
const productFile = fs.readFileSync('./view/product.html', 'utf-8');
console.log(productFile);

jsonFile = JSON.parse(jsonFile);

const productsArray = jsonFile.map((e) => {
    let output = productFile.replace('{{%productName%}}', e['name']);
    output = output.replace('{{%description%}}', e['description']);
    output = output.replace('{{%id%}}', e['id']);
    return output;
});

const server = http.createServer((request, response) => {
    //pass true will convert query to object
    let {query, pathname : url} = url_p.parse(request.url, true);
    console.log(query);
    url = url.toLocaleLowerCase();
    console.log('New request:', url);

    if (url === '/' || url === '/home') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'sample': 'new-header'
        });
        response.end(htmlFile.replace('{{%content%}}', 'Home Page'));
    } else if (url === '/about') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(htmlFile.replace('{{%content%}}', 'About Page'));
    } else if (url === '/contact') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(htmlFile.replace('{{%content%}}', 'Contact Page'));
    } else if (url === '/productsjson') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(jsonFile));
    } else if (url === '/products') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        const contentToDisplay = productsArray.join('');
        response.end(contentToDisplay);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('404 :) Page not found');
    }
});

server.listen(8090, () => {
    console.log('Server started on port 8090');
});
