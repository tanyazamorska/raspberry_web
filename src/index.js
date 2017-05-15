import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Layout from './components/Layout/Layout';
import FileManager from './pages/file-manager/FileManager.js';
import GPIO from './pages/gpio/GPIO.js';
import Camera from './pages/camera/Camera.js';
import Editor from './pages/editor/Editor.js';
import LedMatrix from './pages/led-matrix/LedMatrix.js';
import Manual from './pages/led-matrix/Manual.js';
import Ticker from './pages/led-matrix/Ticker.js';
import './styles.scss';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={Layout} >
      <Route path="file-manager/:hideHidden/:sortBy/*" component={FileManager} />
      <Route path="camera/" component={Camera} />
      <Route path="led-matrix/" component={LedMatrix}>
        <Route path="manual/" component={Manual}/>
        <Route path="ticker/" component={Ticker}/>
      </Route>
      <Route path="editor/*" component={Editor} />
      <Route path="GPIO/" component={GPIO} />
    </Route>
  </Router>,
  document.getElementById(`app`)
);

