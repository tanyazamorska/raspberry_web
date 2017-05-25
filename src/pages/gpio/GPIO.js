import React from 'react';
import {Table, TableBody, TableRow, TableHeaderColumn, TableHeader, TableRowColumn} from 'material-ui/Table';
import * as _colors from 'material-ui/styles/colors';
import scssVariables from '../../scssVariables';
import MyTheme from '../../MyTheme';

const tabGpio = [
  {
    'gpio': null,
    'name': `3.3 VDC`,
    'desc': `Power`,
    'backgroundColor': MyTheme.palette.accent3Color,
    'number': 1
  }, {
    'gpio': null,
    'name': `5.0 VDC`,
    'desc': `Power`,
    'backgroundColor': _colors.redA700,
    'number': 2
  },{
    'gpio': 8,
    'name': `GPIO 8`,
    'desc': `SDA1 (12C)`,
    'backgroundColor': _colors.lightBlue500,
    'number': 3
  }, {
    'gpio': 9,
    'name': `GPIO 9`,
    'desc': `SCL1 (12C)`,
    'backgroundColor': _colors.lightBlue500,
    'number': 5
  }, {
    'gpio': 7,
    'name': `GPIO 7`,
    'desc': `GPCLKO`,
    'backgroundColor': _colors.green800,
    'number': 7
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.textColor,
    'number': 9
  }, {
    'gpio': 0,
    'name': `GPIO 0`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 11
  }, {
    'gpio': 2,
    'name': `GPIO 2`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 13
  }, {
    'gpio': 3,
    'name': `GPIO 3`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 15
  }, {
    'gpio': null,
    'name': `3.3 VDC`,
    'desc': `Power`,
    'backgroundColor': _colors.amber500,
    'number': 17
  }, {
    'gpio': 12,
    'name': `GPIO 12`,
    'desc': `MOSI(SPI)`,
    'backgroundColor': _colors.purpleA400,
    'number': 19
  }, {
    'gpio': 13,
    'name': `GPIO 13`,
    'desc': `MISO (SPI)`,
    'backgroundColor': _colors.purpleA400,
    'number': 21
  }, {
    'gpio': 14,
    'name': `GPIO 14`,
    'desc': `SCLK(SPI)`,
    'backgroundColor': _colors.purpleA400,
    'number': 23
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.textColor,
    'number': 25
  }, {
    'gpio': 30,
    'name': `SDAO`,
    'desc': `(12C EEPROM)`,
    'backgroundColor': _colors.yellowA200,
    'number': 27
  }, {
    'gpio': 21,
    'name': `GPIO 21`,
    'desc': `GPCLK1`,
    'backgroundColor': _colors.green800,
    'number': 29
  }, {
    'gpio': 22,
    'name': `GPIO 22`,
    'desc': `GPCLK2`,
    'backgroundColor': _colors.green800,
    'number': 31
  }, {
    'gpio': 23,
    'name': `GPIO 23`,
    'desc': `PWM1`,
    'backgroundColor': _colors.green800,
    'number': 33
  }, {
    'gpio': 24,
    'name': `GPIO 24`,
    'desc': `PCM_FS/PWM1`,
    'backgroundColor': _colors.green800,
    'number': 35
  }, {
    'gpio': 25,
    'name': `GPIO 25`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 37
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.textColor,
    'number': 39
  }, {
    'gpio': null,
    'name': `5.0 VDC`,
    'desc': `Power`,
    'backgroundColor': _colors.redA700,
    'number': 4
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.textColor,
    'number': 6
  }, {
    'gpio': 15,
    'name': `GPIO 15`,
    'desc': `TxD(UART)`,
    'backgroundColor': _colors.indigo700,
    'number': 8
  }, {
    'gpio': 16,
    'name': `GPIO 16`,
    'desc': `RxD(UART)`,
    'backgroundColor': _colors.indigo700,
    'number': 10
  }, {
    'gpio': 1,
    'name': `GPIO 1`,
    'desc': `PCM_CLK/PWMO`,
    'backgroundColor': _colors.green800,
    'number': 12
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.canvasColor,
    'number': 14
  }, {
    'gpio': 4,
    'name': `GPIO 4`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 16
  }, {
    'gpio': 5,
    'name': `GPIO 5`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 18
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.textColor,
    'number': 20
  }, {
    'gpio': 6,
    'name': `GPIO 6`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 22
  }, {
    'gpio': 10,
    'name': `GPIO 10`,
    'desc': `(SPI)`,
    'backgroundColor': _colors.purpleA400,
    'number': 24
  }, {
    'gpio': 11,
    'name': `GPIO 11`,
    'desc': `CE1(SPI)`,
    'backgroundColor': _colors.purpleA400,
    'number': 26
  }, {
    'gpio': 31,
    'name': `SCL0`,
    'desc': `(12C ID EEPROM)`,
    'backgroundColor': _colors.yellowA200,
    'number': 28
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.textColor,
    'number': 30
  }, {
    'gpio': 26,
    'name': `GPIO 26`,
    'desc': `PWMO`,
    'backgroundColor': _colors.green800,
    'number': 32
  }, {
    'gpio': null,
    'name': `Ground`,
    'desc': ``,
    'backgroundColor': MyTheme.palette.textColor,
    'number': 34
  }, {
    'gpio': 27,
    'name': `GPIO 27`,
    'desc': ``,
    'backgroundColor': _colors.green800,
    'number': 36
  }, {
    'gpio': 28,
    'name': `GPIO 28`,
    'desc': `PCM_DIN`,
    'backgroundColor': _colors.green800,
    'number': 38
  }, {
    'gpio': 29,
    'name': `GPIO 29`,
    'desc': `PCM_DOUT`,
    'backgroundColor': _colors.green800,
    'number': 40
  }
];

