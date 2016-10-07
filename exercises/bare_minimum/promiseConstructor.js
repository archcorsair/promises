/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function readFirstLineAsync(readFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, function(error, data) {
      if (error) {
        reject(error);
      } else {
        data = data.toString();
        data = data.slice(0, data.indexOf('\n'));
        resolve(data);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      if (error) {
        reject(error);
      }
      resolve(response.statusCode);
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
