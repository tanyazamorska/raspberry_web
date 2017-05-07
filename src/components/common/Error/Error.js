import React from 'react';
import MyTheme from '../../../MyTheme';
import scssVariables from '../../../scssVariables';

let errorThis = null;

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    errorThis = this;
    this.state = {isVisible: false};
  };

  showError() {
    this.setState({isVisible: true});
  }

  render() {
    const styles = {
      position: 'absolute',
      top: '250px',
      width: scssVariables.width,
      color: MyTheme.palette.accent3Color,
      textAlign: 'center',
      lineHeight: '250px',
      fontSize: '25px',
      opacity: this.state.isVisible ? 1 : 0
    };

    Error.show = () => {
      errorThis.state.isVisible = this.showError();
    };

    return (
      <div style={styles}>ERROR: CONNECTION REFUSED</div>
    )
  }
}

