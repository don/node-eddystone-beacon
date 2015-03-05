var assert = require("assert");
var uriBeacon = require("./../uri-beacon");
var defaultTxPowerLevel = 0xEB; // -21dBm

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
        knownData[9] = 0xEB; // Power
        knownData[10] = 0x00; // http://www.
        knownData[11] = 0x61; // a
        knownData[12] = 0x62; // b
        knownData[13] = 0x63; // c
        knownData[14] = 0x07; // .com

        var advertisementData = uriBeacon.makeBuffer("http://www.abc.com");
        assert.deepEqual(knownData, advertisementData);
    });

    it('should allow tx power level to be set', function () {

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
        knownData[9] = 0x9C; // Power
        knownData[10] = 0x00; // http://www.
        knownData[11] = 0x65; // e
        knownData[12] = 0x66; // f
        knownData[13] = 0x66; // f
        knownData[14] = 0x08; // .org

        var advertisementData = uriBeacon.makeBuffer("http://www.eff.org", -100);
        assert.deepEqual(knownData, advertisementData);
    });

    it('should handle missing tx power level', function () {
        var advertisementData = uriBeacon.makeBuffer("http://www.eff.org");
        assert.deepEqual(defaultTxPowerLevel, advertisementData[9]);
    });

    it('should handle negative tx power level', function () {
        var advertisementData = uriBeacon.makeBuffer("http://www.eff.org", -18);
        assert.deepEqual(0xEE, advertisementData[9]);
    });

    it('should handle positive tx power level', function () {
        var advertisementData = uriBeacon.makeBuffer("http://www.eff.org", 18);
        assert.deepEqual(0x12, advertisementData[9]);
    });

    it('should ignore tx power level that is too high', function () {
        var advertisementData = uriBeacon.makeBuffer("http://www.eff.org", 21);
        assert.deepEqual(defaultTxPowerLevel, advertisementData[9]);
    });

    it('should ignore power level that is too low', function () {
        var advertisementData = uriBeacon.makeBuffer("http://www.eff.org", -101);
        assert.deepEqual(defaultTxPowerLevel, advertisementData[9]);
    });


});
