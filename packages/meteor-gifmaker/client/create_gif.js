Meteor.createGIF = function(event, millisecs, location) {

  // Default to 1000 milliseconds
  var secs = millisecs ? millisecs/1000 : 1;

  var images = [];
  var saveGIFButton = document.querySelector('#save-gif');

  Images.find().forEach(function(file) {
    images.push(file.url());
  });

  // Error check at least one image was selected
  if (images.length < 1 ) {
    alert('Select an image before creating gif');
  } else {

    // Create GIF using GIFShot
    gifshot.createGIF({'images': images, 'interval': secs}, function(obj) {

      if(!obj.error) {
        var link = document.createElement('a');

        link.href = obj.image;

        link.download = true;

        var image = document.createElement('img');

        image.src = obj.image;

        link.appendChild(image);

        location.prepend(link);

        // Show save gif button
        saveGIFButton.setAttribute('href', image.src);
        saveGIFButton.classList.remove('hidden');

      } else {
        console.log("Gifshot Error!");
      }
    });
  }

};
