# node-eddystone-beacon

Create an [Eddystone](https://github.com/google/eddystone) Beacon using Node.js

[Eddystone-URL](https://github.com/google/eddystone/tree/master/eddystone-url) beacons can be used with the [Physical Web](http://google.github.io/physical-web/).

## Prerequisites

Requires Node.js and Linux or OS X 10.10 or above with Bluetooth 4.0 hardware.

On Linux, you __need__ to run with ```sudo``` or as ```root```. See [bleno](https://github.com/sandeepmistry/bleno#running-on-linux) for more info.

Have an older machine or Raspberry Pi? Add a [Bluetooth 4.0 USB Adapter](http://www.adafruit.com/products/1327).

## Install

```sh
npm install eddystone-beacon
```

## Usage

```javascript
var eddystoneBeacon = require('eddystone-beacon');

```

### Options

```javascript
var options = {
  txPowerLevel: -22  // override TX Power Level, default value is -21,
  tlmCount: 2,       // 2 TLM frames
  tlmPeriod: 10      // every 10 advertisements
};
```

__Note__: an advertising interval of 100ms is used.

### [Eddystone-URL](https://github.com/google/eddystone/tree/master/eddystone-url)

```javascript
var url = 'http://example.com';

eddystoneBeacon.advertiseUrl(url, [options]);
```

### [Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid)

```javascript
var namespaceId = '00010203040506070809';
var instanceId = 'aabbccddeeff';

eddystoneBeacon.advertiseUid(namespaceId, instanceId, [options]);
```

### TLM data

Use with interleaved TLM mode, see options above.

#### Battery Voltage

```javascript
var batteryVoltage = 500; // between 500 and 10,000 mV

eddystoneBeacon.setBatteryVoltage(batteryVoltage);
```

#### Temperature

```javascript
var temperature = 22.0; // between -128.0 and 128.0

eddystoneBeacon.setTemperature(temperature);
```

### Examples

 * [Eddystone-URL](https://github.com/google/eddystone/tree/master/eddystone-url)
   * [simple](examples/url/simple.js) - easiest way to create a Eddystone-URL Beacon
   * [power-level](examples/url/power-level.js) - create a Eddystone-URL Beacon specifying txPowerLevel
 * [Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid)
  * [simple](examples/uid/simple.js) - easiest way to create a Eddystone-UID Beacon
  * [with-tlm](examples/uid/with-tlm.js) - create a Eddystone-UID Beacon with interleaved TLM data

## Development

### Install the dependencies

```sh
npm install
```

### Run tests

```sh
npm test
```
