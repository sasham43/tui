const blessed = require('blessed')
const contrib = require('blessed-contrib')

var speed = require('./speed');
var spotify = require('./spotify');

var count = 0;
// console.log('speed', speed);
speed.speedEmitter.on('speed', function(data){
    // console.log('evt', data);
    box.setContent(`
        Upload: ${data.upload}
        Download: ${data.download}
        `)

    count++
    upload.x.push(`u${count}`)
    download.x.push(`d${count}`)
    upload.x.push(data.upload)
    download.y.push(data.download)
    screen.append(line) //must append before setting data
    line.setData([download, upload])


    screen.render();
})

spotify.spotifyEmitter.on('now-playing', function(data){
    album.setContent(`
Now playing: ${data.track} - ${data.artist}
${data.image}
        `)
})

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 0,
  left: 0,
  width: '50%',
  height: '10%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

var album = blessed.box({
    top: '50%',
    left: 0,
    width: '50%',
    height: '50%',
    content: ``,
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'black',
        border: {
            fg: 'chartreuse'
        }
    }
})

var terminal = blessed.terminal({
  parent: screen,
  cursor: 'block',
  cursorBlink: true,
  screenKeys: false,
  label: ' terminals ',
  left: '50%',
  top: 0,
  width: '50%',
  height: '50%',
  border: 'line',
  style: {
    fg: 'default',
    bg: 'default',
    focus: {
      border: {
        fg: 'green'
      }
    }
  }
});

var line = contrib.line(
         { style:
           { line: "yellow"
           , text: "green"
           , baseline: "black"}
         , xLabelPadding: 3
         , xPadding: 5
         , showLegend: true
         , wholeNumbersOnly: false //true=do not show fraction in y axis
         , label: 'Speeds',
         top: '10%',
         left: 0,
         width: '50%',
         height: '40%',
         border: {
           type: 'line'
         },
         style: {
           fg: 'white',
           bg: 'black',
           border: {
             fg: '#f0f0f0'
           },
           hover: {
             bg: 'green'
           }
         }
     })
   var upload = {
         title: 'upload',
         x: ['u0'],
         y: [1],
         style: {
             line: 'red'
         }
      }
   var download = {
         title: 'download',
         x: ['d0'],
         y: [1],
         style: {
             line: 'yellow'
         }
      }

// Append our box to the screen.
screen.append(box);
screen.append(album);

screen.append(line) //must append before setting data
line.setData([download, upload])

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
terminal.focus();

// Render the screen.
screen.render();
