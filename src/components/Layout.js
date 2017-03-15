import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Home from "../pages/Home"

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children || <Home/>}
        <Footer />
      </div>
    )
  }
}