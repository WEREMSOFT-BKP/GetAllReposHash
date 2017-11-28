var fs = require('fs');
var path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");
var git = require('git-rev-sync');
var upath = require('upath');

//var folderToTest = 'C:\\GIT\\Art';

//console.log(git.long(upath.normalize(folderToTest)));

//return;

var rootFolder = "c:/GIT-0.0.3-TEC";

processFolder(rootFolder);

function processFolder(folder) {

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
          var branch = git.branch(upath.normalize(fromPath));
          const simpleGit = require('simple-git')(fromPath);
          var remoteRepo = simpleGit.getRemotes();

          generateCheckoutScript('cd ' + fromPath);
          generateCheckoutScript('git reset --hard');
          generateCheckoutScript('git clean -df');
          generateCheckoutScript('git clone ' + branch + ' ' + hash);
          console.log('Found GIT Repo');
          console.log('Branch ' + branch);
          console.log('Hash ' + hash);
        } catch (e){
          //console.log(fromPath + ' is not a GIT repo');
          processFolder(fromPath);
        }
    });
  });
}

function generateCheckoutScript(pCommand){
  fs.appendFile('log.txt', pCommand + '\n');
}