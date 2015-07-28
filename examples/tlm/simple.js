// Simplest way to create a Eddystone-TLM Beacon

var eddystoneBeacon = require('./../../index');

eddystoneBeacon.advertiseTlm();

setInterval(function() {
    var randomBatteryVoltage = Math.floor((Math.random() * 10000) + 500); // between 500 and 10,000
    var randomTemperature = (Math.random() * 256.0) - 128.0; // between -128.0 and 128.0

    eddystoneBeacon.setBatteryVoltage(randomBatteryVoltage);
    eddystoneBeacon.setTemperature(randomTemperature);
}, 10 * 1000);
