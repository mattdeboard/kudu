'use strict';

var Immutable = require('immutable');
var NotificationSystem = require('react-notification-system');
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

  _authHeaders: Immutable.Map({
    Authorization: 'Token 105089ea9abbe8aeb8bd9eaf873287e05d533d7f',
  }),

  _createHeaderObj: function(m) {
    // Accepts a POJO and returns a POJO.
    return this._authHeaders.merge(Immutable.Map(m)).toObject();
  },

  getDefaultProps: function() {
    // For development in browser only.
    return {lat: 100.9, lon: 200.8, altitude: 300.7};
  },

  getInitialState: function() {
    return {
      title: "",
      description: "",
    };
  },

  componentDidMount: function() {
    this._notificationSystem = this.refs.notificationSystem;
  },

  addNotification: function(msg, level) {
    this._notificationSystem.addNotification({
      message: msg,
      level: level
    });
  },

  handleInputKeyPress: function(inputName, e) {
    this.setState({ [ inputName ]: e.target.value });
  },

  handlePOIClearAllClick: function(e) {
    return $.ajax({
      url: "/api/v1/markers/clear_all/",
      method: "GET",
      headers: this._authHeaders.toObject()
    });
  },

  handleFormSubmit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    return $.ajax(
      {
        url: "/api/v1/markers/",
        method: 'POST',
        data: JSON.stringify({
          geolocation: {
            lat: this.props.lat,
            lon: this.props.lon,
            altitude: this.props.altitude,
          },
          title: e.target.title.value,
          description: e.target.description.value
        }),
        dataType: 'json',
        headers: this._createHeaderObj({"Content-Type": "application/json"})
      }).fail( function(errObj) {
        var errStatus = JSON.parse(errObj.responseText);
        console.log(errStatus);
        this.addNotification("Request failed: " + errStatus, "error");
      }.bind(this)).done( function() {
        this.setState({ title: "", description: "" });
        this.addNotification("Marker added!", "success");
      }.bind(this));
  },

  render: function() {
    var btnClasses = cx(
      'ui-grid-b',
      'ui-btn',
      'ui-btn-inline',
      'ui-shadow',
      'ui-corner-all'
    );
    var styleHidden = {display: "none"};

    return (
      <div className={cx('ui-grid-b')}>
        <NotificationSystem ref="notificationSystem" />
        <div className={cx('ui-body', 'ui-body-a')}
             style={{background: "transparent"}}
             >
          <h4 className="ui-field-contain">Latitude: {this.props.lat}</h4>
          <h4>Longitude: {this.props.lon}</h4>
          <h4>Altitude: {this.props.altitude}</h4>
          <form id="marker-form"
                action="/api/v1/markers/"
                method="POST"
                onSubmit={this.handleFormSubmit}
                >
            <label htmlFor="marker-title">
              Title:
            </label>
            <input type="text"
                   name="title"
                   id="marker-title"
                   value={this.state.title}
                   onChange={this.handleInputKeyPress.bind(this, "title")}
            />
            <label htmlFor="marker-description" >
              Description:
            </label>
            <textarea name="description"
                      id="marker-description"
                      value={this.state.description}
                      onChange={this.handleInputKeyPress.bind(this, "description")}
            />
          </form>
          <button className={btnClasses}
                  id="poi-mark"
                  form="marker-form"
                  type="submit"
                  >
            Mark as POI
          </button>
          <button className={btnClasses}
                  id="poi-clear-all"
                  onClick={this.handlePOIClearAllClick}>
            Clear all POIs
          </button>
        </div>
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
