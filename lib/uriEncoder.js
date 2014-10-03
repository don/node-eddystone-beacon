// code is array index, e.g. "http://www." is 0
var protocols = [ "http://www.", "https://www.", "http://", "https://", "tel:", "mailto:", "geo:" ];
// code is array index + 7
var domains = [ ".com", ".org", ".edu" ];

// shorten uris using substitution codes
var encode = function (uri) {

    var parts = [];
    var match;

    for (var i = 0; i < protocols.length; i++) {
        match = uri.match(protocols[i]);
        if (match) {
            // save string before match (should be nothing)
            parts.push(uri.slice(0, match.index));
            // save the code
            parts.push(createBuffer(i));
            // trim the uri
            uri = uri.replace(protocols[i], '');
            break;
        }
    }

    match = null;

    for (i = 0; i < domains.length; i++) {
        match = uri.match(domains[i]);
        if (match) {
            // save string before match
            parts.push(uri.slice(0, match.index));
            // add substitution code
            parts.push(createBuffer(i + 7));
            // save string after match
            parts.push(uri.slice(match.index + domains[i].length));
            break;
        }
    }

    if (!match) { // save the remaining
        parts.push(uri);
    }

    // remove the empty strings
    parts = parts.filter(function (value) {
        return value !== '';
    });

    // convert strings to buffers
    var bufferList = parts.map(function (item) {
        if (typeof item === 'string') {
            return new Buffer(item, 'utf-8');
        } else {
            return item;
        }
    });

    // join the buffers
    return Buffer.concat(bufferList);
};

var createBuffer = function (integer) {
    var buffer = new Buffer(1);
    buffer.writeUInt8(integer, 0);
    return buffer;
};

module.exports = {
    encode: encode
};
