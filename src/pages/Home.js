import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row content">
          <div className="col-xs-6 col-sm-3">
            <Link to={"/folders"} className="btn btn-primary folder">
              <i className="glyphicon glyphicon-folder-open iconhome"></i>
            </Link>
          </div>
          <div className="col-xs-6 col-sm-3">
            <Link to={"/camera"} className="btn btn-danger folder">
              <i className="glyphicon glyphicon-camera iconhome"></i>
            </Link>
          </div>
          <div className="col-xs-6 col-sm-3">
            <a href="#" className="btn btn-info folder"></a>
          </div>
          <div className="col-xs-6 col-sm-3">
            <a href="#" className="btn btn-success folder"></a>
          </div>
        </div>
      </div>
    )
  }
}
