var assert = require("assert");
var uriBeacon = require("./../uriBeacon");

describe('Advertisement Buffer', function () {

    it('should match known message', function () {

        var knownData = new Buffer(15);
        knownData[0] = 0x03; // Length
        knownData[1] = 0x03; // Parameter: Service List
        knownData[2] = 0xD8; // URI Beacon ID
        knownData[3] = 0xFE; // URI Beacon ID
        knownData[4] = 0x0A; // Length
        knownData[5] = 0x16; // Service Data
        knownData[6] = 0xD8; // URI Beacon ID
        knownData[7] = 0xFE; // URI Beacon ID
        knownData[8] = 0x00; // Flags
        knownData[9] = 0x20; // Power
        knownData[10] = 0x00; // http://www.
        knownData[11] = 0x61; // a
        knownData[12] = 0x62; // b
        knownData[13] = 0x63; // c
        knownData[14] = 0x07; // .com

        var advertisementData = uriBeacon.makeBuffer("http://www.abc.com");
        assert.deepEqual(knownData, advertisementData);
    });

});