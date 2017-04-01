const LIST = require('./biggestFiles');

///
var listLength = 25;

// directory path to walk thorugh
  // put in your own directory (mind the escape charactert)
  // example with windows path
var directory = "C:\\Users\\YOUR_USER_NAME\\Google Drive";


// TODO: solve callback hell
// THIS HERE SHOULD WORK!
// my function should return the list after
// everything was solved
// console.log( LIST.getFilesBySize(directory, listLength) );

// by now just (the log is inside the function)
LIST.getFilesBySize(directory, listLength);
