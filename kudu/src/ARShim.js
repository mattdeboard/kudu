var Shim = {
  context: {
    onLocationChanged: function() {
      console.log("Location changed!");
    }
  },

  activateDebugMode: function() {
    console.log("Debug mode activated!");
  },

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
  },

  GeoLocation: function(lat, lon, altitude) {
    console.log("GeoLocation instantiated with lat/lon/alt: " + [lat, lon, altitude].join());
  },

  GeoObject: function(markerLocation, config) {
    console.log("GeoObject instantiated");
  },

};

module.exports = window.AR || Shim;
