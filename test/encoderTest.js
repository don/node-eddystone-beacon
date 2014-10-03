var assert = require("assert");
var uriBeacon = require("./../uriBeacon");

describe('URI Encoder', function () {

    it('should encode URIs', function () {

        var encoded = uriBeacon.encode("http://www.google.com");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(7, encoded[7]); // domain
        assert.equal(8, encoded.length);

    });

    describe('should substitute known protocols', function () {

        it('http', function () {
            var encoded = uriBeacon.encode("http://www.example.com");
            assert.equal(0, encoded[0]); // prefix

            encoded = uriBeacon.encode("http://example.com");
            assert.equal(2, encoded[0]); // prefix
        });

        it('https', function () {
            var encoded = uriBeacon.encode("https://www.example.com");
            assert.equal(1, encoded[0]); // prefix

            encoded = uriBeacon.encode("https://example.com");
            assert.equal(3, encoded[0]); // prefix
        });

        it('tel', function () {
            var encoded = uriBeacon.encode("tel:+1-215-555-1212");
            assert.equal(4, encoded[0]); // prefix
        });

        it('mailto', function () {
            var encoded = uriBeacon.encode("mailto:foo@example.com");
            assert.equal(5, encoded[0]); // prefix
        });

        it('geo', function () {
            var encoded = uriBeacon.encode("geo:40.134327,-75.205673");
            assert.equal(6, encoded[0]); // prefix
        });

    });


    it('should use first protocol match', function () {

        // should substitute http://www. not http://
        var encoded = uriBeacon.encode("http://www.arduino.cc");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(11, encoded.length);

        // should substitute https://www. not https://
        encoded = uriBeacon.encode("https://www.arduino.cc");
        assert.equal(1, encoded[0]); // prefix
        assert.equal(11, encoded.length);

    });

    it('should handle unknown protocols', function () {

        var encoded = uriBeacon.encode("sms:2153581780");
        assert.equal('s'.charCodeAt(0), encoded[0]);
        assert.equal('m'.charCodeAt(0), encoded[1]);
        assert.equal('s'.charCodeAt(0), encoded[2]);
        assert.equal(':'.charCodeAt(0), encoded[3]);
        assert.equal(14, encoded.length);

    });


    describe('should substitute known domains', function () {

        it('com', function () {
            var encoded = uriBeacon.encode("foo.com");
            assert.equal(7, encoded[3]); // domain
        });

        it('org', function () {
            var encoded = uriBeacon.encode("foo.org");
            assert.equal(8, encoded[3]); // domain
        });

        it('net', function () {
            var encoded = uriBeacon.encode("foo.edu");
            assert.equal(9, encoded[3]); // domain
        });

    });

    it('should handle unknown domains', function () {

        var encoded = uriBeacon.encode("http://arduino.cc");
        assert.equal(2, encoded[0]); // prefix
        assert.equal('c'.charCodeAt(0), encoded[9]); // domain
        assert.equal('c'.charCodeAt(0), encoded[10]); // domain
        assert.equal(11, encoded.length);

    });

    it('should handle url path', function () {

        // this is probably too long
        var encoded = uriBeacon.encode("http://www.chariotsolutions.com/foo");
        assert.equal(0, encoded[0]); // prefix
        assert.equal(7, encoded[17]); // domain
        assert.equal('/'.charCodeAt(0), encoded[18]);
        assert.equal('f'.charCodeAt(0), encoded[19]);
        assert.equal('o'.charCodeAt(0), encoded[20]);
        assert.equal('o'.charCodeAt(0), encoded[21]);
        assert.equal(22, encoded.length);

    });

    it('should encode data without a protocol or domain', function () {

        var encoded = uriBeacon.encode("qwerty");
        assert.equal(6, encoded.length);

    });

});
