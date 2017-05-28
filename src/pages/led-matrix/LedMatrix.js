import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import scssVariables from '../../scssVariables';

export default class LedMatrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.location.pathname,
    };
  }

  handleChange = (value) => {
    this.setState({value});
    this.props.router.push(value);
  };

  render() {
    return (
      <div style={{width: scssVariables.width}}>
        <Tabs value={this.state.value}
              onChange={this.handleChange}
              style={{marginBottom: `70px`}}>
          <Tab label='Manual' value='/led-matrix/manual/'>
          </Tab>
          <Tab label='Ticker' value='/led-matrix/ticker/'>
          </Tab>
        </Tabs>
        {this.props.children}
      </div>
    );
  }
}
