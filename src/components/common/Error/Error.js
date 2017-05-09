import React from 'react';
import MyTheme from '../../../MyTheme';
import scssVariables from '../../../scssVariables';

let instance = null;

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    instance = this;
    this.state = {
      isVisible: false,
      text: ``
    };
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
      <div style={styles}>{this.state.text}</div>
    );
  }
  static show(config) {
    instance.state.text = config.text || ``;
    instance.setState({isVisible: true});
  }
}

