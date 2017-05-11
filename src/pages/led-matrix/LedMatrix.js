import React from 'react';
import {browserHistory} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import scssVariables from '../../scssVariables';
import MyTheme from '../../MyTheme';


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

    function handleActive(tab) {
      browserHistory.push(tab.props[`data-route`]);
    }

    return (
      <div style={{width: scssVariables.width}}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label='Manual' value='a' data-route='#/led-matrix/manual/' onActive={handleActive}>
            <ManualTable/>
          </Tab>
          <Tab label='TAB B' value='b' data-route='#/led-matrix/tabB/' onActive={handleActive}>
          </Tab>
        </Tabs>
      </div>
    );
  }
}


class ManualTable extends React.Component {
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

    return (
      <div style={{marginTop: `35px`, width: `350px`}}>
        <Table style={{width: `300px`}}>
          <TableBody displayRowCheckbox={false} style={{border: `1px solid ${MyTheme.palette.borderColor}`}}>
            {
              matrix.map((row, i) => {
                return <TableRow key={i} style={{border: `0px`, height: `25px`}}>
                  {
                    row.map((cell, index) => (
                      <TableRowColumn key={i + `` + index} style={{
                        backgroundColor: MyTheme.palette.textColor,
                        paddingLeft: `8px`,
                        height: `25px`,
                      }}>
                        <div style={{
                          borderRadius: `25px`,
                          backgroundColor: MyTheme.palette.borderColor,
                          width: `25px`,
                          height: `25px`
                        }}>
                        </div>
                      </TableRowColumn>
                    ))
                  }
                </TableRow>;
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}
