'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');


var KuduApp = React.createClass({
  render: function() {
    return (
      <p>Hey!</p>
    );
  }
});


module.exports = KuduApp;
