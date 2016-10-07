/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var https = require('https');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
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

  var getFromGitHubAsync = function getFromGitHubAsync(profileName) {
    return new Promise(function(resolve, reject) {
      https.get('https://api.github.com/users/' + profileName, function(response) {
        var result = [];
        response.on('data', function(chunk) {
          result.push(chunk);
        });
        response.on('end', function() {
          result = Buffer.concat(result).toString();
          resolve(result);
        });
        response.on('error', function(e) {
          reject(e);
        });
      });
    });
  };

  var writeProfileToFile = function writeProfileToFile(data) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(writeFilePath, data, function(e) {
        if (e) {
          reject(e);
        }
        resolve('success!');
      });
    });
  };

  return readFirstLineAsync(readFilePath).then(getFromGitHubAsync).then(writeProfileToFile);
};

fetchProfileAndWriteToFile('/Users/student/username.txt', '/Users/student/profile.txt');
//
// // Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
