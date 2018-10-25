var speedTest = require('speedtest-net');
var eventEmitter = require('events')

var speedEmitter = new eventEmitter();

function getSpeed(){
    var test = speedTest({maxTime: 5000});

    test.on('data', data => {
      // console.dir(data);
      speedEmitter.emit('speed', {
          upload: data.speeds.upload,
          download: data.speeds.download
      })
    });

    test.on('error', err => {
      console.error(err);
    });
}

setInterval(getSpeed, 240000)
getSpeed();

module.exports = {getSpeed, speedEmitter};
