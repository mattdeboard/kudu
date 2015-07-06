'use strict';

var Immutable = require('immutable');
var KuduApp = require('./KuduApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var AR = require('../ARShim');
var ClientLocation = require('./ClientLocation');

var World = {
  locationChanged: function(lat, lon, altitude, accuracy) {
    ClientLocation.merge({ lat, lon, altitude });
    React.render(<KuduApp lat={lat} lon={lon} altitude={altitude} />,
                 document.getElementById('content'));
  }
};

AR.context.onLocationChanged = World.locationChanged;
React.render(<KuduApp />, document.getElementById('content'));

/**
   Local Variables:
   eval: (web-mode-set-content-type "jsx")
   End:
 */
