var FLAGS_TYPE                        = 0x01;
var COMPLETE_16_BIT_SERVICE_UUID_TYPE = 0x03;
var SERVICE_DATA_TYPE                 = 0x16;

function Eir() {
    this._buffer = new Buffer(0);
}

Eir.prototype.buffer = function() {
    return this._buffer;
};

Eir.prototype.length = function() {
    return this._buffer.length;
};

Eir.prototype.addFlags = function(flags) {
    var flagsData = new Buffer([flags]);

    this.addData(FLAGS_TYPE, flagsData);
};

Eir.prototype.add16BitCompleteServiceList = function(serviceUuids) {
    var serviceListData = new Buffer(2 * serviceUuids.length);

    for (var i = 0; i < serviceUuids.length; i++) {
        var serviceUuidData = this.serviceUuidToBuffer(serviceUuids[i]);

        serviceUuidData.copy(serviceListData, i * 2);
    }

    this.addData(COMPLETE_16_BIT_SERVICE_UUID_TYPE, serviceListData);
};

Eir.prototype.addServiceData = function(serviceUuid, data) {
    var serviceUuidData = this.serviceUuidToBuffer(serviceUuid);
    var serviceData = Buffer.concat([
        serviceUuidData,
        data
    ]);

    this.addData(SERVICE_DATA_TYPE, serviceData);
};

Eir.prototype.addData = function(type, data) {
    var eirDataHeader = new Buffer(2);

    eirDataHeader.writeUInt8(1 + data.length, 0);
    eirDataHeader.writeUInt8(type, 1);

    this._buffer = Buffer.concat([
        this._buffer,
        eirDataHeader,
        data
    ]);
};

Eir.prototype.serviceUuidToBuffer = function(serviceUuid) {
    var reversedServiceUuid = serviceUuid.match(/.{1,2}/g).reverse().join('');

    return new Buffer(reversedServiceUuid, 'hex');
};

module.exports = Eir;
