'use strict';

require('./style.css');
require('bootstrap/dist/css/bootstrap.css');
require('bootswatch/paper/bootstrap.min.css');

var React = require('react');
var Hello = require('./Hello');

React.renderComponent(
    <Hello />,
    document.getElementById('root')
);
