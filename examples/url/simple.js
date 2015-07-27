// Simplest way to create a Eddystone-URL Beacon

var eddystoneBeacon = require('./../../index');

eddystoneBeacon.advertiseUrl('http://www.google.com');
