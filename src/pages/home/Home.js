import './home.scss';
import React from 'react';
import {Link} from 'react-router';
import './home.scss';

export default class Home extends React.Component {
  render() {
    return (
      <div className="row content k-home">
        <div className="col-xs-6 col-sm-3">
          <Link to={"/folders"} className="btn btn-primary k-button">
            <i className="glyphicon glyphicon-folder-open k-icon-home"></i>
          </Link>
        </div>
        <div className="col-xs-6 col-sm-3">
          <Link to={"/camera"} className="btn btn-danger k-button">
            <i className="glyphicon glyphicon-camera k-icon-home"></i>
          </Link>
        </div>
        <div className="col-xs-6 col-sm-3">
          <a href="#" className="btn btn-info k-button"></a>
        </div>
        <div className="col-xs-6 col-sm-3">
          <a href="#" className="btn btn-success k-button"></a>
        </div>
      </div>
    )
  }
}
