var assert = require("assert");
var uriBeacon = require("./../uri-beacon");
var defaultTxPowerLevel = 0xEB; // -21dBm

describe('Advertisement Buffer', function () {

    it('should match known message', function () {
        var knownData = new Buffer(15);

        // Service List
        knownData.writeUInt8(3, 0); // length
        knownData.writeUInt8(0x03, 1); // GAP Service List type
        knownData.writeUInt16LE(0xFEAA, 2); // GAP Service List value, UUID 0xFEAA

        // Service Data
        knownData.writeUInt8(10, 4); // length
        knownData.writeUInt8(0x16, 5); // GAP Service Data type
        knownData.writeUInt16LE(0xFEAA, 6); // GAP Service Data UUID 0xFEAA

        //  Beacon data
        knownData.writeUInt8(0x10, 8); // flags
        knownData.writeInt8(-21, 9); // power

        knownData.writeUInt8(0x00, 10); // http://www.
        knownData.write("abc", 11);
        knownData.writeUInt8(0x07, 14); // .com

        var advertisementData = uriBeacon.makeBuffer("http://www.abc.com");
        assert.deepEqual(knownData, advertisementData);
    });

    it('should allow tx power level to be set', function () {
        var knownData = new Buffer(15);

        // Service List
        knownData.writeUInt8(3, 0); // length
        knownData.writeUInt8(0x03, 1); // GAP Service List type
        knownData.writeUInt16LE(0xFEAA, 2); // GAP Service List value, UUID 0xFEAA

        // Service Data
        knownData.writeUInt8(10, 4); // length
        knownData.writeUInt8(0x16, 5); // GAP Service Data type
        knownData.writeUInt16LE(0xFEAA, 6); // GAP Service Data UUID 0xFEAA

        //  Beacon data
        knownData.writeUInt8(0x10, 8); // flags
        knownData.writeInt8(-100, 9); // power

        knownData.writeUInt8(0x00, 10); // http://www.
        knownData.write("eff", 11);
        knownData.writeUInt8(0x08, 14); // .org

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
