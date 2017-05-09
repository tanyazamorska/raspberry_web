import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import MyTheme from '../../MyTheme';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        iconElementLeft ={
          <Link to={`/`}>
            <img src='logo.png'
                 style={{width: 50, height: 50}}/>
          </Link>}
         style={{backgroundColor: MyTheme.palette.canvasColor,
           boxShadow: `0 8px 8px rgba(0,0,0,0.24)`,
         }}
      />
    );
  }
}


