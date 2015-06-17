var advertisement = require('./lib/advertisement');
var beacon = require('./lib/beacon');

module.exports = {
    makeBuffer: advertisement.makeBuffer,
    advertise: beacon.advertise
};
