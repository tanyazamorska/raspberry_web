import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import scssVariables from '../../scssVariables';

export default class LedMatrix extends React.Component {
  render() {
    return (
      <div style={{width: scssVariables.width}}>
        <Tabs>
          <Tab label='Manual' onActive={() => this.props.router.push(`/led-matrix/manual/`)}>
          </Tab>
          <Tab label='Ticker' onActive={() => this.props.router.push(`/led-matrix/ticker/`)}>
          </Tab>
        </Tabs>
        {this.props.children}
      </div>
    );
  }
}


