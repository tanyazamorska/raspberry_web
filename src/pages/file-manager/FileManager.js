import './FileManager.scss';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import HardwareArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ActionHome from 'material-ui/svg-icons/action/home';


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
      path: "",
    };

    // ajax
    const setTimeoutFunctionHack = () => {setTimeout(() => {self.requestDataFromServer("/" + self.props.params.splat);}, 0);};

    let prevPath = self.props.routeParams.splat;
    browserHistory.listen(location => {
      let [, , , ,  path] = location.hash.split("/");
      if (prevPath !== path) {
        setTimeoutFunctionHack();
      }
      prevPath = path;
    });
    setTimeoutFunctionHack();
  }

  componentWillUnmount = () => {
   this.requestDataFromServer = () => {};
  };

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
      let el = <span key={i}><Link to={`/file-manager/${show}/${sorted}${href}`}>{item}</Link> / </span>;
      if (i === arr.length - 1) {
        el = <span key={i}>{item} / </span>;
      }
      return el;
    });

    if (path === '/') {
      linksPathArr.unshift(<span key="-1"><ActionHome/></span>);
    } else {
      linksPathArr.unshift(<span key="-1"><Link to={`/file-manager/${show}/${sorted}/`}><ActionHome/></Link> / </span>);
    }

    // method sort of files and folders
    /**
     * @param keyInObjToSort - key to sort by in obj
     */
    let sortItemsBy = (keyInObjToSort) => {
        const sortBy = _.sortBy(filesAndFolders, [function(obj) {return obj[keyInObjToSort]}]);
        filesAndFolders = sortBy;
    };

    let reverseSortItemsBy = (keyInObjToSort) => {
        let reverse = _.sortBy(filesAndFolders, [function(obj) {return obj[keyInObjToSort]}]);
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
      showArrow = <span><HardwareArrowUp/></span>;
      sorted = `sort-name-desc`;
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      sortItemsBy('name');
    } else if (sorted === `sort-name-desc`) {
      showArrow = <span><HardwareArrowDown/></span>;
      sorted = `sort-name-asc`;
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      reverseSortItemsBy('name');
    } else if (sorted === "sort-size-asc") {
      showArrow1 = <span><HardwareArrowUp/></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-desc";
      sorted2 = "sort-modified-asc";
      sortItemsBy("size");
    } else if (sorted === "sort-size-desc") {
      showArrow1 = <span><HardwareArrowDown/></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      reverseSortItemsBy("size");
    } else if (sorted === "sort-modified-asc") {
      showArrow2 = <span><HardwareArrowUp/></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-desc";
      sortItemsBy("modified");
    } else if (sorted === "sort-modified-desc") {
      showArrow2 = <span><HardwareArrowDown/></span>;
      sorted = "sort-name-asc";
      sorted1 = "sort-size-asc";
      sorted2 = "sort-modified-asc";
      reverseSortItemsBy("modified");
    }

    if (path !== "/" && path !== "") {
      filesAndFolders = _.filter(filesAndFolders, function(obj) {return obj.name !== ".."});
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
          <TableHeader>
            <TableRow style={{backgroundColor: "#00BCD4"}}>
              <TableHeaderColumn>
                {linksPathArr}
              </TableHeaderColumn>
              <TableHeaderColumn>
                {
                  <Link to={`/file-manager/${reverseShow}/${this.props.params.sortBy}${path}`}>
                    <Checkbox  label="show hidden files" checked={check} onCheck={() => {}}/>
                  </Link>
                }
              </TableHeaderColumn>
              <TableHeaderColumn>
                { <span>
                  <TextField  hintText="Search"/>
                  <RaisedButton label="submit" secondary={true}/>
                </span>
                }
              </TableHeaderColumn>
              <TableHeaderColumn>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>
                <Link to={`/file-manager/${show}/${sorted}${path}`}>
                  <span>Name{showArrow}</span>
                </Link>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Link to={`/file-manager/${show}/${sorted1}${path}`}>
                  <span>Size{showArrow1}</span>
                </Link>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Link to={`/file-manager/${show}/${sorted2}${path}`}>
                  <span>Modified{showArrow2}</span>
                </Link>
              </TableHeaderColumn>
              <TableHeaderColumn>
                Action
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
              filesAndFolders.map(el => {
              return <Folder name={el.name} kind={el.kindButton} key={el.id} path={el.path} lastModified={el.lastModified}
              size={el.size} hideHidden={this.props.params.hideHidden} sortBy={this.props.params.sortBy} />
              })
              }
          </TableBody>
        </Table>
      </div>
    )
  }
}



{/*<div className="row container k-row-kontainer">*/}
{/*<div className="col-xs-5 col-sm-5">*/}
{/*<form className="navbar-form navbar-left">*/}
{/*<div className="form-group">*/}
{/*{linksPathArr}*/}
{/*</div>*/}
{/*</form>*/}
{/*</div>*/}
{/*<div className="col-xs-3 col-sm-3 k-col-3">*/}
{/*<div className="form-group">*/}
{/*<Link to={`/file-manager/${reverseShow}/${this.props.params.sortBy}${path}`}>*/}
{/*<input type="checkbox" checked={check} onChange={() => {}}/>show hidden files*/}
{/*</Link>*/}
{/*</div>*/}
{/*</div>*/}
{/*<div className="col-xs-4 col-sm-4">*/}
{/*<form className="navbar-form navbar-right">*/}
{/*<div className="form-group">*/}
{/*<input type="text" className="form-control"/>*/}
{/*</div>*/}
{/*<button type="submit" className="btn btn-primary btn-sm">Upload file</button>*/}
{/*</form>*/}
{/*</div>*/}
{/*</div>*/}
{/*<table className="table">*/}
{/*<thead>*/}
{/*<tr>*/}
{/*<th className="k-row-small"></th>*/}
{/*<th className="k-row-big">*/}
{/*<Link to={`/file-manager/${show}/${sorted}${path}`}>*/}
{/*<span>Name{showArrow}</span>*/}
{/*</Link>*/}
{/*</th>*/}
{/*<th>*/}
{/*<Link to={`/file-manager/${show}/${sorted1}${path}`}>*/}
{/*<span>Size{showArrow1}</span>*/}
{/*</Link>*/}
{/*</th>*/}
{/*<th>*/}
{/*<Link to={`/file-manager/${show}/${sorted2}${path}`}>*/}
{/*<span>Modified{showArrow2}</span>*/}
{/*</Link>*/}
{/*</th>*/}
{/*<th>Action</th>*/}
{/*</tr>*/}
{/*</thead>*/}
{/*<tbody>*/}
{/*{*/}
{/*filesAndFolders.map(el => {*/}
{/*return <Folder name={el.name} kind={el.kindButton} key={el.id} path={el.path} lastModified={el.lastModified}*/}
{/*size={el.size} hideHidden={this.props.params.hideHidden} sortBy={this.props.params.sortBy} />*/}
{/*})*/}
{/*}*/}
{/*</tbody>*/}
{/*</table>*/}