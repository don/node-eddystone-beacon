Bluetooth URI Beacon for [Physical Web](http://google.github.io/physical-web/)

Requires Node.js and Linux or OS X 10.10 or above.

Install the dependencies

    npm install

Run tests

    npm test

Create a beacon

    $ sudo node
    > uriBeacon = require ('./uri-beacon')
    > uriBeacon.advertise('http://example.com')

Create a beacon and specify the txPowerLevel in dBm

    $ sudo node
    > uriBeacon = require ('./uri-beacon')
    > uriBeacon.advertise('http://example.com', { txPowerLevel: -22 })

See the examples

 * [simpleBeacon](examples/simpleBeacon.js) - easiest way to create a URI Beacon
 * [powerLevel](examples/powerLevel.js) - create a URI Beacon specifying txPowerLevel
 * [blenoBeacon](examples/blenoBeacon.js) - manually create a URI Beacon using [bleno](https://github.com/sandeepmistry/bleno)
 * [flexibleBeacon](examples/flexibleBeacon.js) - use library to encode URI, manually handle advertising data

On Linux, you __need__ to run as ```sudo```. See [bleno](https://github.com/sandeepmistry/bleno#running-on-linux) for more info.

Have an older machine or Raspberry Pi? Add a [Bluetooth 4.0 USB Adapter](http://www.adafruit.com/products/1327).
