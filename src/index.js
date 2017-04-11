require('./styles.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout/Layout';
import FileManager from './pages/file-manager/FileManager.js';
import Camera from './pages/camera/Camera.js';
import Editor from './pages/editor/Editor.js';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={Layout} >
      <Route path="/file-manager/:hideHidden/:sortBy/*" component={FileManager} />
      <Route path="/camera/" component={Camera} />
      <Route path="/editor/*" component={Editor} />
    </Route>
  </Router>,
  document.getElementById('app')
);

