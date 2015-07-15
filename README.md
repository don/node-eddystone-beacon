# Create an [Eddystone](https://github.com/google/eddystone) Beacon using Node.js

Eddystone-URL beacons can be used with the [Physical Web](http://google.github.io/physical-web/).

## Prerequisites

Requires Node.js and Linux or OS X 10.10 or above with Bluetooth 4.0 hardware.

On Linux, you __need__ to run as ```sudo```. See [bleno](https://github.com/sandeepmistry/bleno#running-on-linux) for more info.

Have an older machine or Raspberry Pi? Add a [Bluetooth 4.0 USB Adapter](http://www.adafruit.com/products/1327).

## Install

```sh
npm install eddystone-beacon
```

## Usage

```javascript
var EddystoneBeacon = require('eddystone-beacon');
```

### [Eddystone-URL](https://github.com/google/eddystone/tree/master/eddystone-url)

Advertise URL with default TX power level (-21 dBm)

```javascript
EddystoneBeacon.advertise('http://example.com');
```

Advertise URL with custom TX power level

```javascript
EddystoneBeacon.advertise('http://example.com', { txPowerLevel: -22 });
```

### Examples

 * URL
   * [simpleBeacon](examples/url/simpleBeacon.js) - easiest way to create a Eddystone-URL Beacon
   * [powerLevel](examples/url/powerLevel.js) - create a Eddystone-URL Beacon specifying txPowerLevel
   * [blenoBeacon](examples/url/blenoBeacon.js) - manually create a Eddystone-URL Beacon using [bleno](https://github.com/sandeepmistry/bleno)
   * [flexibleBeacon](examples/url/flexibleBeacon.js) - use library to encode URL, manually handle advertising data

## Development

### Install the dependencies

```sh
npm install
```

### Run tests

```sh
npm test
```

## TODO

 * Support for [Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid) and [Eddystone-TLM](https://github.com/google/eddystone/tree/master/eddystone-tlm) beacons
