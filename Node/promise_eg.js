/* -------------------PROMISES---------------------------
  - special js function which is used as a placeholder for future response
  - pending, settled, resolved, rejected
  - promize cretaed promiseState - > pending promiseResult -> UNDEFINED
  - promise resolved or rejected promiseState - > settled promiseResult -> value
  - two methods then and catch
  - then has 2 callbacks
  
*/



// const promise = new Promise(function (resolved, rejected) {
//   console.log('called');
// });
// console.log(promise);
/* ---------- OUTPUT ---------------
called
Promise { <pending> }
*/


// const promise = new Promise(function (resolved, rejected) {
//   resolved({'name': 'new'});
// });
// console.log(promise);

/* -------------------- OUTPUT ------------
Promise { { name: 'new' } }
*/
const fs = require('fs');

const promise = new Promise(function (resolved, rejected) {
    //  const xhr = new XMLHttpRequest();
    //  xhr.open('GET', 'readline_module.js', true);
    //  xhr.send();
    //  xhr.onload = () => {
    //     console.log(xhr.responseText);
    //     if(xhr.status == 200) {
    //       resolved(xhr.responseText);
    //     } else {
    //       rejected("Somehting went wrong");
    //     }
    //  }
    fs.readFile('./Files/input.txt', 'utf-8', (error, data) => {
      if(data != undefined
      ) {
        resolved(data);
      } if(error != undefined) {
        rejected('Something went wrong');
      }

    })

  });
 promise.then((data) => {
  console.log(data);
 }, (error) => console.log(error));
 promise.catch((data) => console.log('second error', data));
  