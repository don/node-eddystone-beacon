var os = require('os');

var bleno = require('bleno');

var AdvertisementData = require('./util/advertisement-data');

var TICK_INTERVAL = 100; // ms
var DEFAULT_TX_POWER_LEVEL = -21; // dBm

function Beacon() {
    this._mainAdvertisementData = null;
    this._advertisementData = null;
    this._scanData = null;
    this._advertising = false;
    this._tlmPeriod = 0;
    this._tlmCount = 1;

    this._batteryVoltage = 0;
    this._temperature = -128;
    this._secCnt = 0;
    this._advCnt = 0;

    setInterval(this._tick.bind(this), TICK_INTERVAL);
}

Beacon.prototype.advertiseUid = function(namespaceId, instanceId, options) {
    this._parseOptions(options);

    this._advertisementData = AdvertisementData.makeUidBuffer(namespaceId, instanceId, this._txPowerLevel);
    this._removeFlagsIfOsX();

    this._mainAdvertisementData = this._advertisementData;

    this._advertiseWhenPoweredOn();
};

Beacon.prototype.advertiseUrl = function(url, options) {
    this._parseOptions(options);

    this._advertisementData = AdvertisementData.makeUrlBuffer(url, this._txPowerLevel);
    this._removeFlagsIfOsX();

    this._mainAdvertisementData = this._advertisementData;

    this._advertiseWhenPoweredOn();
};

Beacon.prototype.advertiseTlm = function() {
    this._advertisementData = AdvertisementData.makeTlmBuffer(this._batteryVoltage, this._temperature, this._advCnt, this._secCnt);

    if (this._tlmPeriod === 0) {
        this._tlmPeriod = 1;
        this._tlmCount = 1;
    }

    this._removeFlagsIfOsX();
    this._advertiseWhenPoweredOn();
};

Beacon.prototype.setBatteryVoltage = function(batteryVoltage) {
    this._batteryVoltage = batteryVoltage;
};

Beacon.prototype.setTemperature = function(temperature) {
    this._temperature = temperature;
};

Beacon.prototype.stop = function() {
    this._advertising = false;
    bleno.stopAdvertising();
};

Beacon.prototype._parseOptions = function(options) {
    options = options || {};

    this._parseTxPowerLevelOption(options.txPowerLevel);
    this._parseTlmOptions(options);
    this._parseNameOption(options.name);
};

Beacon.prototype._parseNameOption = function(name) {
    if (name && name.length) {
        var scanData = new Buffer(name.length + 2);
        var nameBuffer = new Buffer(name);
        scanData.writeUInt8(1 + nameBuffer.length, 0);
        scanData.writeUInt8(0x09, 1);
        nameBuffer.copy(scanData, 2);
        this._scanData = scanData;
    }
};

Beacon.prototype._parseTxPowerLevelOption = function(txPowerLevel) {
    if (txPowerLevel !== undefined) {
        if (txPowerLevel < -100 || txPowerLevel > 20) {
            throw new Error('TX Power level must be between -100 and 20!');
        }
    } else {
        txPowerLevel = DEFAULT_TX_POWER_LEVEL;
    }

    this._txPowerLevel = txPowerLevel;
};

Beacon.prototype._parseTlmOptions = function(options) {
    var tlmPeriod = options.tlmPeriod;
    var tlmCount = options.tlmCount;

    if (tlmPeriod !== undefined) {
        tlmPeriod = options.tlmPeriod;
    } else {
        tlmPeriod = 0;
    }
    this._tlmPeriod = tlmPeriod;

    if (tlmCount !== undefined) {
        tlmPeriod = options.tlmCount;
    } else {
        tlmCount = 1;
    }
    this._tlmCount = tlmCount;
};

Beacon.prototype._advertiseWhenPoweredOn = function() {
    if (bleno.state === 'poweredOn') {
        this._advertise();
    } else {
        bleno.once('stateChange', this._advertiseWhenPoweredOn.bind(this));
    }
};

Beacon.prototype._advertise = function() {
    if (bleno.startAdvertisingWithEIRData) {
        this._advertising = true;
        bleno.startAdvertisingWithEIRData(this._advertisementData, this._scanData);
    } else {
        throw new Error('Your platform is not supported!');
    }
};

Beacon.prototype._removeFlagsIfOsX = function() {
    if (os.platform() === 'darwin') {
        this._advertisementData = this._advertisementData.slice(3);
    }
};

Beacon.prototype._tick = function() {
    this._secCnt++;

    if (this._advertising) {
        this._advCnt++;

        this._updateAdvertisementDataIfNeeded();
    }
};

Beacon.prototype._updateAdvertisementDataIfNeeded = function() {
    if (this._tlmPeriod < 1) {
        return;
    }

    if ((this._advCnt % this._tlmPeriod) < this._tlmCount) {
        // switch to TLM
        this.advertiseTlm();
    } else if (this._advertisementData !== this._mainAdvertisementData) {
        // switch back to main
        this._advertisementData = this._mainAdvertisementData;
        this._advertise();
    }
};

module.exports = Beacon;
