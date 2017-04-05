import './FileManager.scss';
import React from 'react';
import {Link, browserHistory} from 'react-router';
import $ from 'jquery';
import _ from "lodash";
import {Folder} from './Folder.js';

export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      filesAndFolders: [],
      path: "",
    };

    const setTimeoutFunctionHack = () => {
      setTimeout(() => {
        self.requestDataFromServer("/" + self.props.params.splat);
      }, 0);
    };

    browserHistory.listen(location =>  {
      //console.log("------------ browserHistory.listen ------------");
      setTimeoutFunctionHack();
    });

    setTimeoutFunctionHack();
  }

  // componentWillUnmount() {
  //   browserHistory.unlisten(location =>  {
  //     setTimeoutFunctionHack();
  //   });
  // }

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

    // show hidden files and folders
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

    // display show hidden files in url
    let show;
    let check;
    if (this.props.params.hideHidden === "hide-hidden") {
      show = "show-hidden";
      check = false;
    } else {
      show = "hide-hidden";
      check = true;
    }

    // show path as links
    const arr = path.split('/');
    arr.shift();
    let href = '';
    const reverseShow = (show === "show-hidden") ? "hide-hidden" : "show-hidden";
    let sortBy = this.props.params.notSort;
    const linksPathArr = arr.map(function(item, i) {
      href = href + '/' + item;
      let el = <span key={i}><Link to={`/file-manager/${reverseShow }/${sortBy}${href}`}>{item}</Link> / </span>;
      if (i === arr.length -1) {
        el = <span key={i}>{item} / </span>;
      }
      return el;
    });

    if (path === '/') {
      linksPathArr.unshift(<span key="-1"><i className="glyphicon glyphicon-cd"> </i></span>);
    } else {
      linksPathArr.unshift(<span key="-1"><Link to={`/file-manager/${reverseShow}/${sortBy}/`}><i className="glyphicon glyphicon-cd"> </i></Link> / </span>);
    }

    sortBy = "notSort";
    if (this.props.params.notSort === "sort-name-asc") {
      const sortBy = _.sortBy(filesAndFolders, [function(obj) {return obj.name}]);
      filesAndFolders = sortBy;
    } else if (this.props.params.notSort === "sort-name-desc") {
      let reverse = _.sortBy(filesAndFolders, [function(obj) {return obj.name}]);
        reverse = _.reverse(reverse);
        filesAndFolders = reverse;
    } else if (this.props.params.notSort === "sort-size-asc") {
      const sortBy = _.sortBy(filesAndFolders, [function(obj) {return obj.size}]);
      filesAndFolders = sortBy;
    } else if (this.props.params.notSort === "sort-size-desc") {
      let reverse = _.sortBy(filesAndFolders, [function(obj) {return obj.size}]);
      reverse = _.reverse(reverse);
      filesAndFolders = reverse;
    } else if (this.props.params.notSort === "sort-modified-asc") {
      const sortBy = _.sortBy(filesAndFolders, [function(obj) {return obj.lastModified}]);
      filesAndFolders = sortBy;
    } else if (this.props.params.notSort === "sort-modified-desc") {
      let reverse = _.sortBy(filesAndFolders, [function (obj) {return obj.lastModified}]);
      reverse = _.reverse(reverse);
      filesAndFolders = reverse;
    }

    //console.log(this.props.params.notSort);


    if (path !== "/" && path !== "") {
      filesAndFolders = _.filter(filesAndFolders, function(obj) {return obj.name !== ".."});
      filesAndFolders.unshift({"name": "..", "kind": "folder"});
    }

    filesAndFolders.forEach(function (item, key) {
      item.id = key;
      item.path = path;
      item.size = item.size || 0;
    });

    // const showArrow = (click) => {
    //   const span = (click === '') ? <span></span> :
    //     (click === true) ? <span> <i className="glyphicon glyphicon-triangle-top k-triangle-top"> </i></span> :
    //       <span> <i className="glyphicon glyphicon-triangle-bottom k-triangle-bottom"> </i></span>;
    //   return span;
    // };

    return (
      <div className="k-file-manager">
        <div className="row container k-row-kontainer">
          <div className="col-xs-5 col-sm-5">
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <h5>
                  {linksPathArr}
                </h5>
              </div>
            </form>
          </div>
          <div className="col-xs-3 col-sm-3 k-col-3">
            <div className="form-group">
              <Link to={`/file-manager/${show}${path}`}>
                <input type="checkbox" checked={check}/>show hidden files
              </Link>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4">
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
            <th className="k-row-big">
              <Link to={`/file-manager/${show}/${sortBy}/${path}`}>
                <span onClick={false}>Name</span>
              </Link>
            </th>
            <th>
              <Link to={`/file-manager/${show}/${sortBy}/${path}`}>
                <span onClick={false}>Size</span>
              </Link>
            </th>
            <th>
              <Link to={`/file-manager/${show}/${sortBy}/${path}`}>
                <span onClick={false}>Modified</span>
              </Link>
            </th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            filesAndFolders.map(el => {
              return <Folder name={el.name} kind={el.kind} key={el.id} path={el.path} lastModified={el.lastModified}
                             size={el.size} hideHidden={this.props.params.hideHidden} notSort={this.props.params.notSort} />
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}
