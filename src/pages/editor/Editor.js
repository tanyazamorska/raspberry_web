import React from 'react';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import FlatButton from 'material-ui/FlatButton';

function onChange(newValue) {
  console.log('change',newValue);
}

export default class Editor extends React.Component {
  render() {
    return (
    <div>
      <AppBar
        showMenuIconButton={false}
        style={{margin: 'auto', width: 900}}
        title={this.props.params.splat}
        iconElementRight={<FlatButton label="Save" />}
      />
      <div style={{margin: 'auto', width: 900}}>
        <AceEditor
          mode="javascript"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          width="900px"
          fontSize="14px"
        />
      </div>
    </div>
    )
  }
}

