import React from 'react';
import {Link, browserHistory} from 'react-router';
import moment from 'moment';

export class Folder extends React.Component {
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

    let url = (pathToGo, name) => {
      // to kill double slash
      pathToGo = (pathToGo === '/') ? "" : pathToGo;
      // ex: "asd/asd/asd" => ["asd", "asd", "asd"]
      let arr = pathToGo.split('/');

      if (name === "..") {
        arr.pop();
        pathToGo = arr.join('/') + '/';
      } else if (name === ".." && pathToGo === 'sys') {
        pathToGo ="file-manager/";
      } else {
        pathToGo = pathToGo + "/" + name + '/';
      }
      return pathToGo;
    };

    return (
      <tr>
        <td className="k-row-small">
          <Link to={"file-manager" + url(this.props.path, this.props.name)}>
            <i className={"glyphicon " + additionalClass}></i>
          </Link>
        </td>
        <td className="k-row-big">
          <Link to={"file-manager" + url(this.props.path, this.props.name)} title="open">
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
          <Link to={"#"} title="editor">
            <i className="glyphicon glyphicon-pencil k-icon-pencil"></i>
          </Link>
        </td>
      </tr>
    )
  }
}
