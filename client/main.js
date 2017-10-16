/**
 * Create GIF and display in preview location
 * @param event
 */
function createGIF(event) {

  var ms = document.querySelector('input[type=number]').value; // Interval input
  var location = document.querySelector('#display'); // Display location of gif preview

  Meteor.createGIF(event, ms, location);
}

/**
 * clearList - clear the list from dom
 *
 * @param event
 */
function clearList(event) {

  // Remove from image collection
  Meteor.clear();

  // Remove image from display list and preview
  var display = document.querySelector('#display');
  var list = document.querySelector('#list');
  var status = document.querySelector('#status');

  // Clear out preview images
  list.innerHTML = '';
  status.innerHTML = 'Drag the files from a folder to the drop area';

  while(display.firstChild) {
    display.removeChild(display.firstChild);
  }

  // Empty file selection input
  document.querySelectorAll('input[type=file]').forEach(function(input) {
    input.value = '';
  });
}

// Updates file counter
Template.counter.helpers({
  'count': function() {
    return Meteor.count();
  }
});

Template.create.events({
  'click': createGIF
});

Template.body.events({
  'click #clear': clearList,
  'dropped .drop-zone': Meteor.saveFile,
  'change #file-browse': Meteor.saveFile
});
