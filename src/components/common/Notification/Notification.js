import React from 'react';
import MyTheme from '../../../MyTheme';
import * as colors from 'material-ui/styles/colors';

let instance = null;
const defaultCfg = {
  level: `success`,
  position: `top-right`,
  text: ``,
  duration: 3000
};

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    instance = this;
    this.state = {
      isVisible: false,
      level: defaultCfg.level,
      position: defaultCfg.position,
      text: defaultCfg.text,
      duration: defaultCfg.duration
    };
  }

  showNotification() {
    this.setState({isVisible: true});
  }

  hideNotification() {
    this.setState({isVisible: false});
  }

  levelMap = {
    success: MyTheme.palette.accent1Color,
    warning: colors.orange300,
    error: colors.redA200
  };

  render() {
    const level = this.state.level;
    const levelMap = this.levelMap;
    const backgroundColor = levelMap[level];
    if (!backgroundColor) {
      throw `Notification error: attribute 'level' should be one of ['success', 'warning', 'error']`;
    }

    const styles = {
      width: `180px`,
      height: `50px`,
      backgroundColor: backgroundColor,
      position: `fixed`,
      boxShadow: `1px 2px 4px rgba(0, 0, 0, .5)`,
      textAlign: `center`,
      zIndex: 10000,
      opacity: this.state.isVisible ? 1 : 0
    };

    const position = this.state.position;
    if (position === `top-left`) {
      styles.top = `20px`;
      styles.left = `30px`;
    } else if (position === `top`) {
      styles.top = `20px`;
      styles.left = `43%`;
    } else if (position === `top-right`) {
      styles.top = `20px`;
      styles.right = `30px`;
    } else if (position === `left`) {
      styles.left = `30px`;
      styles.top = `50%`;
    } else if (position === `center`) {
      styles.top = `43%`;
      styles.left = `43%`;
    } else if (position === `right`) {
      styles.right = `30px`;
      styles.top = `50%`;
    } else if (position === `bottom-left`) {
      styles.bottom = `20px`;
      styles.left = `30px`;
    } else if (position === `bottom`) {
      styles.bottom = `30px`;
      styles.left = `43%`;
    } else if (position === `bottom-right`) {
      styles.bottom = `20px`;
      styles.right = `30px`;
    } else {
      throw `Notification error. Received unsupported property position: ${this.state.position}`;
    }

    return (
      <div style={styles}>
        <h3 style={{lineHeight: `10px`, color: MyTheme.palette.alternateTextColor}}>{this.state.text}</h3>
      </div>
    );
  }

  static show(config) {
    instance.state.text = config.text || defaultCfg.text;
    instance.state.level = config.level || defaultCfg.level;
    instance.state.position = config.position || defaultCfg.position;
    instance.state.duration = config.duration || defaultCfg.duration;

    instance.showNotification();
    setTimeout(() => {
      instance.hideNotification();
    }, instance.state.duration);
  }
}
