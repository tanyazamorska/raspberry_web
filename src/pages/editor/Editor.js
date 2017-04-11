import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

function onChange(newValue) {
  console.log('change',newValue);
}

export default class Editor extends React.Component {
  render() {
    return (
    <div>
      <div>
        <h3>path: {this.props.params.splat}</h3>
      </div>
      <AceEditor
        mode="javascript"
        theme="github"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
      />
    </div>
    )
  }
}

