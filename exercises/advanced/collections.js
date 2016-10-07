var fs = require('fs');
var Promise = require('bluebird');
/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var readFirstLineAsync = function readFirstLineAsync(readFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, function(error, data) {
      if (error) {
        reject(error);
      }
      data = data.toString();
      data = data.slice(0, data.indexOf('\n'));
      resolve(data);
    });
  });
};


var combineFirstLineOfManyFiles = function(filePaths, writePath) {

  var writeArrayToFileAsync = function writeArrayToFileAsync(array) {
    return new Promise(function(resolve, reject) {
      var text = array.join('\n');
      fs.writeFile(writePath, text, function(e) {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  };


  return Promise.all(filePaths.map(filePath => readFirstLineAsync(filePath))).then(writeArrayToFileAsync).catch(console.log.bind(console));
};
//
// var filePaths = ['/Users/student/Documents/2016-09-promises/testdata/file1.txt', '/Users/student/Documents/2016-09-promises/testdata/file2.txt', '/Users/student/Documents/2016-09-promises/testdata/file3.txt'];
// var writePath = '/Users/student/Documents/2016-09-promises/testdata/results.txt';
// combineFirstLineOfManyFiles(filePaths, writePath);
// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
