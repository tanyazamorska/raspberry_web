import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

export default class Ticker extends React.Component {
  render() {
    return (
      <div>
        <div style={{height: `30px`}}>
        </div>
        <TextField
          hintText='Ticker'
          fullWidth={true}
          type='text'
        />
        <RaisedButton label='Send' secondary={true} />
        <div style={{height: `50px`}}>
        </div>
       <SelectSpeed/>
        <br/>
       <SelectDirection/>
      </div>
    );
  }
}


const items = _.range(1, 11).map(item => <MenuItem value={item} key={item} primaryText={`Speed ${item}`} />);

class SelectSpeed extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => {
    this.setState({value});
  };

  render() {
    return (
      <SelectField
        floatingLabelText='Select speed'
        value={this.state.value}
        onChange={this.handleChange}>
        {items}
      </SelectField>
    );
  }
}

class SelectDirection extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => {
    this.setState({value});
  };
  render() {
    return (
      <SelectField
        floatingLabelText='Select direction'
        value={this.state.value}
        onChange={this.handleChange}>
        <MenuItem value={1} primaryText='Non' />
        <MenuItem value={2} primaryText='Lef-Right' />
        <MenuItem value={3} primaryText='Right-Left' />
        <MenuItem value={4} primaryText='Top-Bottom' />
        <MenuItem value={5} primaryText='Bottom-Top' />
      </SelectField>
    );
  }
}