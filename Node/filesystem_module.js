

/* ********** FILE SYSTEM ***************
   READING & WRITING TO A FILE
*/

// synchronous way executed line by line

// const fs = require("fs");
// const txt = fs.readFileSync("./Files/input.txt", 'utf-8');
// console.log('File 1 is read');

// fs.writeFileSync("./Files/input.txt", ` Data aleray present ${txt} \n Hello ${new Date()}`);
// console.log('write to file is done');

// console.log("after read & write  file");

// console.log(txt)

/* ---------------- OUTPUT -------------------
   File 1 is read
  write to file is done
  after read & write  file
*/


 // Asynchronous way 

// const fs = require("fs");
// const txt = fs.readFile("./Files/input.txt", 'utf-8', (error, data)=> {
//     console.log('File 1 is read');
// });
// console.log('After file 1 reading')

// fs.writeFile("./Files/input.txt", ` Data aleray present ${txt} \n Hello ${new Date()}`, () => {
//     console.log('file writte success');

// });
// console.log('write to file is done');

// console.log("after read & write  file");
/* -------------- OUTPUT ----------------
 After file 1 reading
write to file is done
after read & write  file
file writte success
File 1 is read
*/


/* ---------------------  CALLBACK HELP ----------
  - nested callback
  -callback is called inside anotehr callback
  - known as pyramid of DOOM
*/
const fs = require("fs");
fs.readFile("./Files/input.txt", 'utf-8', (error, data)=> {
    console.log('File 1 is read');
    fs.writeFile("./Files/input.txt", ` ${data} \n Hello ${new Date()}`, () => {
        console.log('file writte success');
        fs.readFile("./Files/input.txt", 'utf-8', (error, data)=> {
            console.log(`Written content ${data}`);
        });
    });
});
console.log('After file 1 reading')


