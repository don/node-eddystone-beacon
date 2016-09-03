// Simplest way to create a Eddystone-URL Beacon

var eddystoneBeacon = require('./../../index');

var html = "<html>" + 
      "<head>" +
       "<title>Fat Beacon Demo</title>" +
       "<meta name='description' content='FatBeacon Demo'/>"
      "</head>" + 
      "<body>" +
       "<h1>HelloWorld</h1>"
      "</body>" + 
       "</html>";

eddystoneBeacon.advertiseFatBeacon('Fat Beacon Demo', {html: html});
