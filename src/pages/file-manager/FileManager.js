import './FileManager.scss';
import React from 'react';
import {Link, browserHistory} from 'react-router';
import $ from 'jquery';
import _ from "lodash";
import {Folder} from './Folder.js';

window.b = browserHistory;

export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      filesAndFolders: [],
      path: "",
      showHidden: false,
      clickedName: "",
      clickedSize: "",
      clickedModified: ""
    };

    const setTimeoutFunctionHack = () => {
      setTimeout(() => {
        self.requestDataFromServer("/" + self.props.params.splat);
      }, 0);
    };

    browserHistory.listen( location =>  {
      // console.log("------------ browserHistory.listen ------------");
      setTimeoutFunctionHack();
    });

    setTimeoutFunctionHack();
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
      url: "http://192.168.0.102:7777/api/fs/ls",
      data: JSON.stringify({"path": path}),
      contentType: 'application/json',
      complete: function (res) {
        const state = res.responseJSON;
        if (state.path !== "/") {
          state.filesAndFolders.unshift({"name": "..", "kind": "folder"});
        }
        state.filesAndFolders.forEach(function (item, key) {
          item.id = key;
          item.path = path;
          item.size = item.size || 0;
        });
        self.setState(state);
      }
    });
  }

  toggleChange() {
    this.setState({showHidden: !this.state.showHidden});
  }

  resetSortsState() {
    this.setState({clickedName: ""});
    this.setState({clickedModified: ""});
    this.setState({clickedSize: ""});
  }

  handleClickName() {
    this.resetSortsState();
    this.setState({clickedName: !this.state.clickedName});
  }

  handleClickSize() {
    this.resetSortsState();
    this.setState({clickedSize: !this.state.clickedSize});
  }

  handleClickModified() {
    this.resetSortsState();
    this.setState({clickedModified: !this.state.clickedModified});
  }

  render() {
    //console.log("render -----------------");
    // console.log(this.props.params);

    const path = this.state.path;

    // show path as links
    const arr = path.split('/');
    arr.shift();
    let href = '';
    const linksPathArr = arr.map(function(item, i) {
      href = href + '/' + item;
      let el = <span key={i}><Link to={"/file-manager" + href }>{item}</Link> / </span>;
      if (i === arr.length -1) {
        el = <span key={i}>{item} / </span>;
      }
      return el;
    });

    if (path === '/') {
      linksPathArr.unshift(<span key="-1"><i className="glyphicon glyphicon-cd"></i></span>);
    } else {
      linksPathArr.unshift(<span key="-1"><Link to="/file-manager/"><i className="glyphicon glyphicon-cd"></i></Link> / </span>);
    }

    // show hidden files and folders
    let filesAndFolders;
    if (this.state.showHidden === false) {
      filesAndFolders = this.state.filesAndFolders.filter((obj) => {
        if (obj.name.charAt(0) !== '.' || obj.name === '..') {
          return obj;
        }
      });
    } else {
      filesAndFolders = this.state.filesAndFolders;
    }

    /**
     *
     * @param checkKey - key from state that signals if need to sort item
     * @param keyInObjToSort - key to sort by in obj
     */
    let sortItemsBy = (checkKey, keyInObjToSort) => {

    };

    // sortItemsBy("clickedName", "name");
    // sortItemsBy("clickedSize", "size");
    // sortItemsBy("modified", "lastModified");


    // sort by name
    if (this.state.clickedName === true) {
      const sortByName = _.sortBy(filesAndFolders, [function(obj) { return obj.name}]);
      filesAndFolders = sortByName;
    } else if (this.state.clickedName === false) {
      let reverseName = _.sortBy(filesAndFolders, [function(obj) { return obj.name}]);
      reverseName =  _.reverse(reverseName);
      filesAndFolders = reverseName;
    }

    //sort by size
    if (this.state.clickedSize === true) {
      const sortedBySize = _.sortBy(filesAndFolders, [function(obj) {
        return obj.size;
      }]);
      filesAndFolders = sortedBySize;
    } else if (this.state.clickedSize === false) {
      let sortedBySizeAndReversed = _.sortBy(filesAndFolders, [function(obj) {
        return obj.size;
      }]);
      sortedBySizeAndReversed  = _.reverse(sortedBySizeAndReversed);
      filesAndFolders = sortedBySizeAndReversed;
    }

    //sort by modified
    if (this.state.clickedModified === true) {
      const sortModified = _.sortBy(filesAndFolders, [function(obj){return (obj.lastModified)}]);
      filesAndFolders = sortModified;
    } else if (this.state.clickedModified === false) {
      let reverseModified = _.sortBy(filesAndFolders, [function(obj) {return (obj.lastModified)}]);
      reverseModified = _.reverse(reverseModified);
      filesAndFolders = reverseModified;
    }

    const showArrow = (click) => {
      const span = (click === '') ? <span></span> :
        (click === true) ? <span> <i className="glyphicon glyphicon-triangle-top k-triangle-top"></i></span> :
          <span> <i className="glyphicon glyphicon-triangle-bottom k-triangle-bottom"></i></span>;
      return span;
    };

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
              <input type="checkbox" checked={this.state.showHidden}
                     onChange={() => this.toggleChange()} />show hidden files
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
              <span onClick={() => this.handleClickName()}>Name{showArrow(this.state.clickedName)}</span>
            </th>
            <th>
              <span onClick={() => this.handleClickSize()}>Size{showArrow(this.state.clickedSize)}</span>
            </th>
            <th>
              <span onClick={() => this.handleClickModified()}>Modified{showArrow(this.state.clickedModified)}</span>
            </th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            filesAndFolders.map(function (el) {
              return <Folder name={el.name} kind={el.kind} key={el.id} path={el.path} lastModified={el.lastModified}
                             size={el.size} />
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}
