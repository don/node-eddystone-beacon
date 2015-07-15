var bleno = require('bleno'),
    advertisement = require('./advertisement'),
    HEADER_LENGTH = 13,
    MAX_URL_LENGTH = 18,
    MAX_ADVERTISEMENT_LENGTH = HEADER_LENGTH + MAX_URL_LENGTH;

var advertiseUrl = function(url, options) {
    if (!options) { options = {}; }

    var advertisementData = advertisement.makeUrlBuffer(url, options.txPowerLevel);

    if (advertisementData.length > MAX_ADVERTISEMENT_LENGTH) {
        throw "Encoded URL must be less than " + MAX_URL_LENGTH +
            " bytes. It is currently " + advertisementData.length + " bytes.";
    }

    var advertiseOnPowerOn = function() {
        if (bleno.state === 'poweredOn') {

            if (bleno.startAdvertisingWithEIRData) {
                bleno.startAdvertisingWithEIRData(advertisementData);
            } else {
                throw new Error('Your platform is not supported!');
            }
        } else {
          bleno.once('stateChange', advertiseOnPowerOn);
        }
    };

    advertiseOnPowerOn();
};

module.exports = {
    advertiseUrl: advertiseUrl
};
