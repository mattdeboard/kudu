'use strict';

var KuduApp = require('./KuduApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var AR = require('../ARShim');
var ClientLocation = require('./ClientLocation');
var $ = require('jquery');

// will truncate all strings longer than given max-length "n". e.g.
// "foobar".trunc(3) -> "foo..."
var trunc = function(str, n) {
  return str.substr(0, n - 1) + (this.length > n ? '...' : '');
};

var World = {
  createMarker: function(poiData) {
    /*
       For creating the marker a new object AR.GeoObject will be created at the
       specified geolocation. An AR.GeoObject connects one or more
       AR.GeoLocations with multiple AR.Drawables. The AR.Drawables can be
       defined for multiple targets. A target can be the camera, the radar or a
       direction indicator. Both the radar and direction indicators will be
       covered in more detail in later examples.
     */

    var markerLocation = new AR.GeoLocation(poiData.geolocation.lat,
                                            poiData.geolocation.lon,
                                            poiData.geolocation.altitude);

    /*
       There are two major points that need to be considered while drawing
       multiple AR.Drawables at the same location. It has to be defined which one
       is before or behind another drawable (rendering order) and if they need a
       location offset. For both scenarios, ARchitect has some functionality to
       adjust the drawable behavior.  To position the AR.Label in front of the
       background, the background drawable(AR.ImageDrawable2D) receives a zOrder
       of 0. Both labels have a zOrder of 1. This way it is guaranteed that the
       labels will be drawn in front of the background drawable.  Assuming both
       labels will be drawn on the same geolocation connected with the same
       AR.GeoObject they will overlap. To adjust their position change the
       offsetX and offsetY property of an AR.Drawable2D object. The unit for
       offsets are SDUs. For more information about SDUs look up the code
       reference or the online documentation.  In the following both AR.Labels
       are initialized and positioned. Note that they are added to the cam
       property of the AR.GeoObject the same way as an AR.ImageDrawable.
     */
    var markerDrawable_idle = new AR.ImageDrawable(World.markerDrawable_idle, 2.5, {
      zOrder: 0,
      opacity: 1.0
    });

    var titleLabel = new AR.Label(poiData.title, 1, {
      zOrder: 1,
      offsetY: 0.55,
      style: {
        textColor: '#FFFFFF',
        fontStyle: AR.CONST.FONT_STYLE.BOLD
      }
    });

    descriptionLabel = new AR.Label(trunc(poiData.description, 15), 0.8, {
        zOrder: 1,
        offsetY: -0.55,
        style: {
            textColor: '#FFFFFF'
        }
    });

    // Changed:
    this.markerObject = new AR.GeoObject(markerLocation, {
        drawables: {
            cam: [this.markerDrawable_idle, this.titleLabel, this.descriptionLabel]
        }
    });

    // Changed:
    var markerObject = new AR.GeoObject(markerLocation, {
      drawables: {
        cam: [markerDrawable_idle, titleLabel]
      }
    });

    return this;
  },

  loadPOIsFromJSONData: function(poiData) {

	/*
       The example Image Recognition already explained how images are
       loaded and displayed in the augmented reality view. This sample loads
       an AR.ImageResource when the World variable was defined. It will be
       reused for each marker that we will create afterwards.
     */
	World.markerDrawable_idle = new AR.ImageResource("assets/marker_idle.png");
    World.createMarker(poiData);
  },

  fetchPOIs: function() {
    return $.ajax({
      url: "/api/v1/markers/",
      headers: {
        Authorization: 'Token 105089ea9abbe8aeb8bd9eaf873287e05d533d7f'
      }
    }).done( function(data, textStatus, req) {
      data.results.forEach(World.loadPOIsFromJSONData);
    });
  },

  locationChanged: function(lat, lon, altitude, accuracy) {
    ClientLocation.merge({ lat, lon, altitude });
    React.render(<KuduApp lat={lat} lon={lon} altitude={altitude} />,
                 document.getElementById('content'));
  }
};

AR.context.onLocationChanged = World.locationChanged;
World.fetchPOIs();
React.render(<KuduApp />, document.getElementById('content'));

/**
   Local Variables:
   eval: (web-mode-set-content-type "jsx")
   End:
 */
