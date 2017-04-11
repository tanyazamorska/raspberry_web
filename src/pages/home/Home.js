import './Home.scss';
import React from 'react';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

const style = {
  sizeButton: {
    height: "140px",
    width: "200px"
  },
  sizeIcon: {
    fontSize: "90px",
    color: "white"
  }
};

export default class Home extends React.Component {
  render() {
    return (
      <div className="k-home">
        <GridList className="k-home-gridList" cols={4}>
          <GridTile className="k-gridTitle">
            <Link to={`/file-manager/hide-hidden/not-sort/`}>
              <FlatButton
                backgroundColor="#B71C1C"
                icon={<i className="material-icons" style={style.sizeIcon}>folder</i>}
                style={style.sizeButton}
              />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`/camera/`}>
              <FlatButton
                backgroundColor="#C51162"
                icon={<i className="material-icons" style={style.sizeIcon}>camera_alt</i>}
                style={style.sizeButton}
              />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`#`}>
              <FlatButton
                backgroundColor="#AA00FF"
                icon={<i className="material-icons">add</i>}
                style={style.sizeButton}
              />
            </Link>
          </GridTile>
          <GridTile className="k-gridTitle">
            <Link to={`#`}>
              <FlatButton
                backgroundColor="#6200EA"
                icon={<i className="material-icons">add</i>}
                style={style.sizeButton}
              />
            </Link>
          </GridTile>
        </GridList>
      </div>
    )
  }
}

