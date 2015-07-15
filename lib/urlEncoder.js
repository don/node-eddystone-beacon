// code is array index, e.g. "http://www." is 0
var protocols = [ "http://www.", "https://www.", "http://", "https://"];
// code is array index
var domains = [ ".com/", ".org/", ".edu/", ".net/", ".info/", ".biz/", ".gov/", ".com", ".org", ".edu", ".net", ".info", ".biz", ".gov" ];

// shorten urls using substitution codes
var encode = function (url) {

    var parts = [];
    var match;

    for (var i = 0; i < protocols.length; i++) {
        match = url.match(protocols[i]);
        if (match) {
            // save string before match (should be nothing)
            parts.push(url.slice(0, match.index));
            // save the code
            parts.push(createBuffer(i));
            // trim the url
            url = url.replace(protocols[i], '');
            break;
        }
    }

    match = null;

    for (i = 0; i < domains.length; i++) {
        match = url.match(domains[i]);
        if (match) {
            // save string before match
            parts.push(url.slice(0, match.index));
            // add substitution code
            parts.push(createBuffer(i));
            // save string after match
            parts.push(url.slice(match.index + domains[i].length));
            break;
        }
    }

    if (!match) { // save the remaining
        parts.push(url);
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
