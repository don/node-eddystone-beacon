// use this library to encode the URL
// manually create the advertising data

var EddystoneBeacon = require('./../../eddystone-beacon'),
    bleno = require('bleno');

var template = new Buffer(13); // maximum 31 bytes
template[0] = 0x02; // Length
template[1] = 0x01; // Parameter: Flags
template[2] = 0x06;
template[3] = 0x03; // Length
template[4] = 0x03; // Parameter: Service List
template[5] = 0xAA; // Eddystone Beacon ID
template[6] = 0xFE; // Eddystone Beacon ID
template[7] = 0x00; // Length <-- must be updated
template[8] = 0x16; // Service Data
template[9] = 0xAA; // Eddystone Beacon ID
template[10] = 0xFE; // Eddystone Beacon ID
template[11] = 0x10; // Flags
template[12] = 0xEC; // Power -20 dBm

var encoded = EddystoneBeacon.encodeUrl("http://example.com");
var advertisementData = Buffer.concat([template, encoded]);
advertisementData[7] = encoded.length + 5;

bleno.on('stateChange', function(state) {
    if (state === 'poweredOn') {
        if (bleno.startAdvertisingWithEIRData) {
            bleno.startAdvertisingWithEIRData(advertisementData);
        } else {
            throw new Error('Your platform is not supported!');
        }
    }
});
