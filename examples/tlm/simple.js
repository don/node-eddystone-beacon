// Simplest way to create a Eddystone-TLM Beacon

var eddystoneBeacon = require('./../../index');

eddystoneBeacon.advertiseTlm(500, -128, 100, 200);
