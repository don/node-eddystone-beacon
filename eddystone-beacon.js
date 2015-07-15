var uriEncoder = require('./lib/uriEncoder');
var advertisement = require('./lib/advertisement');
var beacon = require('./lib/beacon');

module.exports = {
    encode: uriEncoder.encode,
    makeBuffer: advertisement.makeBuffer,
    advertise: beacon.advertise
};
