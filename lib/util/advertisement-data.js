var encode = require('eddystone-url-encoding').encode;
var Eir = require('./eir');

var SERVICE_UUID = 'feaa';

var UID_FRAME_TYPE = 0x00;
var URL_FRAME_TYPE = 0x10;
var TLM_FRAME_TYPE = 0x20;

var TLM_VERSION = 0x00;

var MAX_URL_LENGTH = 18;

var makeUidBuffer = function (namespaceId, instanceId, txPowerLevel) {
    var namespaceIdData = hexStringIdToBuffer(namespaceId);
    var instanceUidData = hexStringIdToBuffer(instanceId);
    var rfu = new Buffer([0x00, 0x00]);
    var txPowerLevelData = makeTxPowerLevelBuffer(txPowerLevel);

    if (namespaceIdData.length !== 10) {
        throw new Error('Invalid namespace id, must be 10 bytes');
    }

    if (instanceUidData.length !== 6) {
        throw new Error('Invalid instance id, must be 6 bytes');
    }

    var data = Buffer.concat([
        txPowerLevelData,
        namespaceIdData,
        instanceUidData,
        rfu
    ]);

    return makeEddystoneBuffer(UID_FRAME_TYPE, data);
};

var makeUrlBuffer = function (url, txPowerLevel) {
    var encodedUrl = encode(url);
    var txPowerLevelData = makeTxPowerLevelBuffer(txPowerLevel);

    if (encodedUrl.length > MAX_URL_LENGTH) {
        throw new Error('Encoded URL must be less than ' + MAX_URL_LENGTH +
                        ' bytes. It is currently ' + data.length + ' bytes.');
    }

    var data = Buffer.concat([
        txPowerLevelData,
        encodedUrl
    ]);

    return makeEddystoneBuffer(URL_FRAME_TYPE, data);
};

var makeTlmBuffer = function (vBatt, temp, advCnt, secCnt) {
    var tlmData = new Buffer(13);

    tlmData.writeUInt8(TLM_VERSION, 0);
    tlmData.writeUInt16BE(vBatt, 1);

    tlmData.writeInt16BE(Math.round(temp * 256.0), 3);
    tlmData.writeUInt32BE(advCnt, 5);
    tlmData.writeUInt32BE(secCnt, 9);

    return makeEddystoneBuffer(TLM_FRAME_TYPE, tlmData);
};


var makeEddystoneBuffer = function(flags, data) {
    var header = new Buffer(1);

    header.writeUInt8(flags, 0);

    var serviceData = Buffer.concat([
        header,
        data
    ]);

    var eir = new Eir();

    eir.addFlags(0x06);
    eir.add16BitCompleteServiceList([SERVICE_UUID]);
    eir.addServiceData(SERVICE_UUID, serviceData);

    return eir.buffer();
};

var makeTxPowerLevelBuffer = function(level) {
    var buffer = new Buffer(1);
    buffer.writeInt8(level, 0);

    return buffer;
};

var hexStringIdToBuffer = function(hexStringId) {
    return new Buffer(hexStringId.replace(/-/g, ''), 'hex');
};

module.exports = {
    makeUidBuffer: makeUidBuffer,
    makeUrlBuffer: makeUrlBuffer,
    makeTlmBuffer: makeTlmBuffer
};
