import React from 'react';
require('bootstrap/dist/css/bootstrap.css');
require('bootswatch/paper/bootstrap.min.css');
require('./styles.scss');
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Content from './components/Content.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    )
  }
}
