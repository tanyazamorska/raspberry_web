require('bootstrap/dist/css/bootstrap.css');
require('bootswatch/paper/bootstrap.min.css');
require('./styles.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout/Layout';
import FileManager from './pages/file-manager/FileManager.js';
import Camera from './pages/camera/Camera.js';
import {Router, Route, hashHistory} from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout} >
      <Route path="/file-manager/*" component={FileManager} />
      <Route path="/camera" component={Camera} />
    </Route>
  </Router>,
  document.getElementById('app')
);


