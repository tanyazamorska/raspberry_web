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
        <RaisedButton label="Send" secondary={true} />
        <div style={{height: `50px`}}>
        </div>
       <ChooseSpeed/>
      </div>
    );
  }
}


const items = _.range(1, 11).map(item => <MenuItem value={item} key={item} primaryText={`Speed ${item}`} />);

class ChooseSpeed extends React.Component {
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
        onChange={this.handleChange}
      >
        {items}
      </SelectField>
    );
  }
}