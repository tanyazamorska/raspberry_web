import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import FileFolder from 'material-ui/svg-icons/file/folder';
import EditorFile from 'material-ui/svg-icons/editor/insert-drive-file';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import MyTheme from '../../MyTheme';
import variables from '../../variables';

export class Folder extends React.Component {
  getSizeOfFile(size, kind) {
    let res = ``;
    if (kind === `file`) {
      if (size <= 1000) {
        res = size + ` B`;
      } else if (size <= 100000) {
        res = (size / 1000).toFixed(1) + ` kB`;
      } else if (size <= 1000000000) {
        res = (size / 1000000).toFixed(1) + ` MB`;
      } else {
        res = (size / 1000000000).toFixed(1) + ` GB`;
      }
    } else {
      res = `-`;
    }
    return res;
  }

  dateModified = (modified) => {
    const date = moment(modified);
    const day = date.format(`DD`); // 23
    const month = date.format(`MMMM`); // May
    const year = date.format(`YYYY`); // 2015
    let lastModified = null; // 'YYYY.MM.DD hh:mm a'

    if (moment().format(`DD`) === day && moment().format(`MMMM`) === month && moment().format(`YYYY`) === year) {
      lastModified = date.format(`hh:mm a`);

      if (this.props.name === `..`) {
        lastModified = `-`;
      }
    } else if (moment().format(`YYYY`) === year) {
      lastModified = date.format(`MMMM DD`);
    } else {
      lastModified = date.format(`YYYY.MM.DD`);
    }
    return lastModified;
  };

  url = (pathToGo, name) => {
    // to kill double slash
    pathToGo = (pathToGo === `/`) ? `` : pathToGo;
    // ex: "asd/asd/asd" => ["asd", "asd", "asd"]
    const arr = pathToGo.split(`/`);
    if (name === `..`) {
      arr.pop();
      pathToGo = arr.join(`/`) + `/`;
    } else {
      pathToGo = pathToGo + `/` + name + `/`;
    }
    return pathToGo;
  };

  editorIcon = (file, size) => {
    const linkToEditor = (
      <Link to={`/editor${this.props.path}/${this.props.name}`}
            title='editor'
            target='_blank'><EditorModeEdit />
      </Link>
    );

    if (file === `file` && size < 100000) {
      const nameOfFiles = this.props.name;
      const positionDot = nameOfFiles.lastIndexOf(`.`);
      const fileExtension = nameOfFiles.slice(positionDot + 1);
      if (nameOfFiles.charAt(0) === `.`) {
        return linkToEditor;
      } else if (positionDot === -1) {
        return linkToEditor;
      } else if (positionDot !== -1) {
        const arrayFilesExtension = [`txt`, `md`, `ahk`, `applescript`, `as`, `au3`, `bat`, `bas`, `cljs`, `cmd`,
          `coffee`, `duino`, `egg`, `egt`, `erb`, `hta`, `ibi`, `ici`, `ijs`, `ipynb`, `itcl`, `js`, `jsfl`, `lua`,
          `m`, `mrc`, `ncf`, `nuc`, `nud`, `nut`, `php`, `pl`, `pm`, `ps1`, `ps1xml`, `psc1`, `psd1`, `psm1`, `py`,
          `pyc`, `pyo`, `r`, `rb`, `rdp`, `scpt`, `scptd`, `sdl`, `sh`, `syjs`, `sypy`, `tcl`, `vbs`, `xpl`, `ebuild`,
          `ada`, `adb`, `ads`, `asm`, `s`, `bas`, `bb`, ` bmx`, `c`, `clj`, `cls`, `cob`, `cbl`, `cpp`, `cc`, `cxx`,
          `c`, `cbp`, `cs`, `csproj`, `d`, `dba`, `bpro123`, `e`, ` efs`, `egt`, `el`, `for`, `ftn`, `f`, `f77`,
          `f90`, `frm`, `frx`, `fth`, `ged`, `gm6`, `gmd`, `gmk`, `gml`, `h`, `hpp`, `hxx`, ` hs`, `i`, `inc`, `java`,
          `l`, `lgt`, `lisp`, `m4`, `ml`, `msqr`, `n`, `nb`, `p`, `pas`, `pp`, `php3`, `php4`, `php5`, `phps`, `phtml`,
          `pisrc`, `piv`, `pli`, `pl1`, `prg`, `pro`, `pol`, `py`, `red`, `reds`, `resx`, `rc`, `rc2`, `rkt`, `rktl`,
          `scala`, `sci`, `sce`, `scm`, `sd7`, `skb`, `skc`, `skd`, `skf`, `skg`, `ski`, `skk`, `skm`, `sko`, `skp`,
          `skq`, `sks`, `skt`, `skz`, `sln`, `spin`, `stk`, `swg`, `tcl`, `vap`, `vb`, `vbg`, `vbp`, `vip`, `vbproj`,
          `vcproj`, `vdproj`, `xpl`, `xq`, `xsl`, `y`, `css`, `html`, `sass`, `mysql`, `json`, `handlebars`, `go`];
        if (arrayFilesExtension.indexOf(fileExtension) !== -1) {
          return linkToEditor;
        } else {
          return ``;
        }
      } else {
        return ``;
      }
    }
  };

  downloadIcon = (file) => {
    if (file === `file`) {
      return <FileFileDownload style={{marginRight: `20px`}}/>;
    }
  };

  render() {
    let additionalClass = null;
    if (this.props.kind === `folder`) {
      additionalClass = <FileFolder
        style={{height: `44px`, width: `44px`, marginRight: `20px`, color: MyTheme.palette.accent3Color}}/>;
    } else {
      additionalClass = <EditorFile
        style={{height: `44px`, width: `44px`, marginRight: `20px`, color: MyTheme.palette.borderColor}}/>;
    }

    const linkToGo = (file) => {
      if (file === `folder`) {
        return (
          <Link
            to={`/file-manager/` + this.props.hideHidden + `/` + this.props.sortBy + this.url(this.props.path, this.props.name)}
            title='open'>
            <span>{additionalClass}</span>
            <span style={{position: `relative`, top: `-15px`}}>{this.props.name}</span>
          </Link>
        );
      } else if (file === `file`) {
        return (
          <Link>
            <span>{additionalClass}</span>
            <span style={{position: `relative`, top: `-15px`}}>{this.props.name}</span>
          </Link>
        );
      }
    };

    return (
      <TableRow>
        <TableRowColumn style={{width: `25%`}}>
          {linkToGo(this.props.kind)}
        </TableRowColumn>
        <TableRowColumn>

        </TableRowColumn>
        <TableRowColumn>
          {this.getSizeOfFile(this.props.size, this.props.kind)}
        </TableRowColumn>
        <TableRowColumn>
          {this.dateModified(this.props.lastModified)}
        </TableRowColumn>
        <TableRowColumn>
          {
            this.props.kind === `file` ? <a href={`${variables.url}download${this.props.path}/${this.props.name}`}
                                            title='download' target='_blank'>{this.downloadIcon(this.props.kind)}
            </a> : null
          }
          {this.editorIcon(this.props.kind, this.props.size)}
        </TableRowColumn>
      </TableRow>
    );
  }
}