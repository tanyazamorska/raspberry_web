import './FileManager.scss';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

import React from 'react';
import {Link, browserHistory} from 'react-router';
import $ from 'jquery';
import _ from "lodash";
import {Folder} from './Folder.js';

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
      arrPath.splice(0,4);
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
    const linksPathArr = arr.map(function (item, i) {
      href = href + '/' + item;
      let el = <span key={i}><Link to={`/file-manager/${show}/${sorted}${href}/`}>{item}</Link> / </span>;
      if (i === arr.length - 1) {
        el = <span key={i}>{item} / </span>;
      }
      return el;
    });

    if (path === '/') {
      linksPathArr.unshift(<span key="-1"><i className="material-icons k-icon-home">home</i></span>);
    } else {
      linksPathArr.unshift(<span key="-1"><Link to={`/file-manager/${show}/${sorted}/`}><i
        className="material-icons k-icon-home">home</i></Link> / </span>);
    }

    // method sort of files and folders
    /**
     * @param keyInObjToSort - key to sort by in obj
     */
    let sortItemsBy = (keyInObjToSort) => {
      const sortBy = _.sortBy(filesAndFolders, [function (obj) {
        return obj[keyInObjToSort]
      }]);
      filesAndFolders = sortBy;
    };

    let reverseSortItemsBy = (keyInObjToSort) => {
      let reverse = _.sortBy(filesAndFolders, [function (obj) {
        return obj[keyInObjToSort]
      }]);
      reverse = _.reverse(reverse);
      filesAndFolders = reverse;
    };

    let showArrow, showArrow1, showArrow2 = <span> </span>;
    let sorted1, sorted2;
    if (sorted === "not-sort") {
      sorted = "sort-name-asc";
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
    } else if (sorted === `sort-name-asc`) {
      showArrow = <span><i className="material-icons">keyboard_arrow_up</i></span>;
      sorted = `sort-name-desc`;
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      sortItemsBy('name');
    } else if (sorted === `sort-name-desc`) {
      showArrow = <span><i className="material-icons">keyboard_arrow_down</i></span>;
      sorted = `sort-name-asc`;
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      reverseSortItemsBy('name');
    } else if (sorted === "sort-size-asc") {
      showArrow1 = <span><i className="material-icons">keyboard_arrow_up</i></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-desc";
      sorted2 = "sort-modified-asc";
      sortItemsBy("size");
    } else if (sorted === "sort-size-desc") {
      showArrow1 = <span><i className="material-icons">keyboard_arrow_down</i></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      reverseSortItemsBy("size");
    } else if (sorted === "sort-modified-asc") {
      showArrow2 = <span><i className="material-icons">keyboard_arrow_up</i></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-desc";
      sortItemsBy("modified");
    } else if (sorted === "sort-modified-desc") {
      showArrow2 = <span><i className="material-icons">keyboard_arrow_down</i></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      reverseSortItemsBy("modified");
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
      <div className="k-file-manager">
        <Table>
          <TableBody displayRowCheckbox={this.state.showCheckboxes = false}>
            <TableRow style={{backgroundColor: "rgb(142, 141, 144)", height: "74px"}}>
              <TableRowColumn>
               <h3 className="k-text-top">{linksPathArr}</h3>
              </TableRowColumn>
              <TableRowColumn>

              </TableRowColumn>
              <TableRowColumn>
                {
                  <Link to={`/file-manager/${reverseShow}/${this.props.params.sortBy}${path === "/" ? '' : path}/`}>
                    <Checkbox label="show hidden files" checked={check} onCheck={() => {}}/>
                  </Link>
                }
              </TableRowColumn>
              <TableRowColumn>
                <TextField hintText="upload file"/>
              </TableRowColumn>
              <TableRowColumn>
                <RaisedButton label="Submit"/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>

              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/file-manager/${show}/${sorted}${path === "/" ? '' : path}/`}>
                  <span>Name{showArrow}</span>
                </Link>
              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/file-manager/${show}/${sorted1}${path === "/" ? '' : path}/`}>
                  <span>Size{showArrow1}</span>
                </Link>
              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/file-manager/${show}/${sorted2}${path === "/" ? '' : path}/`}>
                  <span>Modified{showArrow2}</span>
                </Link>
              </TableRowColumn>
              <TableRowColumn>
                Action
              </TableRowColumn>
            </TableRow>
            {
              filesAndFolders.map(el => {
                return <Folder name={el.name} kind={el.kind} key={el.id} path={el.path} lastModified={el.lastModified}
                               size={el.size} hideHidden={this.props.params.hideHidden}
                               sortBy={this.props.params.sortBy}/>
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

// знайти змінні теми Material UI. І використовувати ті змінні. Ні не де НЕ використовувати магічні значення