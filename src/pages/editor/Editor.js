import React from 'react';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import RaisedButton from 'material-ui/RaisedButton';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as variables from '../../variables.js';

function onChange(newValue) {
  console.log('change',newValue);
}

export default class Editor extends React.Component {
  render() {
    return (
    <div>
      <AppBar
        showMenuIconButton={false}
        style={{margin: variables.default.margin,
          width: variables.default.width,
          backgroundColor: theme.palette.accent1Color}}
        title={this.props.params.splat}
        iconElementRight={<RaisedButton label="Save" style={{margin:"6px 12px"}} />}
      />
      <div style={{margin: variables.default.margin, width: variables.default.width}}>
        <AceEditor
          mode="javascript"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          width={variables.default.width}
          fontSize="14px"
        />
      </div>
    </div>
    )
  }
}

