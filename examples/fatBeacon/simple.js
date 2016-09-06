// Simplest way to create a Eddystone-URL Beacon

var eddystoneBeacon = require('./../../index');

var html = "<html>" + 
      "<head>" +
        "<title>Fat Beacon Demo2</title>" +
        "<meta charset='UTF-8'>" + 
        "<meta name='description' content='Fat Beacon Demo'/>" + 
       "</head>" + 
       "<body>" +
        "<h1>HelloWorld</h1>" +
        "This is a test" + 
       "</body>" + 
      "</html>";

eddystoneBeacon.advertiseFatBeacon('Fat Beacon Demo', {html: html});
