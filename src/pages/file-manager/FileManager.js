import './FileManager.scss';
import React from 'react';
import {Link, browserHistory} from 'react-router';
import $ from 'jquery';
import {Folder} from './Folder.js';


export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
    let self = this;
    this.state = {
      filesAndFolders: [],
      path: "",
      showHidden: false
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
            <th className="k-row-big">Name</th>
            <th>Size</th>
            <th>Modified</th>
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
