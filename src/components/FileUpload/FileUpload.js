import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import Notification from '../../components/common/Notification/Notification';

export default class FileUpload extends React.Component {

  onFileSelected(event) {
    const el = event.target;
    const file = el.files[0];
    if (file) {
      this.setState({'uploadButtonDisabled': false});
      this.data = new FormData();
      this.data.append("data", file);
    } else {
      this.setState({'uploadButtonDisabled':true});
    }
  }

  onUploadPress() {
    const self = this;
    if (this.data) {
      $.ajax({
        url: this.props.url,
        data: this.data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data) {
          if (self.props.onUploaded) {
           Notification.show({text: 'File Uploaded'});
            self.props.onUploaded();
          }
        }
      });
      this.data = null;
    }
  }

  componentWillMount() {
    const self = this;
    self.setState({'uploadButtonDisabled': true});
  }

  render() {
    return (
      <div>
        <input type="file" onChange={event => this.onFileSelected(event)} />
        <RaisedButton label="Upload"
                      disabled={this.state.uploadButtonDisabled}
                      onClick={event => this.onUploadPress()}
        />
      </div>
    )
  }
}



