import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row content">
          <div className="col-sm-3">
            <a href="#" className="btn btn-primary folder">file manager</a>
          </div>
          <div className="col-sm-3">
          <a href="#" className="btn btn-warning folder"></a>
          </div>
          <div className="col-sm-3">
            <a href="#" className="btn btn-info folder"></a>
          </div>
          <div className="col-sm-3">
            <a href="#" className="btn btn-danger folder"></a>
          </div>
        </div>
      </div>
    )
  }
}
