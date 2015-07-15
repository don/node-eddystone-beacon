var urlEncoder = require('./lib/urlEncoder');
var advertisement = require('./lib/advertisement');
var beacon = require('./lib/beacon');

module.exports = {
    encodeUrl: urlEncoder.encode,
    makeUrlBuffer: advertisement.makeUrlBuffer,
    advertiseUrl: beacon.advertiseUrl
};
