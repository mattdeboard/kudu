'use strict';

describe('KuduApp', function () {
  var React = require('react/addons');
  var KuduApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    KuduApp = require('components/KuduApp.js');
    component = React.createElement(KuduApp);
  });

  it('should create a new instance of KuduApp', function () {
    expect(component).toBeDefined();
  });
});
