import React from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Home from "./../../pages/home/Home.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class Layout extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={{backgroundColor: theme.palette.accent2Color}}>
          <Header />
          <div style={{height: 70}}></div>
          <div style={{minHeight: 350, paddingBottom: 50, display: 'flex', justifyContent: 'center', flexFlow: 'row wrap'}}>
            {this.props.children || <Home/>}
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
