import React, {useCallback, Component, Fragment} from 'react'
import {useDropzone} from 'react-dropzone'
import * as mm from 'music-metadata-browser';


export default function DropZoneAudio(props) {
  const sendUp = binaryStr => {
    let b = new Blob([binaryStr], {type: 'audio/*'});
    mm.parseBlob(b).then(metadata => { props.addUp([metadata, b]); })
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
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'audio/*', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select AUDIO files for upload - 1 at a time</p>
    </div>
  )
}