/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, cb) {
  // TODO
  fs.readFile(filePath, function(e, data) {
    if (e) {
      cb(e, data);
    }
    data = data.toString();
    data = data.slice(0, data.indexOf('\n'));
    cb(e, data);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request(url, function(error, response, body) {
    if (error) {
      callback(error);
    } else {
      callback(error, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
