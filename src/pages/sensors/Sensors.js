import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import scssVariables from '../../scssVariables';
import MyTheme from '../../MyTheme';

export default class Sensors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
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
      [11, 12, 13, 14, 15, 16, 17, 18],
      [21, 22, 23, 24, 25, 26, 27, 28],
      [31, 32, 33, 34, 35, 36, 37, 38],
      [41, 42, 43, 44, 45, 46, 47, 48],
      [51, 52, 53, 54, 55, 56, 57, 58],
      [61, 62, 63, 64, 65, 66, 67, 68],
      [71, 72, 73, 74, 75, 76, 77, 78],
    ];

    function handleActive(tab) {
      browserHistory.push(tab.props['data-route']);
    }


    return (
      <div style={{width: scssVariables.width}}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label='Manual' value="a" data-route='#/sensors/manual' onActive={handleActive}>
          <div style={{height: '40px'}}> </div>
          <Table>
            <TableBody displayRowCheckbox={false} style={{border: `1px solid ${MyTheme.palette.borderColor}`}}>
              {
                matrix.map((el) => {
                  return (
                    <TableRow>
                      <TableRowColumn style={{
                        border: `1px solid ${MyTheme.palette.borderColor}`,
                        paddingLeft: '44px',
                        height: '58px'
                      }}>
                        <div style={{
                          borderRadius: '25px',
                          backgroundColor: MyTheme.palette.borderColor,
                          width: '50px',
                          height: '50px'
                        }}>
                          {el[0]}
                        </div>
                      </TableRowColumn>
                      <TableRowColumn>
                        {el[1]}
                      </TableRowColumn>
                      <TableRowColumn>
                        {el[2]}
                      </TableRowColumn>
                      <TableRowColumn>
                        {el[3]}
                      </TableRowColumn>
                      <TableRowColumn>
                        {el[4]}
                      </TableRowColumn>
                      <TableRowColumn>
                        {el[5]}
                      </TableRowColumn>
                      <TableRowColumn>
                        {el[6]}
                      </TableRowColumn>
                      <TableRowColumn>
                        {el[7]}
                      </TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </Tab>
          <Tab label='TAB B' value="b" data-route='#/sensors/tabB' onActive={handleActive}>
          </Tab>
        </Tabs>
      </div>
    );
  }
}


