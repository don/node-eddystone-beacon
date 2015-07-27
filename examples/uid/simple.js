// Simplest way to create a Eddystone-UID Beacon

var eddystoneBeacon = require('./../../index');

eddystoneBeacon.advertiseUid('00010203040506070809', 'aabbccddeeff');
