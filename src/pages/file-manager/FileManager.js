import React from 'react';
import {Link, browserHistory} from 'react-router';
import $ from 'jquery';
import _ from "lodash";
import {Folder} from './Folder.js';
import * as variables from '../../variables.js';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import ActionHome from 'material-ui/svg-icons/action/home';
import HadwareArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import HadwareArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';



export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
    const self = this;
    self.state = {
      filesAndFolders: [],
      path: ""
    };

    const requestDataFromServerWithHack = () => {
      setTimeout(() => {
        self.requestDataFromServer("/" + self.props.params.splat);
      }, 0);
    };

    let prevPath = self.props.routeParams.splat;
    this.stop = browserHistory.listen(location => {
      if (location.hash.indexOf("#/file-manager/") === -1) {
        return;
      }
      let arrPath = location.hash.split("/");
      arrPath.splice(0, 4);
      let path = arrPath.join('/');
      if (prevPath !== path) {
        requestDataFromServerWithHack();
      }
      prevPath = path;
    });
    requestDataFromServerWithHack();
  }

  componentWillUnmount() {
    this.stop();
  }

  /**
   * fetches data from server and executes `complete` function callback when ready,
   * finally executes `setState`
   * @param path - path to folder on raspberry file system
   */
  requestDataFromServer(path) {
    const self = this;
    $.ajax({
      method: "POST",
      crossDomain: true,
      url: "http://192.168.0.103:7777/api/fs/ls",
      data: JSON.stringify({"path": path}),
      contentType: 'application/json',
      complete: function (res) {
        const state = res.responseJSON;
        self.setState(state);
      }
    });
  }

  render() {
    const path = this.state.path;

    // filter hidden files and folders
    let filesAndFolders;
    if (this.props.params.hideHidden === "hide-hidden") {
      filesAndFolders = this.state.filesAndFolders.filter((obj) => {
        if (obj.name.charAt(0) !== '.' || obj.name === '..') {
          return obj;
        }
      });
    } else {
      filesAndFolders = this.state.filesAndFolders;
    }

    //
    let show;
    let check;
    if (this.props.params.hideHidden === "hide-hidden") {
      show = "hide-hidden";
      check = false;
    } else {
      show = "show-hidden";
      check = true;
    }
    const reverseShow = (show === "show-hidden") ? "hide-hidden" : "show-hidden";

    // show path as links
    const arr = path.split('/');
    arr.shift();
    let href = '';
    let sorted = this.props.params.sortBy;
    const linksPathArr = arr.map((item, i) => {
      href = href + '/' + item;
      let el = <span key={i}><Link to={`/file-manager/${show}/${sorted}${href}/`}>{item}</Link> / </span>;
      if (i === arr.length - 1) {
        el = <span key={i}>{item} / </span>;
      }
      return el;
    });

    const actionHome = <ActionHome style={{position: 'relative', top: '5px', height: '35px', width: '35px'}}/>;
    if (path === '/') {
      linksPathArr.unshift(<span key="-1">{actionHome}</span>);
    } else {
      linksPathArr.unshift(<span key="-1">
        <Link to={`/file-manager/${show}/${sorted}/`}>{actionHome}</Link> /
      </span>);
    }

    // method sort of files and folders
    /**
     * @param keyInObjToSort - key to sort by in obj
     */
    let sortItemsBy = (keyInObjToSort) => {
      filesAndFolders = _.sortBy(filesAndFolders, [function (obj) {
        return obj[keyInObjToSort]
      }]);
    };

    let reverseSortItemsBy = (keyInObjToSort) => {
      const sorted = _.sortBy(filesAndFolders, [function (obj) {
        return obj[keyInObjToSort]
      }]);
      filesAndFolders = _.reverse(sorted);
    };

    let showArrow, showArrow1, showArrow2;
    let spanArrowUp = <span style={{position: 'relative', top: '9px'}}><HadwareArrowUp /></span>;
    let spanArrowDown = <span style={{position: 'relative', top: '9px'}}><HadwareArrowDown /></span>;
    let sorted1 = "sort-name-asc";
    let sorted2 = "sort-size-asc";
    let sorted3 = "sort-modified-asc";
    if (sorted === `sort-name-asc`) {
      showArrow = spanArrowUp;
      sorted1 = `sort-name-desc`;
      sortItemsBy('name');
    } else if (sorted === `sort-name-desc`) {
      showArrow = spanArrowDown;
      sorted1 = `sort-name-asc`;
      reverseSortItemsBy('name');
    } else if (sorted === "sort-size-asc") {
      showArrow1 = spanArrowUp;
      sorted2 = "sort-size-desc";
      sortItemsBy("size");
    } else if (sorted === "sort-size-desc") {
      showArrow1 = spanArrowDown;
      sorted2 = "sort-size-asc";
      reverseSortItemsBy("size");
    } else if (sorted === "sort-modified-asc") {
      showArrow2 = spanArrowUp;
      sorted3 = "sort-modified-desc";
      sortItemsBy("lastModified");
    } else if (sorted === "sort-modified-desc") {
      showArrow2 = spanArrowDown;
      sorted3 = "sort-modified-asc";
      reverseSortItemsBy("lastModified");
    }

    if (path !== "/" && path !== "") {
      filesAndFolders = _.filter(filesAndFolders, function (obj) {
        return obj.name !== ".."
      });
      filesAndFolders.unshift({"name": "..", "kind": "folder"});
    }

    filesAndFolders.forEach(function (item, key) {
      item.id = key;
      item.path = path;
      item.size = item.size || 0;
    });

    return (
      <div style={{width: variables.default.width}}>
        <Table>
          <TableBody displayRowCheckbox={this.state.showCheckboxes = false}>
            <TableRow style={{backgroundColor: theme.palette.accent1Color}}>
              <TableRowColumn style={{width: '35%'}}>
                <h4>{linksPathArr}</h4>
              </TableRowColumn>
              <TableRowColumn>
                {
                  <Link to={`/file-manager/${reverseShow}/${this.props.params.sortBy}${path === "/" ? '' : path}/`}>
                    <Checkbox label="show hidden files" checked={check} onCheck={() => {}}/>
                  </Link>
                }
              </TableRowColumn>
              <TableRowColumn>

              </TableRowColumn>
              <TableRowColumn>
                <TextField hintText="upload file"/>
              </TableRowColumn>
              <TableRowColumn>
                <RaisedButton label="Submit"/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={{paddingLeft: '75px'}}>
                <Link to={`/file-manager/${show}/${sorted1}${path === "/" ? '' : path}/`}>
                  <span>Name{showArrow}</span>
                </Link>
              </TableRowColumn>
              <TableRowColumn>

              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/file-manager/${show}/${sorted2}${path === "/" ? '' : path}/`}>
                  <span>Size{showArrow1}</span>
                </Link>
              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/file-manager/${show}/${sorted3}${path === "/" ? '' : path}/`}>
                  <span>Modified{showArrow2}</span>
                </Link>
              </TableRowColumn>
              <TableRowColumn>
                <span>Action</span>
              </TableRowColumn>
            </TableRow>
            {
              filesAndFolders.map(el => {
                return <Folder name={el.name}
                               kind={el.kind}
                               key={el.id}
                               path={el.path}
                               lastModified={el.lastModified}
                               size={el.size}
                               hideHidden={this.props.params.hideHidden}
                               sortBy={this.props.params.sortBy}/>
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}