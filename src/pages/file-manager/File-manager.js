import './file-manager.scss';
import React from 'react';
import {Link, browserHistory} from 'react-router';
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

    let dateModified = (modified) => {
      let date = moment(this.props.lastModified);
      let lastModified = null; // 'YYYY.MM.DD hh:mm a'
      let day = date.format('DD'); // 23
      let year = date.format('YYYY'); // 2015

      if (moment().format('DD') === day) {
        lastModified = date.format('hh:mm a');
      } else if (moment().format('YYYY') === year) {
        lastModified = date.format('MMMM DD');
      } else {
        lastModified = date.format('YYYY.MM.DD');
      }
      return lastModified;
    };

    let setSizeOfFile = (size) => {
      if (this.props.kind === 'file') {
        if (size < 1000) {
          size = size + ' B';
        } else if (size > 1000 && size < 99999) {
          size = (size / 1000).toFixed(1) + ' kB';
        }  else if (size < 1000000000) {
          size = (size / 1000000).toFixed(1) + ' MB';
        }
      } else {
        size = '-';
      }
      return size;
    };

    let pathToGo = (this.props.path === '/') ? "" : this.props.path;

    return (
      <tr>
        <td className="k-row-small">
          <Link to={"file-manager" + pathToGo + "/" + this.props.name + '/'}>
            <i className={"glyphicon " + additionalClass}></i>
          </Link>
        </td>
        <td className="k-row-big">
          <Link to={"file-manager" + pathToGo + "/" + this.props.name + '/'} title="open">
            <span>{this.props.name}</span>
          </Link>
        </td>
        <td>{setSizeOfFile(this.props.size)}</td>
        <td>{dateModified(this.props.lastModified)}</td>
        <td>
          <Link to={"#"} title="download">
            <i className="glyphicon glyphicon-download-alt k-icon-download-alt"></i>
          </Link>
          <Link to={"#"} title="remove">
            <i className="glyphicon glyphicon-remove k-icon-remove"></i>
          </Link>
        </td>
      </tr>
    )
  }
}


export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
    let self = this;
    this.state = {
      filesAndFolders: [],
      path: ""
    };

    let setTimeoutFunction = () => {
      setTimeout(() => {
        self.requestDataFromServer("/" + self.props.params.splat);
      }, 0);
    };

    browserHistory.listen( location =>  {
      setTimeoutFunction();
    });

    setTimeoutFunction();
  }

  requestDataFromServer(path) {
    let self = this;
    $.ajax({
      method: "POST",
      url: "http://192.168.0.101:7777/api/fs/ls",
      data: JSON.stringify({"path": path}),
      contentType: 'application/json',
      complete: function (res) {
        self.setState(res.responseJSON);
      }
    });
  }

  render() {
    let self = this;
    let path = this.state.path;
    this.state.filesAndFolders.forEach(function (item, key) {
      item.id = key;
      item.path = path;
    });

    return (
      <div className="k-file-manager">
        <div className="row container">
          <div className="col-xs-6 col-sm-6">
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <h4>{path}</h4>
              </div>
            </form>
           </div>
          <div className="col-xs-6 col-sm-6">
            <form className="navbar-form navbar-right">
             <div className="form-group">
              <input type="text" className="form-control"/>
            </div>
             <button type="submit" className="btn btn-primary btn-sm">Upload file</button>
            </form>
          </div>
        </div>

        <table className="table">
          <thead>
          <tr>
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
              return <Folder name={el.name} kind={el.kind} key={el.id} path={el.path} lastModified={el.lastModified}
                             size={el.size} clickFunction={(path) => self.requestDataFromServer(path)}/>
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}
