import React from 'react';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';
import $ from 'jquery';
import 'brace/mode/markdown';
import 'brace/theme/github';
import RaisedButton from 'material-ui/RaisedButton';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import scssVariables from '../../scssVariables';
import variables from '../../variables';
import Notification from '../../components/common/Notification/Notification'

/**
 * reads data from server file
 * @param path - path to file on server
 * @param callback - function that will be executed on response received from server
 */
function getFileContents(path, callback) {
  $.ajax({
    method: "POST",
    url: variables.url + "cat",
    data: JSON.stringify({"path": path}),
    contentType: 'application/json',
    complete: function (res) {
      callback(res.responseJSON);
    }
  });
}

function save(path, contents, callback) {
  $.ajax({
    method: "POST",
    url:  variables.url + "echo",
    data: JSON.stringify({"path": path, "contents": contents}),
    contentType: 'application/json',
    complete: function (res) {
      if (callback) {
        callback(res.responseJSON);
      }
    }
  });
}

export default class Editor extends React.Component {
  componentWillMount() {
    const self = this;
    self.state = {contents: ""};
    const path = "/" + this.props.params.splat;
    getFileContents(path, data => {
      self.setState({contents: data});
    });
  }

  render() {
    const str = this.props.params.splat;
    const dot = str.lastIndexOf('.');
    const fileExtn = str.slice(dot + 1);
    let mode = '';
    if (fileExtn === 'js') {
      mode = 'javascript';
    } else if (fileExtn === 'java') {
      mode = 'java';
    } else if (fileExtn === 'sass') {
      mode = 'sass';
    } else if (fileExtn === 'py') {
      mode = 'python';
    } else if (fileExtn === 'xml') {
      mode = 'xml';
    } else if (fileExtn === 'rb') {
      mode = 'ruby';
    } else if (fileExtn === 'sass') {
      mode = 'sass';
    } else if (fileExtn === 'mysql') {
      mode = 'mysql';
    } else if (fileExtn === 'json') {
      mode = 'json';
    } else if (fileExtn === 'html') {
      mode = 'html';
    } else if (fileExtn === 'coffee') {
      mode = 'coffee';
    } else if (fileExtn === 'css') {
      mode = 'css';
    } else if (fileExtn === 'handlebars') {
      mode = 'handlebars';
    } else if (fileExtn === 'cs') {
      mode = 'csharp';
    } else {
      mode = 'markdown';
    }

    const self = this;
    const pathSave = '/' + this.props.params.splat;
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          style={{width: scssVariables.width, backgroundColor: theme.palette.accent1Color}}
          title={this.props.params.splat}
          iconElementRight={<RaisedButton label="Save" style={{margin: "6px 12px"}}
                                          onClick={() => save(pathSave, this.state.contents, () => {})}/>}
        />
        {<Notification/>}
        <div style={{width: scssVariables.width}}>
          <AceEditor
            mode={mode}
            theme="github"
            onChange={newValue => self.setState({contents: newValue})}
            name="K-EDITOR"
            editorProps={{$blockScrolling: true}}
            width={scssVariables.width}
            fontSize="16px"
            value={this.state.contents}
          />
        </div>
      </div>
    )
  }
}

