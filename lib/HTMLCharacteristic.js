/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
var bleno = require('bleno');
var util = require('util');

function HTMLCharacteristic(html) {
  this._currentMTU = 0;
  this._queueOffset = 0;
  this._html = html;
  this._buffer = new Buffer(this._html, 'utf8');
  bleno.Characteristic.call(this, {
    uuid: 'd1a517f0249946ca9ccc809bc1c966fa',
    properties: ['read'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'HTML'
      })
    ]
  });

  var self = this;
  bleno.on('mtuChange', function(mtu) {
    self._currentMTU = mtu;
  });

  bleno.on('disconnect', function(){
    self._queueOffset = 0;
  });
}

util.inherits(HTMLCharacteristic,bleno.Characteristic);

HTMLCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (this._queueOffset < this._buffer.length) {
    var transfer = this._currentMTU - 5;
    var end = this._queueOffset + transfer >= this._buffer.length ? this._buffer.length: this._queueOffset + transfer;
    var slice = this._buffer.slice(this._queueOffset, end);
    callback(this.RESULT_SUCCESS, slice);
    this._queueOffset = end;
  } else if (this._queueOffset === this._buffer.length) {
    callback(this.RESULT_SUCCESS, new Buffer());
    this._queueOffset++;
  }

}

module.exports = HTMLCharacteristic;
