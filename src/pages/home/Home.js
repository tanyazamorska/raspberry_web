import React from 'react';
import {Link} from 'react-router';
import {GridList} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as colors from 'material-ui/styles/colors';

export default class Home extends React.Component {
  render() {
    return (
      <div style={{justifyContent: 'space-around', width: 900, margin: 'auto'}}>
        <GridList cols={4}>
          <Link to={`/file-manager/hide-hidden/not-sort/`}>
            <FlatButton
              backgroundColor={colors.red900}
              icon={<FileFolder style={{width:100, height:100}}/>}
              style={{height: "140px", width: "200px"}}
            />
          </Link>
          <Link to={`/camera/`}>
            <FlatButton
              backgroundColor={colors.pinkA700}
              icon={<ImageCamera style={{width: "50%", height:"50%"}}/>}
              style={{height: "140px", width: "200px"}}
            />
          </Link>
          <Link to={`#`}>
            <FlatButton
              backgroundColor={colors.purpleA700}
              icon={<ContentAdd />}
              style={{height: "140px", width: "200px"}}
            />
          </Link>
          <Link to={`#`}>
            <FlatButton
              backgroundColor={colors.deepPurpleA700}
              icon={<ContentAdd />}
              style={{height: "140px", width: "200px"}}
            />
          </Link>
        </GridList>
      </div>
    )
  }
}

