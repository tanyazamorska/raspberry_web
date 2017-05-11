import React from 'react';
import {browserHistory} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import scssVariables from '../../scssVariables';
import MyTheme from '../../MyTheme';

const style = {
  tableColumn: {
    border: `1px solid ${MyTheme.palette.borderColor}`,
    paddingLeft: `44px`,
    height: `58px`
  },
  itemCircle: {
    borderRadius: `25px`,
    backgroundColor: MyTheme.palette.borderColor,
    width: `50px`,
    height: `50px`
  }
};

export default class LedMatrix extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: `a`,
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    const matrix = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false]
    ];

    function handleActive(tab) {
      browserHistory.push(tab.props[`data-route`]);
    }

    return (
      <div style={{width: scssVariables.width}}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label='Manual' value='a' data-route='#/led-matrix/manual/' onActive={handleActive}>
          <div style={{height: `40px`}}> </div>
          <Table>
            <TableBody displayRowCheckbox={false} style={{border: `1px solid ${MyTheme.palette.borderColor}`}}>
              {
                matrix.map((row, i) => {
                  return <TableRow key={i}>
                    {
                      row.map((cell, index) => (
                        <TableRowColumn style={style.tableColumn} key={i + `` + index}>
                          <div style={style.itemCircle}>
                          </div>
                        </TableRowColumn>
                      ))
                    }
                  </TableRow>;
                })
              }
            </TableBody>
          </Table>
        </Tab>
          <Tab label='TAB B' value='b' data-route='#/led-matrix/tabB/' onActive={handleActive}>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
