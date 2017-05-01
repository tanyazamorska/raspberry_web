'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

import * as _colors from 'material-ui/styles/colors';
import * as _colorManipulator from 'material-ui/utils/colorManipulator';
import * as _spacing from 'material-ui/styles/spacing';
let _spacing2 = _interopRequireDefault(_spacing);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
exports.default = {
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: _colors.purple500,
    primary2Color: _colors.purple700,
    primary3Color: _colors.purple800,
    accent1Color: _colors.greenA200,
    accent2Color: _colors.grey100,
    accent3Color: _colors.deepOrange500,
    textColor: _colors.darkBlack,
    secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
    alternateTextColor: _colors.white,
    canvasColor: _colors.white,
    borderColor: _colors.grey300,
    disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
    pickerHeaderColor: _colors.purple900,
    clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
    shadowColor: _colors.fullBlack
  }
}; /**
 * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
 */

