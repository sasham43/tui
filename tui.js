const blessed = require('blessed')
const contrib = require('blessed-contrib')

var speed = require('./speed');
// console.log('speed', speed);
speed.speedEmitter.on('speed', function(data){
    // console.log('evt', data);
    box.setContent(`
        Upload: ${data.upload}
        Download: ${data.download}
        `)
    screen.render();
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
  height: '50%',
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

// Append our box to the screen.
screen.append(box);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
terminal.focus();

// Render the screen.
screen.render();
