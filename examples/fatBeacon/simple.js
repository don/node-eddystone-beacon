// Simplest way to create a Eddystone-URL Beacon

var eddystoneBeacon = require('./../../index');

var html = "<html>" + 
      "<head>" +
        "<title>Fat Beacon Demo</title>" +
        "<meta charset='UTF-8'>" + 
        "<meta name='description' content='Fat Beacon Demo'/>" + 
       "</head>" + 
       "<body>" +
        "<h1>HelloWorld</h1>" +
        "This is a test" + 
        "<div>Adding more content to see if I can it over the MTU value</div>" + 
        "<div>Adding more content to see if I can it over the MTU value</div>" + 
        "<div>Adding more content to see if I can it over the MTU value</div>" + 
       "</body>" + 
      "</html>";

eddystoneBeacon.advertiseFatBeacon('Fat Beacon Demo', {html: html});
