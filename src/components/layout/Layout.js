import './layout.scss';
import React from 'react';
import Header from './../header/Header.js';
import Footer from './../footer/Footer.js';
import Home from "./../../pages/home/Home.js";

export default class Layout extends React.Component {
  render() {
    return (
      <div className="k-layout">
        <Header />
        <div className="container k-content">
          {this.props.children || <Home/>}
        </div>
        <Footer />
      </div>
    )
  }
}
