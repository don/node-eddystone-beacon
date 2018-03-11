// Simplest way to create a Eddystone-FatBeacon

// might want to include something like this https://www.npmjs.com/package/html-minify

var eddystoneBeacon = require('./../../index');
var fs = require('fs');

fs.readFile('index.html', function(err, data){
  if (!err) {
    eddystoneBeacon.advertiseFatBeacon('Fat Beacon Demo', {html: data});
  }
});
