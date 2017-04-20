import React from 'react';
import {Link} from 'react-router';
import {GridList} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as colors from 'material-ui/styles/colors';
import scssVariables from '../../scssVariables.js';

const iconStyle = {width: '50%', height: '50%'};

export default class Home extends React.Component {
  render() {
    return (
      <div style={{width: scssVariables.width, marginLeft: '85px'}}>
        <GridList cols={4}>
          <HomeButton to={`/file-manager/hide-hidden/not-sort/home/pi`}
                      backgroundColor={colors.pinkA700}
                      icon={<FileFolder style={iconStyle}/>}
          />
          <HomeButton to={`/camera/`}
                      backgroundColor={colors.pink900}
                      icon={<ImageCamera style={iconStyle}/>}
          />
          <HomeButton to={`#`}
                      backgroundColor={colors.purpleA700}
                      icon={<ContentAdd style={iconStyle}/>}
          />
          <HomeButton to={`#`}
                      backgroundColor={colors.deepPurpleA700}
                      icon={<ContentAdd style={iconStyle}/>}
          />
        </GridList>
      </div>
    )
  }
}

class HomeButton extends React.Component {
  render() {
    return (
      <Link to={this.props.to}>
        <FlatButton
          backgroundColor={this.props.backgroundColor}
          style={{height: "140px", width: "200px"}}
          icon={this.props.icon}
        />
      </Link>
    )
  }
}