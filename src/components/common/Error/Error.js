import React from 'react';
import MyTheme from '../../../MyTheme';
import scssVariables from '../../../scssVariables';

let instance = null;

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    instance = this;
    this.state = {isVisible: false};
  }

  render() {
    const styles = {
      position: `absolute`,
      top: `250px`,
      width: scssVariables.width,
      color: MyTheme.palette.accent3Color,
      textAlign: `center`,
      lineHeight: `250px`,
      fontSize: `25px`,
      display: this.state.isVisible ? `block` : `none`
    };

    return (
      <div style={styles}>ERROR: CONNECTION REFUSED</div>
    );
  }
  static show() {
    instance.setState({isVisible: true});
  }
}

