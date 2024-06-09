
/* ********** READLINE ***************
   READING & WRITING TO A TERMINAL
*/

// import readline module
const rl = require("readline");
//create a interface to read input from terminal
const readline= rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
// method displays the query by writing it to the output, 
// waits for user input to be provided on input,
// then invokes the callback function passing the provided input as the 
// first argument.
readline.question("Enter name", (name) => {
    console.log("you entererd", name);
    // To close input stream
    readline.close();
});
//event triggered when user close the stream 
readline.on('close', () => {
    console.log("Interface closed");
    process.exit(0)
})