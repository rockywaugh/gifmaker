Meteor.saveFile = function(blob, name, path, type, callback) {

  var fileReader = new FileReader();
  var imageMaxCount = 5; // Per requirement, 5 pics only

  /**
   * Onload file reader actions
   *
   * @param file
   */
  fileReader.onload = function(file) {
    Meteor.displayImages(file);
  };

  // Error checking
  if (Meteor.count() === imageMaxCount) {
    alert('You are at the limit of images to add');
  } else {

    // Loop through selected files
    FS.Utility.eachFile(event, function(file) {

      // Check count agains image max
      if (Meteor.count() < imageMaxCount) {

        file.DateTime = new Date();

        // Insert file to image collection
        Images.insert(file, function(error, result) {
          if (error) {
            alert('There was an error selecting this image')
          }
        });

        fileReader['readAsBinaryString'](file);
      }
    });
  }
};

/**
 * displayImages - Display images in the DOM
 *
 * @param file      - loaded file object
 * @param imageFile - optional supplied file image object
 */
Meteor.displayImages = function(file, imageFile) {

  var status = document.getElementById('status');
  var list = document.getElementById('list');

  var bin = file.target.result;
  var newFile = document.createElement('div');
  var targetFile = imageFile || Images.findOne({}, {sort: {DateTime: -1, limit: 1}}).original; // Select the target file

  newFile.innerHTML = 'Loaded : '+targetFile.name+' size '+targetFile.size+' B';

  list.appendChild(newFile);

  var fileNumber = list.getElementsByTagName('div').length;

  status.innerHTML = fileNumber < FS.Utility.length
    ? 'Loaded 100% of file '+fileNumber+' of '+files.length+'...'
    : 'Done loading. processed '+fileNumber+' files.';

  var img = document.createElement("img");

  img.file = targetFile;
  img.src = 'data:'+targetFile.type+';base64,'+btoa(bin);

  list.appendChild(img);
};

/**
 * Return count of selected images
 *
 * @returns {any|*}
 */
Meteor.count = function() {
  return Images.find().count();
};

/**
 * Clear out selected images
 *
 * @param event
 */
Meteor.clear = function(event) {
  // Remove images from the image collection
  Images.find().forEach(function(file) {
    file.remove();
  });
};
