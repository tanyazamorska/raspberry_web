import './folders.scss';
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

    let size = this.props.size / 1000000;
    if (this.props.kind === 'file') {
      size = Math.round(size) + 'MB';
    } else {
      size = '-';
    }

    let pathToGo = this.props.path;

    return (
      <tr>
        <td className="k-row-small">
          <i className={"glyphicon " + additionalClass} onClick={() => this.props.clickFunction(pathToGo +"/" + this.props.name)}></i>
        </td>
        <td className="k-row-big">
          <Link to={"folders/" + this.props.name} title="open">
            <span>{this.props.name}</span>
          </Link>
        </td>
        <td>{size}</td>
        <td>{lastModified}</td>
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


export default class Folders extends React.Component {
  constructor(props) {
    super(props);
    let self = this;
    this.state = {
      filesAndFolders: [],
      path: ""
    };
    console.log(this.props.params); // TODO
    browserHistory.listen( location =>  {
      setTimeout(() => {
        console.log(self.props.params); // TODO
      }, 0);
    });

    this.requestDataFromServer("/sys");
  }

  requestDataFromServer(path) {
    let self = this;
    $.ajax({
      method: "POST",
      url: "http://192.168.0.100:7777/api/fs/ls",
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
      <div className="k-folders">
        <span><h4>{path}</h4></span>
        <form className="navbar-form navbar-right" role="search">
          <div className="form-group">
            <input type="text" className="form-control"/>
          </div>
          <button type="submit" className="btn btn-primary">Upload file</button>
        </form>

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





