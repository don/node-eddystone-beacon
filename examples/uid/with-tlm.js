// Create a Eddystone-UID Beacon with TLM interleaved

var eddystoneBeacon = require('./../../index');

var namespaceId = '00010203040506070809';
var instanceId = 'aabbccddeeff';
var options = {
    tlmPeriod: 10
};

eddystoneBeacon.advertiseUid(namespaceId, instanceId, options);
