import React from 'react';
require('bootstrap/dist/css/bootstrap.css');
require('bootswatch/paper/bootstrap.min.css');
require('./styles.scss');
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import Layout from './components/layout/Layout';
import FileManager from './pages/file-manager/File-manager.js';
import Camera from './pages/camera/Camera.js';
import {Router, Route, hashHistory} from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout} >
      <Route path="/fileManager/*" component={FileManager} />
      <Route path="/camera" component={Camera} />
    </Route>
  </Router>,
  document.getElementById('app')
);


