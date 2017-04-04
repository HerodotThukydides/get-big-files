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


var createList = (directory, listLength, callback) => {

  console.log("Process started...");

  var topList = [];

  walk(directory, function(path, stat) {
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

})
.on("end", function(){
  callback(false, topList);
})
.on("error", function(err) {
  callback(err);
});
}


module.exports.getFilesBySize =  (directory, listLength) => {

  createList(directory, listLength, function(err, paths){
      if (err) console.log("there was an error", err);

      console.log("\n\nThese are the top", listLength, "files by size:\n");
      for (let i = 0; i < paths.length; i++) {
        console.log("No. ", i,"\nFile: ", paths[i].path,"\nSize: ", paths[i].size," bytes or ",  (paths[i].size /1000 /1000).toFixed(2) , "megabytes");
      }

  })

};
