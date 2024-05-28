/* ---------------- ROUTING -------------------
  - process of determining how an application responds to client requests to different endpoints 
  - file routing (www.sample.com/index.html)
  - content routing (www.sample.com/about)
*/


const http = require('http');
const fs = require('fs');

const htmlFile = fs.readFileSync('./view/index.html', 'utf-8');
let jsonFile = fs.readFileSync('./data/products.json', 'utf-8');
const productFile = fs.readFileSync('./view/product.html', 'utf-8');
console.log(productFile);
jsonFile = JSON.parse(jsonFile);
const productsArray = jsonFile.map((e) => {
    let output = productFile.replace('{{%productName%}}', e['name']);
    output = output.replace('{{%description%}}', e['description']);
    return output;
})
const server = http.createServer((request, response) => {
    const url = request.url;
    console.log('new request', url);
    if( url == '/'  || url.toLowerCase() == '/home')  {
        //write headers
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'sample': 'new-hreaser'
        });
        response.end(htmlFile.replace('{{%content%}}', url));
    } else
    if( url.toLowerCase() == '/about')  {
        response.end(htmlFile.replace('{{%content%}}', url));
    } else
    if( url.toLowerCase() == '/contact')  {
        response.end(htmlFile.replace('{{%content%}}', url));
    } if( url.toLowerCase() == '/productsJson') {
        response.writeHead(200, {
            'Content-Type' :'application/json'
        })
      
        response.end(JSON.stringify(jsonFile));
    } 
    if( url.toLowerCase() == '/products') {
        response.writeHead(200, {
            'Content-Type' :'text/html'
        })
        const contentToDisplay = productsArray.join('');
        response.end(contentToDisplay);
    } 
     else {
        response.writeHead(404);
        response.end('404 :) page not found');
    }
})
server.listen(8090, () => {
    console.log('server started');
})