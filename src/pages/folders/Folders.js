import './folders.scss';
import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import moment from 'moment';

class Folder extends React.Component {
  render() {
    let additionalClass = null;
    if (this.props.kind === 'folder') {
      additionalClass = "glyphicon-folder-close k-icon-folder-close";
    } else {
      additionalClass = "glyphicon glyphicon-file k-icon-glyphicon-file";
    }

    let lastModified = moment().format('YYYY-MM-DD hh:mm a');
    let day = moment().format('DD');
    let year = moment().format('YYYY');

    if (moment().format('DD') === day) {
      lastModified = moment().format('hh:mm a');
    } else if (moment().format('YYYY') === year) {
      lastModified = moment().format('MM-DD');
    } else {
      lastModified = moment().format('YYYY-MM-DD');
    }

    return (
      <tr>
        <td className="k-row-small"><i className={"glyphicon " + additionalClass}></i></td>
        <td className="k-row-big"><Link to={"#"} title="open"><span>{this.props.name}</span></Link></td>
        <td>size</td>
        <td>{lastModified}</td>
        <td><Link to={"#"} title="download"><i className="glyphicon glyphicon-download-alt k-icon-download-alt"></i></Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to={"#"} title="remove"><i className="glyphicon glyphicon-remove k-icon-remove" /></Link>
        </td>
      </tr>
    )
  }
}

export default class Folders extends React.Component {
  constructor() {
    super();
    let self = this;
    this.state = {
      filesAndFolders: [],
      path: ""
    };

    $.ajax({
      method: "POST",
      url: "http://192.168.0.100:7777/api/fs/ls",
      data: JSON.stringify({"path": "/home/pi/OUR"}),
      contentType: 'application/json',
      complete: function (res) {
        self.setState(res.responseJSON);
      }
    });
  }

  render() {
    let path = this.state.path;
    this.state.filesAndFolders.forEach(function (item, key) {
      item.id = key;
      item.path = path;
    });

    return (
      <div className="k-folders">
        <span><h4>{path}</h4></span>
        <form className="navbar-form navbar-right" role="search">
          <div className="form-group">
            <input type="text" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Upload file</button>
        </form>

        <table className="table">
          <thead>
          <tr >
            <th className="k-row-small"></th>
            <th className="k-row-big">Name</th>
            <th>Size</th>
            <th>Modified</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.filesAndFolders.map(function (el) {
              return <Folder name={el.name} kind={el.kind} key={el.id} path={el.path} lastModified={el.lastModified}/>
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}




