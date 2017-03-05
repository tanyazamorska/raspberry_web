import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/paper/bootstrap.min.css'
import './styles.scss';
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
