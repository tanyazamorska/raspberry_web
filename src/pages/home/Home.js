import React from 'react';
import {Link} from 'react-router';
import {GridList} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import ActionPets from 'material-ui/svg-icons/action/pets';
import MyTheme from '../../MyTheme';
import scssVariables from '../../scssVariables.js';

const iconStyle = {width: `50%`, height: `50%`};

export default class Home extends React.Component {
  render() {
    return (
      <div style={{width: scssVariables.width, marginLeft: `85px`}}>
        <GridList cols={4}>
          <HomeButton to={`/file-manager/hide-hidden/not-sort/home/pi`}
                      backgroundColor={MyTheme.palette.primary3Color}
                      icon={<FileFolder style={iconStyle}/>}
          />
          <HomeButton to={`/camera/`}
                      backgroundColor={MyTheme.palette.primary2Color}
                      icon={<ImageCamera style={iconStyle}/>}
          />
          <HomeButton to={`/led-matrix/manual`}
                      backgroundColor={MyTheme.palette.primary1Color}
                      icon={<img src='icon.svg' style={{width: `120px`, height: `160px`}}/>}
          />
          <HomeButton to={`#`}
                      backgroundColor={MyTheme.palette.accent1Color}
                      icon={<ActionPets style={iconStyle}/>}
          />
        </GridList>
      </div>
    );
  }
}

class HomeButton extends React.Component {
  render() {
    return (
      <Link to={this.props.to}>
        <FlatButton
          backgroundColor={this.props.backgroundColor}
          style={{height: `140px`, width: `200px`}}
          icon={this.props.icon}
        />
      </Link>
    );
  }
}