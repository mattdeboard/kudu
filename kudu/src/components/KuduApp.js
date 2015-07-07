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

  getDefaultProps: function() {
    return {lat: 100.9, lon: 200.8, altitude: 300.7};
  },

  handlePOIMarkClick: function(e) {
    var date = (new Date()).toString();

    return $.ajax(
      {
        url: "/api/v1/markers/",
        method: 'POST',
        data: JSON.stringify({
          geolocation: {
            lat: this.props.lat,
            lon: this.props.lon,
            altitude: this.props.altitude
          },
          title: date,
          description: "This is the description for the POI created at or around " + date
        }),
        dataType: 'json',
        headers: {
          Authorization: 'Token 105089ea9abbe8aeb8bd9eaf873287e05d533d7f',
          "Content-Type": "application/json"
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
    var disabled = !this.props.lat;
    console.log(this.props);
    return (
      <div className="ui-grid-d">
        <h4>Latitude: {this.props.lat}</h4>
        <h4>Longitude: {this.props.lon}</h4>
        <h4>Altitude: {this.props.altitude}</h4>
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
