var assert = require('assert');

var Eir = require('../../lib/util/eir');

describe('EIR', function () {
    var eir;

    beforeEach(function() {
        eir = new Eir();
    });

    it('should be empty buffer when new', function () {
        var emptyBuffer = new Buffer(0);

        assertEirLength(0);
        assertEirDataEqual(emptyBuffer);
    });

    it('should add flags', function() {
        var FLAGS = 0x06;

        eir.addFlags(FLAGS);

        assertEirLength(3);
        assertEirDataEqual(new Buffer([0x02, 0x01, FLAGS]));
    });

    it('should add 16-bit complete service list', function() {
        var SERVICES = ['feaa'];

        eir.add16BitCompleteServiceList(SERVICES);

        assertEirLength(4);
        assertEirDataEqual(new Buffer([0x03, 0x03, 0xaa, 0xfe]));
    });

    it('should add service data', function() {
        var SERVICE_UUID = 'feaa';
        var SERVICE_DATA = new Buffer([0xab, 0xcd, 0xef]);

        eir.addServiceData(SERVICE_UUID, SERVICE_DATA);

        assertEirLength(7);
        assertEirDataEqual(new Buffer([0x06, 0x16, 0xaa, 0xfe, 0xab, 0xcd, 0xef]));
    });

    function assertEirLength(length) {
        assert.equal(eir.length(), length);
    }

    function assertEirDataEqual(expectedData) {
        assert.equal(eir.buffer().toString('hex'), expectedData.toString('hex'));
    }
});
