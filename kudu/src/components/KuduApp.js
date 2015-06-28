'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var cx = require('classnames');
var $ = require('jquery');

window.banana = function() { console.log("Hey!"); };

var KuduApp = React.createClass({
  handlePOIMarkClick: function(e) {
    return $.post("http://localhost:8000/api/v1/geolocations/",
           {
             lat: 32.91849384,
             lon: 85.12938198,
             altitude: 100
           },
           'json'
    );
  },

  render: function() {
    var btnClasses = cx(
      'ui-grid-b',
      'ui-btn',
      'ui-btn-inline',
      'ui-shadow',
      'ui-corner-all'
    );

    return (
      <div className="ui-grid-d">
        <button className={btnClasses}
                id="poi-mark"
                onClick={this.handlePOIMarkClick}>
          Mark as Point of Interest
        </button>
      </div>
    );
  }
});

module.exports = KuduApp;

/**
   Local Variables:
   eval: (web-mode-set-content-type "jsx")
   End:
*/
