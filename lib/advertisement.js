var encode = require('./uriEncoder').encode;

var SERVICE_UUID = 0xFEAA;
var DEFAULT_TX_POWER_LEVEL = -21; // dBm

var template = new Buffer(13);

// Flags
template.writeUInt8(2, 0); // length
template.writeUInt8(0x01, 1); // GAP Flags type
template.writeUInt8(0x06, 2); // GAP Flags value

// Service List
template.writeUInt8(3, 3); // length
template.writeUInt8(0x03, 4); // GAP Service List type
template.writeUInt16LE(SERVICE_UUID, 5); // GAP Service List value, UUID 0xFEAA

// Service Data
template.writeUInt8(10, 7); // length
template.writeUInt8(0x16, 8); // GAP Service Data type
template.writeUInt16LE(SERVICE_UUID, 9); // GAP Service Data UUID 0xFEAA

//  Beacon data
template.writeUInt8(0x10, 11); // flags
template.writeInt8(DEFAULT_TX_POWER_LEVEL, 12); // power level


// txPowerLevel level is optional
var makeBuffer = function (uri, txPowerLevel) {
    // encode the uri
    var encoded = encode(uri);

    var data = Buffer.concat([ // maximum 31 bytes
        template,
        encoded
    ]);

    // set the length
    data.writeUInt8(encoded.length + 5, 7);

    // set the txPowerLevel
    data.writeInt8(validateTxPowerLevel(txPowerLevel), 12);

    return data;
};

var validateTxPowerLevel = function(level) {

    if (level === undefined) { level = DEFAULT_TX_POWER_LEVEL; }

    if (level < -100 || level > 20) {
        console.log("txPowerLevel " + level + " out of range");
        level = DEFAULT_TX_POWER_LEVEL;
    }

    return level;
};

module.exports = {
    makeBuffer: makeBuffer
};
