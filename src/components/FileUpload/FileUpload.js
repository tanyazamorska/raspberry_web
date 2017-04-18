import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

export default class FileUpload extends React.Component {

  onFileSelected(event) {
    const el = event.target;
    const file = el.files[0];
    this.data = new FormData();
    this.data.append("data", file);
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
        success: function(data){
          alert("file uploaded");
          if (self.props.onUploaded) {
            self.props.onUploaded();
          }
        }
      });
      this.data = null;
    } else {
      alert("no file selected");
    }
  }

  // make button disabled if no file selected
  render() {
    return (
      <div>
        <input type="file" onChange={event => this.onFileSelected(event)} />
        <RaisedButton primary={true} label="Upload" onClick={event => this.onUploadPress()} />
      </div>
    )
  }
}