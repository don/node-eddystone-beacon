// Manually create a Eddystone Beacon with bleno
var bleno = require('bleno');

var advertisementData = new Buffer(18); // maximum 31 bytes

advertisementData[0] = 0x02; // Length
advertisementData[1] = 0x01; // Parameter: Flags
advertisementData[2] = 0x06;
advertisementData[3] = 0x03; // Length
advertisementData[4] = 0x03; // Parameter: Service List
advertisementData[5] = 0xAA; // Eddystone Beacon ID
advertisementData[6] = 0xFE; // Eddystone Beacon ID
advertisementData[7] = 0x0A; // Length
advertisementData[8] = 0x16; // Service Data
advertisementData[9] = 0xAA; // Eddystone Beacon ID
advertisementData[10] = 0xFE; // Eddystone Beacon ID
advertisementData[11] = 0x10; // Flags
advertisementData[12] = 0xEE; // Power -18 dBm
advertisementData[13] = 0x00; // http://www.
advertisementData[14] = 0x61; // a
advertisementData[15] = 0x62; // b
advertisementData[16] = 0x63; // c
advertisementData[17] = 0x07; // .com

bleno.on('stateChange', function(state) {
    if (state === 'poweredOn') {
        if (bleno.startAdvertisingWithEIRData) {
            bleno.startAdvertisingWithEIRData(advertisementData);
        } else {
            throw new Error('Your platform is not supported!');
        }
    }
});
