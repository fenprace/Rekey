var Robot = require('robotjs');
Robot.setKeyboardDelay(10);

var Gui = require('nw.gui');
var Win = Gui.Window.get();
Win.setAlwaysOnTop(true);
Win.resizeTo(160, 320);
Win.setResizable(false);

// Exit
$('#buttonExit').click(function() {
  Win.close();
});

// changeWindow Event Listener
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

// Undo & Redo
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

// Move
var spaceDown = false;
$('#buttonMove').click(function() {
  if (spaceDown) {
    $(this).removeClass('buttonPressed');

    $('#buttonMove').css({'z-index': 0});
    $('#cover').css({'z-index': -1, display: 'none'});
   
    Robot.keyTap('escape', 'alt');
    Robot.keyToggle('space', 'up');
    spaceDown = false;
  } else {
    $(this).addClass('buttonPressed');

    $('#buttonMove').css({'z-index': 2});
    $('#cover').css({'z-index': 1, display: 'initial'});

    Robot.keyTap('escape', 'alt');
    Robot.keyToggle('space', 'down');
    spaceDown = true;
  }
});

// Erase
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

// Transform
$('#buttonTransform').click(function() {
  $(this).addClass('buttonClicked');

  setTimeout(function() {
    $('#buttonTransform').removeClass('buttonClicked');
  }, 400);
  
  $('#buttonCheck').css({'z-index': 2, height: '80px'});
  $('#buttonCheck i').css({opacity: 1});
  $('#cover').css({'z-index': 1, display: 'initial'});

  $(window).trigger('changeWindow');
  Robot.keyTap('t', 'control');
});

// Check
$('#buttonCheck').click(function() {
  $(this).addClass('buttonClicked');

  setTimeout(function() {
    $('#buttonCheck').removeClass('buttonClicked');
  }, 400);
  
  $('#buttonCheck').css({'z-index': 0, height: 0});
  $('#buttonCheck i').css({opacity: 0});
  $('#cover').css({'z-index': -1, display: 'none'});

  $(window).trigger('changeWindow');
  Robot.keyTap('enter');
});