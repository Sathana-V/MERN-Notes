



/* 
  // EXEUTED IN MAIN THREAD
console.log('program started');
// STORED IN PHRASE 1
setTimeout(() => {
    console.log('after timeout')
}, 0);
// STORED IN PHRASE 3
setImmediate(() => console.log('Immediate function'));
// EXeuted IN MAIN THREAD
console.log('program ended');


  - first sync codes executed in main thread
  - after main thread completes goes to phase 1
  - as settimeout is ready to execute it gets execeutedd
  - Then moves to phase 3 qnd immediate efunction executes

  OUTPUT:
    program started
    program ended
    after timeout
    Immediate function
*/

// EXEUTED IN MAIN THREAD
console.log('program started');
// STORED IN PHRASE 2
const fs = require('fs');
fs.readFile('./Files/input.txt', 'utf-8', () => {
    console.log('after read file');
    // PHASE 1
    setTimeout(() => {
        console.log('after timeout')
    }, 0);
    // STORED IN PHRASE 3
    setImmediate(() => console.log('Immediate function'));
    // process.nextTick(() => console.log('next tick function')) executed  before immediate (right aftre current phase completes)
})

// EXeuted IN MAIN THREAD
console.log('program ended');


/* - first sync codes executed in main thread
  - after main thread completes goes to phase 2 file read once it is ready to execute goes to pahse 3
 
  - Then moves to phase 3 qnd immediate efunction executes
  - as settimeout is ready to execute it gets execeutedd

  OUTPUT:
  program started
  program ended
  after read file
  Immediate function
  after timeout */