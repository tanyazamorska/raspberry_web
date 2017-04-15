import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import FileFolder from 'material-ui/svg-icons/file/folder';
import EditorFile from 'material-ui/svg-icons/editor/insert-drive-file';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';

export class Folder extends React.Component {
  render() {
    let additionalClass = null;
    if (this.props.kind === 'folder') {
      additionalClass = <FileFolder
        style={{height: '44px', width: '44px', marginRight: '20px', color: theme.palette.accent3Color}}/>;
    } else {
      additionalClass = <EditorFile
        style={{height: '44px', width: '44px', marginRight: '20px', color: theme.palette.borderColor}}/>;
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
        return <EditorModeEdit />;
      }
    };

    return (
      <TableRow>
        <TableRowColumn style={{width: '25%'}}>
          <Link
            to={"/file-manager/" + this.props.hideHidden + '/' + this.props.sortBy + url(this.props.path, this.props.name)}
            title="open">
            <span>{additionalClass}</span>
            <span style={{position: 'relative', top: '-15px'}}>{this.props.name}</span>
          </Link>
        </TableRowColumn>
        <TableRowColumn>

        </TableRowColumn>
        <TableRowColumn>
          {setSizeOfFile(this.props.size, this.props.kind)}
        </TableRowColumn>
        <TableRowColumn>
          {dateModified(this.props.lastModified)}
        </TableRowColumn>
        <TableRowColumn>
          <Link to={"#"} title="download">
            <FileFileDownload style={{marginRight: '20px'}}/>
          </Link>
          <Link
            to={`/editor/${this.props.hideHidden + `/` + this.props.sortBy + url(this.props.path, this.props.name)}`}
            title="editor" target="_blank">
            {editorIcon(this.props.kind, this.props.size)}
          </Link>
        </TableRowColumn>
      </TableRow>
    )
  }
}


