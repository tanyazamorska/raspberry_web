import './Home.scss';
import React from 'react';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import FlatButton from 'material-ui/FlatButton';

const style = {
  kindButton: {
    height: "140px",
    width: "200px"
  }
};

export default class Home extends React.Component {
  render() {
    return (
      <div className="k-home-root">
        <GridList className="k-home-gridList" cols={4}>
          <GridTile className="k-gridTitle">
            <Link to={`/file-manager/hide-hidden/not-sort/`}>
            <FlatButton
              backgroundColor="#FF1744"
              icon={<FileFolder />}
              style={style.kindButton}
            />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`/camera/`}>
            <FlatButton
              backgroundColor="#C51162"
              icon={<ImageCameraAlt />}
              style={style.kindButton}
            />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`#`}>
            <FlatButton
              backgroundColor="#AA00FF"
              icon={<ContentAdd />}
              style={style.kindButton}
            />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`#`}>
            <FlatButton
              backgroundColor="#6200EA"
              icon={<ContentAdd />}
              style={style.kindButton}
            />
            </Link>
          </GridTile>
        </GridList>
      </div>
    )
  }
}

