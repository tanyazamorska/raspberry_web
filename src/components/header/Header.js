import './header.scss';
import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default k-header">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to={"/"} className="navbar-brand">
              <i className="glyphicon glyphicon-home"></i>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
};
