import React, {Component, useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import Latex from 'react-latex';

class Previews extends Component{
  
  constructor(props){
    super(props);
    this.accepted = this.accepted.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.state = {
      problem: ""
    }
  }

  async getBase64(file, cb){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
      cb(reader.result);
    }
    reader.onerror = function(err){ console.log(err)}
  }

  async fileUpload(file){
    try{
      await this.getBase64(file, (base64string) => {
        fetch('https://api.mathpix.com/v3/text', {
          method: 'POST',
          headers: {
              "app_id": "sourayaabdelkader_gmail_com_4cedcd_a3d246",
              "app_key": "22141cd5a3437fbc618f29f0a8e39b914a56e80750616a549a39f59b0391acf2",
              "content-type": "application/json"
          },
          body: JSON.stringify({
            src: base64string,
            formats: ["text", "data", "html"],
            data_options: {
              include_asciimath: true,
              include_latex: true
            }
          })
        })
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          localStorage.setItem('problem', response.data[1].value);
          this.state.problem = response.data[1].value;
        })
      })
    } catch(e){console.log(e.message)}
  }

  async accepted(acceptedFile){
    await this.fileUpload(acceptedFile[0])
  }
  render(){
    return(
      <div> 
        <div> <Latex>{}</Latex></div>
        <Dropzone
          maxFiles = {1}
          multiple = {false}
          canCancel = {false}
          acceptFiles = 'image/jpeg,image/png,image/gif,image/jpg'
          acceptedMimeTypes =  'image/jpeg,image/png,image/gif,image/jpg'
          noKeyboard= {true}
          onDropAccepted={this.accepted}
          onDropRejected={() => {console.log('rejected')}}
          > 
            {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && (<p className='dropezone'> Drag 'n' drop some files here, or click to select files </p>)}
                {isDragActive && !isDragReject && <p> File accepted </p>}
                {isDragActive && isDragReject && <p> File rejected </p>}
              </div>
            )}
        </Dropzone>
        <div>{localStorage.getItem('problem') && (<Latex>{'${'+localStorage.getItem('problem')+'}$'}</Latex>)}</div>
      </div>
    );
  }
} 

export default Previews;
