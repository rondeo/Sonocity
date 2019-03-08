import React, {useCallback, Component, Fragment} from 'react'
import {useDropzone} from 'react-dropzone'

export default function DropZoneImage(props) {
  const sendUp = dataUrl => {
    const base64Content = dataUrl;
    
    // base64 encoded data doesn't contain commas    
    let base64ContentArray = base64Content.split(",");
   
    // base64 content cannot contain whitespaces but nevertheless skip if there are!
    let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];

    // base64 encoded data - pure
    let base64Data = base64ContentArray[1];

//    console.log([mimetype,base64Data,dataUrl]);

    props.addUp(mimeType, base64Data);
  }
  
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
    
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      sendUp(reader.result);    
    }
    try {
      acceptedFiles.forEach(file => reader.readAsDataURL(file))
    } catch (e) { console.log(e) }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'image/*', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select a cover IMAGE under 2 mb</p>
    </div>
  )
}