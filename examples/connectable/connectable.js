// Note that you may need to require a nested version of bleno
// See https://github.com/don/node-eddystone-beacon/issues/30
// See https://github.com/don/node-eddystone-beacon/pull/31

var bleno = require('eddystone-beacon/node_modules/bleno'); // require('bleno');
var eddystoneBeacon = require('eddystone-beacon'); // require('./../../index')

var characteristic = new bleno.Characteristic({
  uuid: 'E0D38F1C-56CA-4B75-9D44-3E4134F7CB0B',
  properties: ['read'],
  value: new Buffer('example')
});

var service = new bleno.PrimaryService({
  uuid: 'E0D38F1C-56CA-4B75-9D44-3E4134F7CB0A',
  characteristics: [
    characteristic
  ]
});

bleno.once('advertisingStart', function(err) {
  if (err) {
    throw err;
  }

  console.log('on -> advertisingStart');
  bleno.setServices([
    service
  ]);
});

eddystoneBeacon.advertiseUrl('http://www.example.com');
