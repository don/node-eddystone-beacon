Bluetooth URI Beacon for [Physical Web](http://google.github.io/physical-web/)

Requires NodeJS and Linux

Install the dependencies

    npm install

Run tests

    npm test

Create a beacon

    $ sudo node
    > uriBeacon = require ('./uri-beacon')
    > uriBeacon.advertise('http://example.com')

See the examples

 * [simpleBeacon](examples/simpleBeacon.js) - easiest way to create a URI Beacon
 * [blenoBeacon](examples/blenoBeacon.js) - manually create a URI Beacon using [bleno](https://github.com/sandeepmistry/bleno)
 * [flexibleBeacon](examples/flexibleBeacon.js) - use library to encode URI, manually handle advertising data

This only runs on Linux. You need to run as sudo. See [bleno](https://github.com/sandeepmistry/bleno#running-on-linux) for more info.

Have an older machine or Raspberry Pi? Add a [Bluetooth 4.0 USB Adapter](http://www.adafruit.com/products/1327).
