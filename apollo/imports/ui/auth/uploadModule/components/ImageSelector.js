import React, {useCallback, Component, Fragment} from 'react'
import {useDropzone} from 'react-dropzone'

export default function DropZoneImage(props) {
  const sendUp = binaryStr => {
    props.addUp(binaryStr);
  }
  
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      sendUp(reader.result);    
    }
    acceptedFiles.forEach(file => reader.readAsBinaryString(file))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'image/*', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select a cover IMAGE under 2 mb</p>
    </div>
  )
}