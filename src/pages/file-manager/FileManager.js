import './FileManager.scss';
import React from 'react';
import {Link, browserHistory} from 'react-router';
import $ from 'jquery';
import _ from "lodash";
import {Folder} from './Folder.js';
import moment from 'moment';


export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
    let self = this;
    this.state = {
      filesAndFolders: [],
      path: "",
      showHidden: false,
      clickedName: "",
      clickedSize: "",
      clickedModified: ""
    };

    let setTimeoutFunction = () => {
      setTimeout(() => {
        self.requestDataFromServer("/" + self.props.params.splat);
      }, 0);
    };

    browserHistory.listen( location =>  {
      setTimeoutFunction();
    });

    setTimeoutFunction();
  }

  requestDataFromServer(path) {
    let self = this;
    $.ajax({
      method: "POST",
      url: "http://192.168.0.102:7777/api/fs/ls",
      data: JSON.stringify({"path": path}),
      contentType: 'application/json',
      complete: function (res) {
        const state = res.responseJSON;
        if(state.path !== "/") {
          state.filesAndFolders.unshift({"name": "..", "kind": "folder"});
        }
        state.filesAndFolders.forEach(function (item, key, arr) {
          item.id = key;
          item.path = path;
        });
        self.setState(state);
      }
    });
  }

  toggleChange() {
    this.setState({showHidden: !this.state.showHidden});
  }

  handleClickName() {
    this.setState({clickedSize: ""});
    this.setState({clickedModified: ""});
    this.setState({clickedName: false});
    this.setState({clickedName: !this.state.clickedName});
  }

  handleClickSize() {
    this.setState({clickedName: ""});
    this.setState({clickedModified: ""});
    this.setState({clickedSize: false});
    this.setState({clickedSize: !this.state.clickedSize});
  }

  handleClickModified() {
    this.setState({clickedName: ""});
    this.setState({clickedSize: ""});
    this.setState({clickedModified: false});
    this.setState({clickedModified: !this.state.clickedModified});
  }

  render() {
    let path = this.state.path;

    // show path as links
    let arr = path.split('/');
    arr.shift();
    var href = '';
    let linksPathArr = arr.map(function(item, i) {
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

    // sort by name
    if (this.state.clickedName === true) {
     let sortName = _.sortBy(filesAndFolders, [function(obj) { return obj.name}]);
      filesAndFolders = sortName;
    } else if (this.state.clickedName === false) {
      let reverseName = _.sortBy(filesAndFolders, [function(obj) { return obj.name}]);
      reverseName =  _.reverse(reverseName);
      filesAndFolders = reverseName;
    }
    let showArrowAlphabet = () => {
      let span = (this.state.clickedName === '') ? <span></span> :
        (this.state.clickedName === true) ? <span> <i className="glyphicon glyphicon-sort-by-alphabet"></i></span> :
          <span> <i className="glyphicon glyphicon-sort-by-alphabet-alt"></i></span>;
          return span;
    };

    //sort by size
    if (this.state.clickedSize === true) {
      var sortSize = _.sortBy(filesAndFolders, [function(obj) { if (obj.size === undefined) {
        obj.size = "0"}
        return parseInt(obj.size)}]);
          filesAndFolders = sortSize;
    } else if (this.state.clickedSize === false) {
      let reverseSize = _.sortBy(filesAndFolders, [function(obj) { return parseInt(obj.size)}]);
      reverseSize  =  _.reverse(reverseSize);
      filesAndFolders = reverseSize;
    }
    let showArrowOrder = () => {
      let span = (this.state.clickedSize === '') ? <span></span> :
        (this.state.clickedSize === true) ? <span> <i className="glyphicon glyphicon-sort-by-order"></i></span> :
          <span> <i className="glyphicon glyphicon-sort-by-order-alt"></i></span>;
      return span;
    };

    //sort by modified
    if (this.state.clickedModified === true) {
      let sortModified = _.sortBy(filesAndFolders, [function(obj) {return (obj.lastModified)}]);
      filesAndFolders = sortModified;
    } else if (this.state.clickedModified === false) {
      let reverseModified = _.sortBy(filesAndFolders, [function(obj) {return (obj.lastModified)}]);
      reverseModified =  _.reverse(reverseModified);
      filesAndFolders = reverseModified;
    }
    let showArrow = () => {
      let span = (this.state.clickedModified === '') ? <span></span> :
        (this.state.clickedModified === true) ? <span> <i className="glyphicon glyphicon-sort-by-order-alt"></i></span> :
          <span> <i className="glyphicon glyphicon-sort-by-order"></i></span>;
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
              <input type="checkbox"
                     checked={this.state.showHidden}
                     onChange={() => this.toggleChange()} />display hidden files
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
              <span onClick={() => this.handleClickName()}>{this.state.clickedName}Name{showArrowAlphabet()}</span>
            </th>
            <th>
              <span onClick={() => this.handleClickSize()}>{this.state.clickedSize}Size{showArrowOrder()}</span>
            </th>
            <th>
              <span onClick={() => this.handleClickModified()}>{this.state.clickedModified}Modified{showArrow()}</span>
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
