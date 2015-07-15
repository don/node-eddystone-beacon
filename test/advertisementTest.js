var assert = require("assert");
var EddystoneBeacon = require("./../eddystone-beacon");
var defaultTxPowerLevel = 0xEB; // -21dBm
var txPowerLevelOffset = 12;

describe('Advertisement Buffer', function () {

    it('should match known message', function () {
        var knownData = new Buffer(18);

        // Flags
        knownData.writeUInt8(2, 0); // length
        knownData.writeUInt8(0x01, 1); // GAP Flags type
        knownData.writeUInt16LE(0x06, 2); // GAP Flags value

        // Service List
        knownData.writeUInt8(3, 3); // length
        knownData.writeUInt8(0x03, 4); // GAP Service List type
        knownData.writeUInt16LE(0xFEAA, 5); // GAP Service List value, UUID 0xFEAA

        // Service Data
        knownData.writeUInt8(10, 7); // length
        knownData.writeUInt8(0x16, 8); // GAP Service Data type
        knownData.writeUInt16LE(0xFEAA, 9); // GAP Service Data UUID 0xFEAA

        //  Beacon data
        knownData.writeUInt8(0x10, 11); // flags
        knownData.writeInt8(-21, 12); // power

        knownData.writeUInt8(0x00, 13); // http://www.
        knownData.write("abc", 14);
        knownData.writeUInt8(0x07, 17); // .com

        var advertisementData = EddystoneBeacon.makeUrlBuffer("http://www.abc.com");
        assert.deepEqual(knownData, advertisementData);
    });

    it('should allow tx power level to be set', function () {
        var knownData = new Buffer(18);

        // Flags
        knownData.writeUInt8(2, 0); // length
        knownData.writeUInt8(0x01, 1); // GAP Flags type
        knownData.writeUInt16LE(0x06, 2); // GAP Flags value

        // Service List
        knownData.writeUInt8(3, 3); // length
        knownData.writeUInt8(0x03, 4); // GAP Service List type
        knownData.writeUInt16LE(0xFEAA, 5); // GAP Service List value, UUID 0xFEAA

        // Service Data
        knownData.writeUInt8(10, 7); // length
        knownData.writeUInt8(0x16, 8); // GAP Service Data type
        knownData.writeUInt16LE(0xFEAA, 9); // GAP Service Data UUID 0xFEAA

        //  Beacon data
        knownData.writeUInt8(0x10, 11); // flags
        knownData.writeInt8(-100, 12); // power

        knownData.writeUInt8(0x00, 13); // http://www.
        knownData.write("eff", 14);
        knownData.writeUInt8(0x08, 17); // .org

        var advertisementData = EddystoneBeacon.makeUrlBuffer("http://www.eff.org", -100);
        assert.deepEqual(knownData, advertisementData);
    });

    it('should handle missing tx power level', function () {
        var advertisementData = EddystoneBeacon.makeUrlBuffer("http://www.eff.org");
        assert.deepEqual(defaultTxPowerLevel, advertisementData[txPowerLevelOffset]);
    });

    it('should handle negative tx power level', function () {
        var advertisementData = EddystoneBeacon.makeUrlBuffer("http://www.eff.org", -18);
        assert.deepEqual(0xEE, advertisementData[txPowerLevelOffset]);
    });

    it('should handle positive tx power level', function () {
        var advertisementData = EddystoneBeacon.makeUrlBuffer("http://www.eff.org", 18);
        assert.deepEqual(0x12, advertisementData[txPowerLevelOffset]);
    });

    it('should ignore tx power level that is too high', function () {
        var advertisementData = EddystoneBeacon.makeUrlBuffer("http://www.eff.org", 21);
        assert.deepEqual(defaultTxPowerLevel, advertisementData[txPowerLevelOffset]);
    });

    it('should ignore power level that is too low', function () {
        var advertisementData = EddystoneBeacon.makeUrlBuffer("http://www.eff.org", -101);
        assert.deepEqual(defaultTxPowerLevel, advertisementData[txPowerLevelOffset]);
    });


});
