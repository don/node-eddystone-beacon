var assert = require('assert');
var AdvertisementData = require('./../../lib/util/advertisement-data');

var defaultTxPowerLevel = 0xEB; // -21dBm
var txPowerLevelOffset = 12;

describe('Advertisement Data', function () {
    describe('makeUidBuffer', function() {
        it('should match known message', function () {
            var knownData = new Buffer(31);

            setupPrefix(22, 0x00, knownData);
            setupPowerLevel(-21, knownData);

            for (var i = 0; i < 16; i++) {
                 knownData.writeUInt8(i, 13 +i);
            }

            knownData.writeUInt8(0x00, 29);
            knownData.writeUInt8(0x00, 30);

            var advertisementData = AdvertisementData.makeUidBuffer('00010203040506070809', '0a0b0c0d0e0f', -21);
            assert.deepEqual(advertisementData, knownData);
        });

        it('should throw error for invalid namespace id', function() {
            assert.throws(
                function() {
                    var advertisementData = AdvertisementData.makeUidBuffer('000102030405060708', '0a0b0c0d0e0f', -21);
                },
                /Invalid namespace id/
            );
        });

        it('should throw error for invalid instance id', function() {
            assert.throws(
                function() {
                    var advertisementData = AdvertisementData.makeUidBuffer('00010203040506070809', '0a0b0c0d0e', -21);
                },
                /Invalid instance id/
            );
        });

        it('should support dashed id', function () {
            var knownData = new Buffer(31);

            setupPrefix(22, 0x00, knownData);
            setupPowerLevel(-21, knownData);

            for (var i = 0; i < 16; i++) {
                 knownData.writeUInt8(i, 13 +i);
            }

            knownData.writeUInt8(0x00, 29);
            knownData.writeUInt8(0x00, 30);

            var advertisementData = AdvertisementData.makeUidBuffer('00010203-0405-0607-0809', '0a0b0c0d0e0f', -21);
            assert.deepEqual(advertisementData, knownData);
        });
    });

    describe('makeUrlBuffer', function () {
        it('should match known message', function () {
            var knownData = new Buffer(18);

            setupPrefix(9, 0x10, knownData);
            setupPowerLevel(-21, knownData);

            knownData.writeUInt8(0x00, 13); // http://www.
            knownData.write('abc', 14);
            knownData.writeUInt8(0x07, 17); // .com

            var advertisementData = AdvertisementData.makeUrlBuffer('http://www.abc.com', -21);
            assert.deepEqual(advertisementData, knownData);
        });

        it('should throw error for URLs that a to long', function() {
            assert.throws(
                function() {
                    var advertisementData = AdvertisementData.makeUrlBuffer('http://www.blahblahblahblahblahblahblahblah.org', -21);
                },
                /is too long/
            );
        });
    });

    describe('makeTlmBuffer', function() {
        it('should match known message', function () {
            var knownData = new Buffer(25);

            setupPrefix(16, 0x20, knownData);

            knownData.writeUInt8(0x00, 12); // version

            // volts
            knownData.writeUInt16BE(500, 13);

            // temp
            knownData.writeUInt8(22, 15); // 22
            knownData.writeUInt8(128, 16); // 0.5

            // adv cnt
            knownData.writeUInt32BE(0x01020304, 17);

            // sec cnt
            knownData.writeUInt32BE(0x05060708, 21);


            var advertisementData = AdvertisementData.makeTlmBuffer(500, 22.5, 0x01020304, 0x05060708);
            assert.deepEqual(advertisementData, knownData);
        });
    });

    function setupPrefix(serviceDataLength, flags, knownData) {
        // Flags
        knownData.writeUInt8(2, 0); // length
        knownData.writeUInt8(0x01, 1); // GAP Flags type
        knownData.writeUInt16LE(0x06, 2); // GAP Flags value

        // Service List
        knownData.writeUInt8(3, 3); // length
        knownData.writeUInt8(0x03, 4); // GAP Service List type
        knownData.writeUInt16LE(0xFEAA, 5); // GAP Service List value, UUID 0xFEAA

        // Service Data
        knownData.writeUInt8(serviceDataLength + 1, 7); // length
        knownData.writeUInt8(0x16, 8); // GAP Service Data type
        knownData.writeUInt16LE(0xFEAA, 9); // GAP Service Data UUID 0xFEAA

        //  Beacon data
        knownData.writeUInt8(flags, 11); // flags
    }

    function setupPowerLevel(power, knownData) {
        knownData.writeInt8(power, 12); // power
    }
});
