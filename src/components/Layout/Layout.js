import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../../MyTheme';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Home from './../../pages/home/Home.js';
import Notification from '../../components/common/Notification/Notification';

export default class Layout extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div style={{backgroundColor: MyTheme.palette.canvasColor}}>
          <Header />
          <Notification/>
          <div style={{height: 70}}></div>
          <div style={{minHeight: 350,
            paddingBottom: 50,
            display: `flex`,
            justifyContent: `center`,
            flexFlow: `row wrap`}}>
            {this.props.children || <Home/>}
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}
