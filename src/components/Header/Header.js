import './Header.scss';
import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

const style = {
  header: {
    backgroundColor: "rgb(255, 252, 252)"
  }
};

export default class Header extends React.Component {
  render() {
    return (
      <AppBar className="k-header" style={style.header}
              iconElementLeft={
                <Link to={'/'}>
                  <IconButton><i className="material-icons md-48">pets</i></IconButton>
                </Link>
              }
      />
    )
  }
};

