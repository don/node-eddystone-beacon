var encode = require('uri-beacon-uri-encoding').encode;

var template = new Buffer(10); // maximum 31 bytes
template[0] = 0x03; // Length
template[1] = 0x03; // Parameter: Service List
template[2] = 0xD8; // URI Beacon ID
template[3] = 0xFE; // URI Beacon ID
template[4] = 0x00; // Length
template[5] = 0x16; // Service Data
template[6] = 0xD8; // URI Beacon ID
template[7] = 0xFE; // URI Beacon ID
template[8] = 0x00; // Flags
template[9] = 0xEB; // Power

// txPowerLevel level is optional
// This won't work for people the want to advertise additional services
var makeBuffer = function (uri, txPowerLevel) {
    // encode the uri
    var encoded = encode(uri);

    var data = Buffer.concat([template, encoded], template.length + encoded.length);

    // set the length
    data[4] = encoded.length + 5;

    // set the txPowerLevel
    data[9] = convertTxPowerLevel(txPowerLevel);

    return data;
};

var convertTxPowerLevel = function(level) {

    var defaultTxPowerLevel = -21; // dBm

    if (!level) { level = defaultTxPowerLevel; }

    if (level < -100 || level > 20) {
        console.log("txPowerLevel " + level + " out of range");
        level = defaultTxPowerLevel;
    }

    if (level < 0) {
        level = 256 + level;
    }

    return level;
};

module.exports = {
    makeBuffer: makeBuffer
};
