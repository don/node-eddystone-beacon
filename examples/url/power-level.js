var eddystoneBeacon = require('./../../index');

// txPowerLevel can be set in options hash
// should be between -100 and 20 dBm
eddystoneBeacon.advertiseUrl('https://www.eff.org', { txPowerLevel: -31 });
