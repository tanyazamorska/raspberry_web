import './Header.scss';
import React from 'react';
//import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';

import FontIcon from 'material-ui/FontIcon';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        iconElementLeft = {<FontIcon className = "material-icons">home</FontIcon>}
      />
    )
  }
};

// <nav className="navbar navbar-default k-header">
//   <div className="container-fluid">
//     <div className="navbar-header">
//       <Link to={"/"} className="navbar-brand">
//         <i className="glyphicon glyphicon-home"></i>
//       </Link>
//     </div>
//   </div>
// </nav>
