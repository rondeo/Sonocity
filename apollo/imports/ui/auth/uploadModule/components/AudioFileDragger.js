import React, {useCallback, Component, Fragment} from 'react'
import {useDropzone} from 'react-dropzone'
import * as mm from 'music-metadata-browser';


export default function DropZoneAudio(props) {
  const sendUp = file => {
    let asBinaryString = null;
    const reader = new FileReader()
    reader.readAsBinaryString(file);

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      asBinaryString=reader.result;
      mm.parseBlob(file).then(metadata => { props.addUp([metadata, asBinaryString]); })
    }
  }
  
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => sendUp(file))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'audio/*', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select AUDIO files for upload (15 mb max per file)</p>
    </div>
  )
}