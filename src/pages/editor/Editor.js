import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

function onChange(newValue) {
  console.log('change',newValue);
}

const style = {
  divStyle: {
    position:'relative',
    marginTop: '16px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '3px'
  }
};

export default class Editor extends React.Component {
  render() {
    return (
    <div>
      <div>
        <h3>path: {this.props.params.splat}</h3>
      </div>
      <div className="k-file" style={style.divStyle}>
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

