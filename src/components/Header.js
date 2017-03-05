import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
    <div className="page-header">
      <div className="header-top"></div>
      <div className="brand">
        <a href="#">
          <img className="logo" src="" alt="logo"/>
        </a>
      </div>
      <div className="fixed-header-bottom">
        <ul className="sub-menu">
          <li>
            <a href="#">Menu</a></li>
        </ul>
      </div>
    </div>
    )
  }
}
