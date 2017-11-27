var fs = require('fs');
var path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");
var git = require('git-rev-sync');
var upath = require('upath');

//var folderToTest = 'C:\\GIT\\Art';

//console.log(git.long(upath.normalize(folderToTest)));

//return;

var rootFolder = "c:/GIT";


processFolder(rootFolder);

function processFolder(folder) {
  // console.log('######################################################');
  // console.log('processing ' + folder);
  // console.log('######################################################');

// Loop through all the files in the temp directory
  fs.readdir(folder, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    iterateFiles(files, folder)

  });
}

function iterateFiles(files, parentFolder) {
  files.forEach(function (folder, index) {
    // Make one pass and make the folder complete
    var fromPath = path.join(parentFolder, folder);

    fs.stat(fromPath, function (error, stat) {
      if (error) {
        console.error("Error stating folder.", error);
        return;
      }
      if (stat.isDirectory())
        try {
          var hash = git.long(upath.normalize(fromPath));
          console.log('The hash for ' + fromPath + ' is ' + hash);
        } catch (e){
          //console.log(fromPath + ' is not a GIT repo');
          processFolder(fromPath);
        }
    });
  });
}