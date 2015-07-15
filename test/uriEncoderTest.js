var assert = require("assert");
var EddystoneBeacon = require("./../eddystone-beacon");

describe('URI Encoder', function () {

    it('should encode URIs', function () {

        var encoded = EddystoneBeacon.encode("http://www.google.com");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(7, encoded[7]); // domain
        assert.equal(8, encoded.length);

    });

    describe('should substitute known protocols', function () {

        it('http', function () {
            var encoded = EddystoneBeacon.encode("http://www.example.com");
            assert.equal(0, encoded[0]); // prefix

            encoded = EddystoneBeacon.encode("http://example.com");
            assert.equal(2, encoded[0]); // prefix
        });

        it('https', function () {
            var encoded = EddystoneBeacon.encode("https://www.example.com");
            assert.equal(1, encoded[0]); // prefix

            encoded = EddystoneBeacon.encode("https://example.com");
            assert.equal(3, encoded[0]); // prefix
        });

        it('urn:uuid:', function () {
            var encoded = EddystoneBeacon.encode("urn:uuid:B1E13D51-5FC9-4D5B-902B-AB668DD54981");
            assert.equal(4, encoded[0]); // prefix
        });

    });

    it('should use first protocol match', function () {

        // should substitute http://www. not http://
        var encoded = EddystoneBeacon.encode("http://www.arduino.cc");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(11, encoded.length);

        // should substitute https://www. not https://
        encoded = EddystoneBeacon.encode("https://www.arduino.cc");
        assert.equal(1, encoded[0]); // prefix
        assert.equal(11, encoded.length);

    });

    describe('should handle unknown protocols', function () {

        it('sms', function() {
            var encoded = EddystoneBeacon.encode("sms:2153581780");
            assert.equal('s'.charCodeAt(0), encoded[0]);
            assert.equal('m'.charCodeAt(0), encoded[1]);
            assert.equal('s'.charCodeAt(0), encoded[2]);
            assert.equal(':'.charCodeAt(0), encoded[3]);
            assert.equal(14, encoded.length);
        });

        it('tel', function () {
            var uri = "tel:+1-215-555-1212";
            var encoded = EddystoneBeacon.encode(uri);
            assert.equal(uri.length, encoded.length);
        });

        it('mailto', function () {
            var uri = "mailto:foo@example.com";
            var encoded = EddystoneBeacon.encode(uri);
            assert.equal(uri.length - 3, encoded.length); // .com is substituted
        });

        it('geo', function () {
            var uri = "geo:40.134327,-75.205673";
            var encoded = EddystoneBeacon.encode(uri);
            assert.equal(uri.length, encoded.length);
        });

    });


    describe('should substitute known domains', function () {

        it('com', function () {
            var encoded = EddystoneBeacon.encode("foo.com");
            assert.equal(7, encoded[3]); // domain
        });

        it('org', function () {
            var encoded = EddystoneBeacon.encode("foo.org");
            assert.equal(8, encoded[3]); // domain
        });

        it('edu', function () {
            var encoded = EddystoneBeacon.encode("foo.edu");
            assert.equal(9, encoded[3]); // domain
        });

        it('net', function () {
            var encoded = EddystoneBeacon.encode("foo.net");
            assert.equal(10, encoded[3]); // domain
        });

        it('info', function () {
            var encoded = EddystoneBeacon.encode("foo.info");
            assert.equal(11, encoded[3]); // domain
        });

        it('biz', function () {
            var encoded = EddystoneBeacon.encode("foo.biz");
            assert.equal(12, encoded[3]); // domain
        });

        it('gov', function () {
            var encoded = EddystoneBeacon.encode("foo.gov");
            assert.equal(13, encoded[3]); // domain
        });

        it('com/', function () {
            var encoded = EddystoneBeacon.encode("foo.com/");
            assert.equal(0, encoded[3]); // domain
        });

        it('org/', function () {
            var encoded = EddystoneBeacon.encode("foo.org/");
            assert.equal(1, encoded[3]); // domain
        });

        it('edu/', function () {
            var encoded = EddystoneBeacon.encode("foo.edu/");
            assert.equal(2, encoded[3]); // domain
        });

        it('net/', function () {
            var encoded = EddystoneBeacon.encode("foo.net/");
            assert.equal(3, encoded[3]); // domain
        });

        it('info/', function () {
            var encoded = EddystoneBeacon.encode("foo.info/");
            assert.equal(4, encoded[3]); // domain
        });

        it('biz/', function () {
            var encoded = EddystoneBeacon.encode("foo.biz/");
            assert.equal(5, encoded[3]); // domain
        });

        it('gov/', function () {
            var encoded = EddystoneBeacon.encode("foo.gov/");
            assert.equal(6, encoded[3]); // domain
        });


    });

    it('should handle unknown domains', function () {

        var encoded = EddystoneBeacon.encode("http://arduino.cc");
        assert.equal(2, encoded[0]); // prefix
        assert.equal('c'.charCodeAt(0), encoded[9]); // domain
        assert.equal('c'.charCodeAt(0), encoded[10]); // domain
        assert.equal(11, encoded.length);

    });

    it('should handle trailing slash', function () {

        // no trailing slash
        var encoded = EddystoneBeacon.encode("http://www.chariotsolutions.com/");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(0, encoded[17]); // domain
        assert.equal(18, encoded.length);

        // trailing slash
        encoded = EddystoneBeacon.encode("http://www.chariotsolutions.com/");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(0, encoded[17]); // domain
        assert.equal(18, encoded.length);

    });

    it('should handle url path', function () {

        // this is probably too long
        var encoded = EddystoneBeacon.encode("http://www.chariotsolutions.com/foo");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(0, encoded[17]); // domain
        assert.equal('f'.charCodeAt(0), encoded[18]);
        assert.equal('o'.charCodeAt(0), encoded[19]);
        assert.equal('o'.charCodeAt(0), encoded[20]);
        assert.equal(21, encoded.length);

    });

    it('should encode data without a protocol or domain', function () {

        var encoded = EddystoneBeacon.encode("qwerty");
        assert.equal(6, encoded.length);

    });

    describe('should encode UUIDs', function() {

        it('with dashes', function() {
            var encoded = EddystoneBeacon.encode("urn:uuid:B1E13D51-5FC9-4D5B-902B-AB668DD54981");
            assert.equal(4, encoded[0]); // prefix
            assert.equal(17, encoded.length);
        });

        it('without dashes', function() {
            var encoded = EddystoneBeacon.encode("urn:uuid:B1E13D515FC94D5B902BAB668DD54981");
            assert.equal(4, encoded[0]); // prefix
            assert.equal(17, encoded.length);
        });

        it('too short', function() {
            var encoded = EddystoneBeacon.encode("urn:uuid:B1E13D51");
            assert.equal(4, encoded[0]); // prefix
            assert.equal(0, encoded[15]);
            assert.equal(0, encoded[16]);
            assert.equal(17, encoded.length);
        });

        it('too long', function() {
            var encoded = EddystoneBeacon.encode("urn:uuid:B1E13D51-5FC9-4D5B-902B-AB668DD54981999999999999999999999999");
            assert.equal(4, encoded[0]); // prefix
            assert.equal(17, encoded.length);
        });

    });

});
