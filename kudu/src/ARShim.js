var Shim = {
  ClientTracker: function(path, callback) {
    console.log("ClientTracker instantiated with path: " + path);
    callback.onLoaded();
  },

  ImageResource: function() {
    console.log("ImageResource instantiated.");
  },

  ImageDrawable: function() {
    console.log("ImageDrawable instantiated.");
  },

  Trackable2DObject: function() {
    console.log("Trackable2DObject instantiated.");
  }
};

module.exports = window.AR || Shim;