const newArr = [];
for (let el = 0; el <= tabGpio.length; el++) {
  let first = el++;
  newArr.push([tabGpio[first], tabGpio[el]]);
}
console.log(newArr)

export default class GPIO extends React.Component {
  render() {
    return (
      <div style={{width: scssVariables.width}}>
        <div style={{width: `50%`, margin: `auto`}}>
          <h3 style={{textAlign: `center`}}>
            Raspberry Pi 3 Model B (J8 Header)
          </h3>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{color: MyTheme.palette.textColor}}>
                  GPIO#
                </TableHeaderColumn>
                <TableHeaderColumn style={{color: MyTheme.palette.textColor}}>
                  NAME
                </TableHeaderColumn>
                <TableHeaderColumn>

                </TableHeaderColumn>
                <TableHeaderColumn style={{color: MyTheme.palette.textColor}}>
                  NAME
                </TableHeaderColumn>
                <TableHeaderColumn style={{color: MyTheme.palette.textColor}}>
                  GPIO#
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                newArr.map((el, key) => {
                  let borderRadius = null;
                  if (el[0][`number`] === 1) {
                    borderRadius = `0`;
                  } else {
                    borderRadius = `25px`;
                  }
                  return (
                    <TableRow key={key}>
                      <TableRowColumn key={{key}}>
                        <h2>{el[0][`gpio`]}</h2>
                      </TableRowColumn>
                      <TableRowColumn key={key} style={{paddingLeft: 0}}>
                        <div>{el[0][`name`]}</div>
                        <div>{el[0][`desc`]}</div>
                        <div style={{
                          display: `inline-block`,
                          position: `relative`,
                          left: `105px`,
                          top: `-14px`,
                          transform: `rotate(270deg)`
                        }}>
                          <b>{el[0][`number`]}</b>
                        </div>
                      </TableRowColumn>
                      <TableRowColumn
                        style={{width: `16%`, padding: `0 0 0 5px`, backgroundColor: MyTheme.palette.borderColor}}>
                        <div style={{
                          width: `30px`,
                          height: `30px`,
                          borderRadius: borderRadius,
                          border: `1px solid ${MyTheme.palette.textColor}`,
                          margin: `5px`,
                          backgroundColor: el[0][`backgroundColor`],
                          float: `left`
                        }}>
                          <div style={{
                            width: `16px`,
                            height: `16px`,
                            borderRadius: `25px`,
                            border: `1px solid ${MyTheme.palette.textColor}`,
                            position: `relative`,
                            top: `6px`,
                            left: `6px`,
                            backgroundColor: MyTheme.palette.canvasColor,
                          }}>
                          </div>
                        </div>
                        <div style={{
                          width: `30px`,
                          height: `30px`,
                          borderRadius: `25px`,
                          border: `1px solid ${MyTheme.palette.textColor}`,
                          margin: `5px`,
                          backgroundColor: el[1][`backgroundColor`],
                          float: `left`
                        }}>
                          <div style={{
                            width: `16px`,
                            height: `16px`,
                            borderRadius: `25px`,
                            border: `1px solid ${MyTheme.palette.textColor}`,
                            position: `relative`,
                            top: `6px`,
                            left: `6px`,
                            backgroundColor: MyTheme.palette.canvasColor,
                          }}>
                          </div>
                        </div>
                      </TableRowColumn>
                      <TableRowColumn key={key} style={{paddingLeft: `44px`}}>
                        <div>{el[1][`name`]}</div>
                        <div>{el[1][`desc`]}</div>
                        <div style={{
                          display: `inline-block`,
                          position: `relative`,
                          left: `-38px`,
                          top: `-14px`,
                          transform: `rotate(90deg)`
                        }}>
                          <b>{el[1][`number`]}</b>
                        </div>
                      </TableRowColumn>
                      <TableRowColumn key={key}>
                        <h2>{el[1][`gpio`]}</h2>
                      </TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}






