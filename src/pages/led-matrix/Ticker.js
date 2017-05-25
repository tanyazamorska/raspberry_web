import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {GridList} from 'material-ui/GridList';
import _ from 'lodash';
import scssVariables from '../../scssVariables';
import LedTable from './LedTable.js';

export default class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      direction: `Non`,
      text: null
    };
  }

  speedChange = (event, index, speed) => {
    this.setState({speed}); // {value: value}
  };

  directionChange = (event, index, direction) => {
    this.setState({direction});
  };

  SelectSpeed = () => {
    const items = _.range(1, 11).map(item => <MenuItem value={item} key={item} primaryText={`Speed ${item}`}/>);
    return (
      <SelectField
        floatingLabelText='Select speed'
        value={this.state.speed}
        onChange={this.speedChange}>
        {items}
      </SelectField>
    );
  };

  SelectDirection = () => {
    return (
      <SelectField
        floatingLabelText='Select direction'
        value={this.state.direction}
        onChange={this.directionChange}>
        <MenuItem value={`Non`} primaryText='Non'/>
        <MenuItem value={`Lef-Right`} primaryText='Lef-Right'/>
        <MenuItem value={`Right-Left`} primaryText='Right-Left'/>
        <MenuItem value={`Top-Bottom`} primaryText='Top-Bottom'/>
        <MenuItem value={`Bottom-Top`} primaryText='Bottom-Top'/>
      </SelectField>
    );
  };

  onClickSaveButton = () => {
    console.log(this.state)
  };

  render() {
    return (
      <div style={{width: scssVariables.width, paddingTop: `50px`}}>
        <GridList cols={2} cellHeight={450}>
          <div>
            <div style={{marginBottom: `50px`}}>
              <TextField hintText='Ticker'
                         onChange={(event, newValue) => {this.setState({text: newValue})}}
                         fullWidth={true} type='text'/>
              <RaisedButton label='Send'
                            secondary={true}
                            onTouchTap={(newValue) => this.onClickSaveButton()}
                            style={{position: `relative`, left: `485px`}}/>
            </div>
            <div style={{marginBottom: `50px`}}>
              {this.SelectSpeed()}
            </div>
            <div style={{marginBottom: `50px`}}>
              {this.SelectDirection()}
            </div>
          </div>
          <div>
            <LedTable/>
          </div>
        </GridList>
      </div>
    );
  }
}




