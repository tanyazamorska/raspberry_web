import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {TableRow, TableRowColumn} from 'material-ui/Table';

export class Folder extends React.Component {
  render() {
    let additionalClass = null;
    let kind = null;
    if (this.props.kind === 'folder') {
      additionalClass = `-icons k-folder-icon-folder`;
      kind = 'folder';
    } else {
      additionalClass = `-icons k-folder-icon-file`;
      kind = `insert_drive_file`;
    }

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

    const editorIcon = (file, size) => {
      if (file === 'file' && size < 1000000) {
        return <i className="material-icons k-icon-pencil">mode_edit</i>;
      }
    };

    return (
      <TableRow>
        <TableRowColumn>
          <Link
            to={"/file-manager/" + this.props.hideHidden + '/' + this.props.sortBy + url(this.props.path, this.props.name)}>
            <i className={"material" + additionalClass}>{kind}</i>
          </Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link
            to={"/file-manager/" + this.props.hideHidden + '/' + this.props.sortBy + url(this.props.path, this.props.name)}
            title="open">
            <span>{this.props.name}</span>
          </Link>
        </TableRowColumn>
        <TableRowColumn>
          {setSizeOfFile(this.props.size, this.props.kind)}
        </TableRowColumn>
        <TableRowColumn>
          {dateModified(this.props.lastModified)}
        </TableRowColumn>
        <TableRowColumn>
          <Link to={"#"} title="download">
            <i className="material-icons k-icon-download">file_download</i>
          </Link>
          <Link to={"#"} title="remove">
            <i className="material-icons k-icon-remove">clear</i>
          </Link>
          <Link to={`/editor/${this.props.hideHidden + `/` + this.props.sortBy + url(this.props.path, this.props.name)}`}
                title="editor" target="_blank">
            {editorIcon(this.props.kind, this.props.size)}
          </Link>
        </TableRowColumn>
      </TableRow>
    )
  }
}


