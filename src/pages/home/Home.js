import './Home.scss';
import React from 'react';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
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
                backgroundColor="#B71C1C"
                icon={<i className="material-icons k-home-icon-camera">folder</i>}
                style={style.kindButton}
              />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`/camera/`}>
              <FlatButton
                backgroundColor="#C51162"
                icon={<i className="material-icons k-home-icon-camera">camera_alt</i>}
                style={style.kindButton}
              />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`#`}>
              <FlatButton
                backgroundColor="#AA00FF"
                icon={<i className="material-icons">add</i>}
                style={style.kindButton}
              />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`#`}>
              <FlatButton
                backgroundColor="#6200EA"
                icon={<i className="material-icons">add</i>}
                style={style.kindButton}
              />
            </Link>
          </GridTile>
        </GridList>
      </div>
    )
  }
}

