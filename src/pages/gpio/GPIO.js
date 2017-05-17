import React from 'react';
import {Table, TableBody, TableRow, TableHeaderColumn, TableHeader, TableRowColumn} from 'material-ui/Table';
import scssVariables from '../../scssVariables';
import MyTheme from '../../MyTheme';

const tabGpioLeft = [
  {
    'gpio': null,
    'name': `3.3 VDC`,
    'desc': `Power`
  },
  {
    'gpio': 8,
    'name': `GPIO 8`,
    'desc': `SDA1 (12C)`
  },
  {
    'gpio': 9,
    'name': `GPIO 9`,
    'desc': `SCL1 (12C)`
  },
  {
    'gpio': 7,
    'name': `GPIO 7`,
    'desc': `GPCLKO`
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  },
  {
    'gpio': 0,
    'name': `GPIO 0`,
    'desc': ``
  },
  {
    'gpio': 2,
    'name': `GPIO 2`,
    'desc': ``
  },
  {
    'gpio': 3,
    'name': `GPIO 3`,
    'desc': ``
  },
  {
    'gpio': null,
    'name': `3.3 VDC`,
    'desc': `Power`
  },
  {
    'gpio': 12,
    'name': `GPIO 12`,
    'desc': `MOSI(SPI)`
  },
  {
    'gpio': 13,
    'name': `GPIO 13`,
    'desc': `MISO (SPI)`
  },
  {
    'gpio': 14,
    'name': `GPIO 14`,
    'desc': `SCLK(SPI)`
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  },
  {
    'gpio': 30,
    'name': `SDAO`,
    'desc': `(12C EEPROM)`
  },
  {
    'gpio': 21,
    'name': `GPIO 21`,
    'desc': `GPCLK1`
  },
  {
    'gpio': 22,
    'name': `GPIO 22`,
    'desc': `GPCLK2`
  },
  {
    'gpio': 23,
    'name': `GPIO 23`,
    'desc': `PWM1`
  },
  {
    'gpio': 24,
    'name': `GPIO 24`,
    'desc': `PCM_FS/PWM1`
  },
  {
    'gpio': 25,
    'name': `GPIO 25`,
    'desc': ``
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  }
];

const tabGpioRight = [
  {
    'gpio': null,
    'name': `5.0 VDC`,
    'desc': `Power`
  },
  {
    'gpio': null,
    'name': `5.0 VDC`,
    'desc': `Power`
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  },
  {
    'gpio': 15,
    'name': `GPIO 15`,
    'desc': `TxD(UART)`
  },
  {
    'gpio': 16,
    'name': `GPIO 16`,
    'desc': `RxD(UART)`
  },
  {
    'gpio': 1,
    'name': `GPIO 1`,
    'desc': `PCM_CLK/PWMO`
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  },
  {
    'gpio': 4,
    'name': `GPIO 4`,
    'desc': ``
  },
  {
    'gpio': 5,
    'name': `GPIO 5`,
    'desc': ``
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  },
  {
    'gpio': 6,
    'name': `GPIO 6`,
    'desc': ``
  },
  {
    'gpio': 10,
    'name': `GPIO 10`,
    'desc': `(SPI)`
  },
  {
    'gpio': 11,
    'name': `GPIO 11`,
    'desc': `CE1(SPI)`
  },
  {
    'gpio': 31,
    'name': `SCL0`,
    'desc': `(12C ID EEPROM)`
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  },
  {
    'gpio': 26,
    'name': `GPIO 26`,
    'desc': `PWMO`
  },
  {
    'gpio': null,
    'name': `Ground`,
    'desc': ``
  },
  {
    'gpio': 27,
    'name': `GPIO 27`,
    'desc': ``
  },
  {
    'gpio': 28,
    'name': `GPIO 28`,
    'desc': `PCM_DIN`
  },
  {
    'gpio': 29,
    'name': `GPIO 29`,
    'desc': `PCM_DOUT`
  },
];

export default class GPIO extends React.Component {
  render() {
    return (
      <div style={{width: scssVariables.width}}>
        <div style={{width: `40%`, margin: `auto`}}>
          <div style={{
            width: `49%`,
            float: `left`,
            borderLeft: `1px solid ${MyTheme.palette.borderColor}`,
            borderBottom: `1px solid ${MyTheme.palette.borderColor}`,
            borderTop: `1px solid ${MyTheme.palette.borderColor}`
          }}>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={{color:MyTheme.palette.textColor}}>
                    GPIO#
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{color:MyTheme.palette.textColor}}>
                    NAME
                  </TableHeaderColumn>
                <TableHeaderColumn>

                </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  tabGpioLeft.map((el, key) => {
                    return (
                      <TableRow key={key}>
                        <TableRowColumn key={{key}}>
                          <h2>{el.gpio}</h2>
                        </TableRowColumn>
                        <TableRowColumn key={key} style={{paddingLeft: `0`, height: `51px`}}>
                          <div>{el.name}</div>
                          <div>{el.desc}</div>
                        </TableRowColumn>
                        <TableRowColumn style={{width: `17%`, padding: 0, backgroundColor: MyTheme.palette.borderColor}}>
                          <div style={{
                            width: `30px`,
                            height: `30px`,
                            borderRadius: `25px`,
                            margin: `auto`,
                            backgroundColor: MyTheme.palette.accent3Color,
                          }}>
                            <div style={{
                              width: `17px`,
                              height: `17px`,
                              borderRadius: `25px`,
                              position: `relative`,
                              top: `6px`,
                              left: `6.4px`,
                              backgroundColor: MyTheme.palette.canvasColor,
                            }}>
                            </div>
                          </div>
                        </TableRowColumn>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </div>
          <div style={{
            width: `50%`,
            float: `left`,
            borderRight: `1px solid ${MyTheme.palette.borderColor}`,
            borderBottom: `1px solid ${MyTheme.palette.borderColor}`,
            borderTop: `1px solid ${MyTheme.palette.borderColor}`
          }}>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>

                  </TableHeaderColumn>
                  <TableHeaderColumn style={{color:MyTheme.palette.textColor}}>
                    NAME
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{color:MyTheme.palette.textColor}}>
                    GPIO#
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  tabGpioRight.map((el, key) => {
                    return (
                      <TableRow key={key} style={{height: `48px`}}>
                        <TableRowColumn style={{width: `17%`, padding: 0, backgroundColor: MyTheme.palette.borderColor}}>
                          <div style={{
                            width: `30px`,
                            height: `30px`,
                            borderRadius: `25px`,
                            margin: `auto`,
                            backgroundColor: MyTheme.palette.accent3Color,
                          }}>
                            <div style={{
                              width: `17px`,
                              height: `17px`,
                              borderRadius: `25px`,
                              position: `relative`,
                              top: `6px`,
                              left: `6.4px`,
                              backgroundColor: MyTheme.palette.canvasColor,
                            }}>
                            </div>
                          </div>
                        </TableRowColumn>`
                        <TableRowColumn key={key}>
                          <div>{el.name}</div>
                          <div>{el.desc}</div>
                        </TableRowColumn>
                        <TableRowColumn key={key}>
                          <h2>{el.gpio}</h2>
                        </TableRowColumn>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}