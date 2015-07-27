var os = require('os');

var bleno = require('bleno');

var AdvertisementData = require('./advertisement-data');

function Beacon() {
    this._advertisementData = null;
}

Beacon.prototype.advertiseUid = function(namespaceId, instanceId, options) {
    options = options || {};

    this._advertisementData = AdvertisementData.makeUidBuffer(namespaceId, instanceId, options.txPowerLevel);

    this.removeFlagsIfOsX();
    this.advertiseWhenPoweredOn();
};

Beacon.prototype.advertiseUrl = function(url, options) {
    options = options || {};

    this._advertisementData = AdvertisementData.makeUrlBuffer(url, options.txPowerLevel);

    this.removeFlagsIfOsX();
    this.advertiseWhenPoweredOn();
};

Beacon.prototype.advertiseTlm = function(vBatt, temp, advCnt, secCnt) {
    this._advertisementData = AdvertisementData.makeTlmBuffer(vBatt, temp, advCnt, secCnt);

    this.removeFlagsIfOsX();
    this.advertiseWhenPoweredOn();
};


Beacon.prototype.advertiseWhenPoweredOn = function() {
    if (bleno.state === 'poweredOn') {
        this.advertise();
    } else {
        bleno.once('stateChange', this.advertiseWhenPoweredOn.bind(this));
    }
};

Beacon.prototype.advertise = function() {
    if (bleno.startAdvertisingWithEIRData) {
        bleno.startAdvertisingWithEIRData(this._advertisementData);
    } else {
        throw new Error('Your platform is not supported!');
    }
};

Beacon.prototype.removeFlagsIfOsX = function() {
    if (os.platform() === 'darwin') {
        this._advertisementData = this._advertisementData.slice(3);
    }
};

module.exports = new Beacon();
