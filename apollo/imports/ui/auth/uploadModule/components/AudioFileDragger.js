import React, {useCallback, Component, Fragment} from 'react'
import {useDropzone} from 'react-dropzone'
import * as mm from 'music-metadata-browser';


export default function DropZoneAudio(props) {
  const sendUp = file => {
    let asDataUrl = null;
    const reader = new FileReader()
    reader.readAsDataURL(file);

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      asDataUrl=reader.result;
      mm.parseBlob(file).then(metadata => { props.addUp([metadata, asDataUrl]); })
    }
  }
  
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => sendUp(file))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'audio/*', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select AUDIO files for upload (10 mb max per file)</p>
    </div>
  )
}