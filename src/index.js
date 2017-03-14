import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './app.js';
import Folders from './components/Folders.js';
import Camera from './components/Camera.js';
import {Router, Route, hashHistory} from 'react-router';

if (module && module.hot) {
    module.hot.accept('./app.js', () => {
        const App = require('./app.js').default;
        render(
            <App/>,
            document.querySelector("app")
        );
    });
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/folders" component={Folders} />
    <Route path="/camera" component={Camera} />
  </Router>,
  document.getElementById('app')
);
