import React from 'react';
import folders from '../data.json';
import {Link} from 'react-router';

folders.filesAndFolders.forEach(function(item, key) {
  item.id = key;
});

class Folder extends React.Component {
  render() {
    console.log(this.props.kind);
    if (this.props.kind === 'folder') {
      var additionalClass = "glyphicon-folder-close";
    } else {
      additionalClass = "glyphicon glyphicon-file";
    }
    return (
      <li className="list">
        <Link to={"/"}>
          <i className={"glyphicon " + additionalClass}></i>
          <span>&nbsp;&nbsp;&nbsp; {this.props.name}</span>
        </Link>
      </li>
    )
  }
}

export default class FoldersList extends React.Component {
  render() {
    return (
      <div className="container">
        <ul>
          {
            folders.filesAndFolders.map(function (el) {
              return <Folder name={el.name} kind={el.kind} key={el.id}/>
            })
          }
        </ul>
      </div>
    )
  }
}
