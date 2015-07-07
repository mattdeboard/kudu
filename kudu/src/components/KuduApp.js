'use strict';

var Immutable = require('immutable');
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var cx = require('classnames');
var $ = require('jquery');

var KuduApp = React.createClass({
  propTypes: {
    lat: React.PropTypes.number,
    lon: React.PropTypes.number,
    altitude: React.PropTypes.number
  },

  handlePOIMarkClick: function(e) {
    return $.ajax(
      {
        url: "/api/v1/geolocations/",
        method: 'POST',
        data: {
          lat: this.props.lat,
          lon: this.props.lon,
          altitude: this.props.altitude
        },
        dataType: 'json',
        headers: {
          Authorization: 'Token 105089ea9abbe8aeb8bd9eaf873287e05d533d7f'
        }
      }).fail( function(errObj) {
      var errStatus = JSON.parse(errObj.responseText);
      errStatus.non_field_errors.forEach( function(val) {
        console.log(val);
      });
    });
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
          Mark as POI
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
