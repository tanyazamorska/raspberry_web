import * as _colors from 'material-ui/styles/colors';
import _ from 'lodash';
import MyTheme from '../../MyTheme';

const original = [
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

const data = _.sortBy(original, [`number`]);

export default data;