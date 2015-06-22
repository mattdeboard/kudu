'use strict';

var KuduApp = require('./KuduApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={KuduApp}>
    <Route name="/" handler={KuduApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});

/**
   Local Variables:
   eval: (web-mode-set-content-type "jsx")
   End:
*/
