var Robot = require('robotjs');
Robot.setKeyboardDelay(10);

var Gui = require('nw.gui');
var Win = Gui.Window.get();
Win.setAlwaysOnTop(true);
Win.resizeTo(160, 240);

$('#buttonExit').click(function() {
  Win.close();
});

$(window).on('changeWindow', function() {
  Robot.keyTap('escape', 'alt');
});

Win.on('blur', function() {
  $(window).off('changeWindow');
});

Win.on('focus', function() {
  $(window).on('changeWindow', function() {
    Robot.keyTap('escape', 'alt');
  });
});

$('#buttonUndo').click(function() {
  $(this).addClass('buttonClicked');

  setTimeout(function() {
    $('#buttonUndo').removeClass('buttonClicked');
  }, 400);
  
  $(window).trigger('changeWindow');
  Robot.keyTap('z', 'control');
});

$('#buttonRedo').click(function() {
  $(this).addClass('buttonClicked');

  setTimeout(function() {
    $('#buttonRedo').removeClass('buttonClicked');
  }, 400);

  $(window).trigger('changeWindow');
  Robot.keyTap('y', 'control');
});

$('#buttonMove').toggle(function() {
  $(this).removeClass('buttonPressed');
}, function() {
  $(this).addClass('buttonPressed');
}); 

var spaceDown = false;
$('#buttonMove').click(function() {
  if (spaceDown) {
    $(this).removeClass('buttonPressed');
    Robot.keyTap('escape', 'alt');
    Robot.keyToggle('space', 'up');
    spaceDown = false;
  } else {
    $(this).addClass('buttonPressed');
    Robot.keyTap('escape', 'alt');
    Robot.keyToggle('space', 'down');
    spaceDown = true;
  }
});

var eraserDown = false;
$('#buttonEraser').click(function() {
  if (eraserDown) {
    $(this).removeClass('buttonPressed');
    Robot.keyTap('escape', 'alt');
    Robot.keyTap('e');
    eraserDown = false;
  } else {
    $(this).addClass('buttonPressed');
    Robot.keyTap('escape', 'alt');
    Robot.keyTap('e');
    eraserDown = true;
  }
});