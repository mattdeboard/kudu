'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var KuduApp = React.createClass({
  state: {
    hidden: false
  },

  componentDidMount: function() {
    var self = this;
    setTimeout(
      function() { self.setState({ hidden: true }); },
      10000
    );
  },

  render: function() {
    var styles = {
      left: {
        display: "table-cell",
        "vertical-align": "middle",
        "text-align": "right",
        "width": "50%",
        "padding-right": "15px"
      },
      right: {
        display: "table-cell",
        "table-cell": "vertical-align",
        "text-align": "left"
      }
    };

    return (
      <div style={{display: this.props.hidden ? "none" : "block" }}>
        <div style={styles.left}>
          Scan Target &#35;1 (surfer):
        </div>
        <div style={styles.right}>
          <img src="assets/surfer.png" />
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
