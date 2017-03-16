import React from 'react';
import {Link} from 'react-router';

class Folder extends React.Component {
  render() {
    let additionalClass = null;
    if (this.props.kind === 'folder') {
      additionalClass = "glyphicon-folder-close";
    } else {
      additionalClass = "glyphicon glyphicon-file";
    }
console.log(this.props)
    return (
      <li className="list">
        <pre>
        <Link to={"#"}>
          <i className={"glyphicon " + additionalClass}></i>
          <span>&nbsp;&nbsp;&nbsp;{this.props.path}</span><br></br>
          <span>{this.props.name}</span>
           <i className="glyphicon glyphicon-download-alt upload"></i>
        </Link>
        </pre>
      </li>
    )
  }
}

export default class Folders extends React.Component {
  constructor() {
    super();
    let self = this;
    this.state = {
      filesAndFolders: [],
      path: ""
    };

    $.ajax({
      method: "POST",
      url: "http://192.168.0.100:7777/api/fs/ls",
      data: JSON.stringify({"path": "/home/pi/OUR"}),
      contentType: 'application/json',
      complete: function (res) {
        self.setState(res.responseJSON);
       }
      });
  }

  render() {
   let path = this.state.path;
    {
      this.state.filesAndFolders.forEach(function (item, key) {
        item.id = key;
        item.path = path;
      });
    }
    return (
      <div className="container">
        <ul>
          {
            this.state.filesAndFolders.map(function (el) {
            return <Folder name={el.name} kind={el.kind} key={el.id} path={el.path}/>
            })
          }
        </ul>
      </div>
    )
  }
}





