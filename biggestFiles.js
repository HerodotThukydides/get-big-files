// path walker modue
const walk = require("walkdir");

// filesystem module
const fs = require("fs");

// Get File Size
function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

module.exports.getFilesBySize =  (directory, listLength) => {
  // Output List
  var topList = [];

  // walk to structure (async with path callback)
  walk(directory ,function(path,stat){
    // Get size of this specific file
    let fileSize = getFilesizeInBytes(path);

    // less then X files => push it into the array structure
    if (topList.length <= listLength){
      // push into datastructure
      topList.push({"path" : path, "size" : fileSize});

      // sort in descending order b "size" value
        // see also: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      topList.sort( (a, b) => {
        return parseInt(b.size) - parseInt(a.size);
      });
    }

    // more than 10 files => check the size and see if it is bigger than the smallest
    else{
      // compare the current file with the smallest file in the topList object
      if ( fileSize > topList[ listLength ].size ){
        // replace the values of the smallest obeject with the current
        topList[ listLength ].size = fileSize;
        topList[ listLength ].path = path;
        // sort the list again
        topList.sort( (a, b) => {
          return parseInt(b.size) - parseInt(a.size);
        });
      }
    }

    //  console.log("Size: ", fileSize, " found: ", path);
    console.log("\n\nThese here are the top ", listLength, " files by size:\n",topList);

  });
};
