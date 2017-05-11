import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Layout from './components/Layout/Layout';
import FileManager from './pages/file-manager/FileManager.js';
import Camera from './pages/camera/Camera.js';
import Editor from './pages/editor/Editor.js';
import LedMatrix from './pages/led-matrix/LedMatrix.js';
import './styles.scss';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={Layout} >
      <Route path="/file-manager/:hideHidden/:sortBy/*" component={FileManager} />
      <Route path="/camera/" component={Camera} />
      <Route path="/led-matrix/manual" component={LedMatrix}>
        <Route path="/tabB/"/>
      </Route>
      <Route path="/editor/*" component={Editor} />
    </Route>
  </Router>,
  document.getElementById(`app`)
);

