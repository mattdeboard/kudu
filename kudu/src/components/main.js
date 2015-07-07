'use strict';

var KuduApp = require('./KuduApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var World = require('../World');
var AR = require('../ARShim');

AR.context.onLocationChanged = World.locationChanged;
World.fetchPOIs();
React.render(<KuduApp />, document.getElementById('content'));

/**
   Local Variables:
   eval: (web-mode-set-content-type "jsx")
   End:
 */
