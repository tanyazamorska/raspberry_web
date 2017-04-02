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

    browserHistory.listen(location =>  {
      //console.log("------------ browserHistory.listen ------------");
      setTimeoutFunctionHack();
    });
    setTimeoutFunctionHack();
  }

  componentDidMount() {
    window.addEventListener(console.log(1));
  }

  componentWillUnmount() {
    window.removeEventListener(console.log(2));
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
    const path = this.state.path;
   // console.log("render -----------------");

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
      linksPathArr.unshift(<span key="-1"><Link to="/file-manager"><i className="glyphicon glyphicon-cd"></i></Link> / </span>);
    }

    // show hidden files and folders
    this.state.showHidden === false ? this.props.params.hide = "hide-hidden" : this.props.params.hide = "show-hidden";
    let filesAndFolders;
    if (this.state.showHidden === false) {
      filesAndFolders = this.state.filesAndFolders.filter((obj) => {
        if (obj.name.charAt(0) !== '.' || obj.name === '..') {
          return obj;
        }
      });
    } else {
      filesAndFolders = this.state.filesAndFolders
    }

    /**
     *
     * @param checkKey - key from state that signals if need to sort item
     * @param keyInObjToSort - key to sort by in obj
     */
    let sortItemsBy = (checkKey, keyInObjToSort) => {
      if (this.state[checkKey] === true) {
        const sortBy = _.sortBy(filesAndFolders, [function(obj) {return obj[keyInObjToSort]}]);
        filesAndFolders = sortBy;
      } else if (this.state[checkKey] === false) {
        let reverse = _.sortBy(filesAndFolders, [function(obj) {return obj[keyInObjToSort]}]);
        reverse = _.reverse(reverse);
        filesAndFolders = reverse;
      }
    };

    sortItemsBy("clickedName", "name");
    sortItemsBy("clickedSize", "size");
    sortItemsBy("clickedModified", "lastModified");

    if (path !== "/" && path !== "") {
      filesAndFolders = _.filter(filesAndFolders, function(obj) { return obj.name !== ".."});
      filesAndFolders.unshift({"name": "..", "kind": "folder"});
    }

    filesAndFolders.forEach(function (item, key) {
      item.id = key;
      item.path = path;
      item.size = item.size || 0;
    });

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
