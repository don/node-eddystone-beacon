var encode = require('./uriEncoder').encode;

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
template[9] = 0x20; // Power

// This won't work for people the want to advertise additional services
var makeBuffer = function (uri) {
    // encode the uri
    var encoded = encode(uri);

    var data = Buffer.concat([template, encoded], template.length + encoded.length);

    // set the length
    data[4] = encoded.length + 5;

    return data;
};

module.exports = {
    makeBuffer: makeBuffer
};
