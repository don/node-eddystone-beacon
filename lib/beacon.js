var bleno = require('bleno'),
    advertisement = require('./advertisement'),
    header_length = 10,
    max_uri_length = 21,
    max_advertisement_length = header_length + max_uri_length;

var advertise = function(uri, options) {
    if (!options) { options = {}; }

    var advertisementData = advertisement.makeBuffer(uri, options.txPowerLevel);

    if (advertisementData.length > max_advertisement_length) {
        throw "Encoded URI must be less than " + max_uri_length +
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
    advertise: advertise
};
