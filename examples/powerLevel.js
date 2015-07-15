var EddystoneBeacon = require('./../eddystone-beacon');

// txPowerLevel can be set in options hash
// should be between -100 and 20 dBm
EddystoneBeacon.advertise("http://www.eff.org", { txPowerLevel: -31 });
