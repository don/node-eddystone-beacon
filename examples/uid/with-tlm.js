// Create a Eddystone-UID Beacon with TLM interleaved

var eddystoneBeacon = require('./../../index');

var namespaceId = '00010203040506070809';
var instanceId = 'aabbccddeeff';
var options = {
    tlmCount: 2,  // 2 TLM frames
    tlmPeriod: 10 // every 10 frames
};

eddystoneBeacon.advertiseUid(namespaceId, instanceId, options);
