import React from 'react';
import {Link} from 'react-router';
import {GridList} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as colors from 'material-ui/styles/colors';
import * as variables from '../../variables.js';

class ComponentButton extends React.Component {
  render() {
    return (
      <FlatButton
        backgroundColor={this.props.backgroundColor}
        style={{height: "140px", width: "200px"}}
        icon={this.props.icon}
      />
    )
  }
}

export default class Home extends React.Component {
  render() {
    const iconStyle = {width: '50%', height: '50%'};
    return (
      <div style={{justifyContent: 'space-around', width:variables.default.width, margin: variables.default.margin}}>
        <GridList cols={4}>
          <Link to={`/file-manager/hide-hidden/not-sort/`}>
            <ComponentButton backgroundColor={colors.red500}
                             icon={<FileFolder
                               style={iconStyle}/>}/>
          </Link>
          <Link to={`/camera/`}>
            <ComponentButton backgroundColor={colors.pinkA700}
                             icon={<ImageCamera
                               style={iconStyle}/>}/>
          </Link>
          <Link to={`#`}>
            <ComponentButton backgroundColor={colors.purpleA700}
                             icon={<ContentAdd/>}/>
          </Link>
          <Link to={`#`}>
            <ComponentButton backgroundColor={colors.deepPurpleA700}
                             icon={<ContentAdd/>}/>
          </Link>
        </GridList>
      </div>
    )
  }
}

