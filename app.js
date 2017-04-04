const LIST = require('./biggestFiles');

// No of elements on the output list
var listLength = 25;

// directory path to walk thorugh
  // put in your own directory (mind the escape charactert)
  // example with windows path
var directory = "C:\\Users\\YOURNAME\\Google Drive";

LIST.getFilesBySize(directory, listLength);
