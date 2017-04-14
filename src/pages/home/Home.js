import React from 'react';
import {Link} from 'react-router';
import {GridList} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  sizeButton: {
    height: "140px", // ???
    width: "200px"   // ???
  },
  sizeIcon: {
    fontSize: "90px",
    color: "white"    // magic
  }
};

export default class Home extends React.Component {
  render() {
    return (
      <div style={{justifyContent: 'space-around', width: 900, margin: 'auto'}}>
        <GridList cols={4}>
          <Link to={`/file-manager/hide-hidden/not-sort/`}>
            <FlatButton
              backgroundColor="#B71C1C"
              icon={<FileFolder style={style.sizeIcon}/>}
              style={style.sizeButton}
            />
          </Link>
          <Link to={`/camera/`}>
            <FlatButton
              backgroundColor="#C51162"
              icon={<ImageCamera style={style.sizeIcon}/>}
              style={style.sizeButton}
            />
          </Link>
          <Link to={`#`}>
            <FlatButton
              backgroundColor="#AA00FF"
              icon={<ContentAdd />}
              style={style.sizeButton}
            />
          </Link>
          <Link to={`#`}>
            <FlatButton
              backgroundColor="#6200EA"
              icon={<ContentAdd />}
              style={style.sizeButton}
            />
          </Link>
        </GridList>
      </div>
    )
  }
}

