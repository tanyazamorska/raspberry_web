import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export class Folder extends React.Component {
  render() {
    let fileOrFolderClass = (this.props.kind === 'folder') ?
      "glyphicon-folder-close k-icon-folder-close" : "glyphicon-file k-icon-glyphicon-file";

    const dateModified = (modified) => {
      const date = moment(modified);
      const day = date.format('DD'); // 23
      const year = date.format('YYYY'); // 2015
      let lastModified = null; // 'YYYY.MM.DD hh:mm a'

      if (moment().format('DD') === day) {
        lastModified = date.format('hh:mm a');
        if (this.props.name === "..") {
          lastModified = '-'
        }
      } else if (moment().format('YYYY') === year) {
        lastModified = date.format('MMMM DD');
      } else {
        lastModified = date.format('YYYY.MM.DD');
      }
      return lastModified;
    };

    const setSizeOfFile = (size, kind) => {
      if (kind === 'file') {
        if (size < 1000) {
          size = size + ' B';
        } else if (size > 1000 && size < 99999) {
          size = (size / 1000).toFixed(1) + ' kB';
        } else if (size < 1000000000) {
          size = (size / 1000000).toFixed(1) + ' MB';
        }
      } else {
        size = '-';
      }
      return size;
    };

    const url = (pathToGo, name) => {
      // to kill double slash
      pathToGo = (pathToGo === '/') ? "" : pathToGo;
      // ex: "asd/asd/asd" => ["asd", "asd", "asd"]
      const arr = pathToGo.split('/');
      if (name === "..") {
        arr.pop();
        pathToGo = arr.join('/') + '/';
      } else {
        pathToGo = pathToGo + "/" + name + '/';
      }
      return pathToGo;
    };

    const editorIcon = (file) => {
      if (file === 'file') {
        return <i className="glyphicon glyphicon-pencil k-icon-pencil"></i>;
      }
    };
    //console.log(this.props.hideHidden)

    return (
      <tr>
        <td className="k-row-small">
          <Link to={"/file-manager/" + this.props.hideHidden + url(this.props.path, this.props.name)}>
            <i className={"glyphicon " + fileOrFolderClass}></i>
          </Link>
        </td>
        <td className="k-row-big">
          <Link to={"/file-manager/" + this.props.hideHidden +  url(this.props.path, this.props.name)} title="open">
            <span>{this.props.name}</span>
          </Link>
        </td>
        <td>{setSizeOfFile(this.props.size, this.props.kind)}</td>
        <td>{dateModified(this.props.lastModified)}</td>
        <td>
          <Link to={"#"} title="download">
            <i className="glyphicon glyphicon-download-alt k-icon-download-alt"></i>
          </Link>
          <Link to={"#"} title="remove">
            <i className="glyphicon glyphicon-remove k-icon-remove"></i>
          </Link>
          <Link to={"#"} title="editor">
            {editorIcon(this.props.kind)}
          </Link>
        </td>
      </tr>
    )
  }
}
