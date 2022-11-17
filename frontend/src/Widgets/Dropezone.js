import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  marginTop: 20
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const Previews = (props) => {
  const [files, setFiles] = useState([]);
  const [base64, setBase64] = useState('')

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/png': [".jpeg",".jpg",'.png',".wepb"],
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      // handleDrop();
    },     
  });
// console.log(files)
// console.log(files[0].preview)
// console.log(base64)
//     const handleDrop = React.useCallback((acceptedFiles) => {
//         const file = acceptedFiles
//         let reader = new FileReader()
//         reader.readAsDataURL(files[0].preview)
//         console.log("hi")
//         reader.onload = () => {
//           console.log("preview")
//           console.log({
//             src: files.preview,
//             data: reader.result
//           })
//           setBase64(reader.result)
//          }
//      }, []);


  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select an image</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

export default Previews;