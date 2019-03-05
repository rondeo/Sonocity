import React, {useCallback, Component, Fragment} from 'react'
import {useDropzone} from 'react-dropzone'


export default function MyDropzone(props) {
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
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'audio/*', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some AUDIO files here, or click to select AUDIO files</p>
    </div>
  )
}


// export default class FileDragger extends Component {

//   sendUp = binaryStr => {
//       this.props.addUp(binaryStr);
//   }

//   onDrop = () => useCallback(acceptedFiles => {
//     const reader = new FileReader()

//     reader.onabort = () => console.log('file reading was aborted')
//     reader.onerror = () => console.log('file reading has failed')
//     reader.onload = () => {
//     // Do whatever you want with the file contents
//     //   const binaryStr = reader.result
//     //   console.log(binaryStr)
//         this.sendUp(reader.result);
//     }
  
//     acceptedFiles.forEach(file => reader.readAsBinaryString(file))
//   }, [])
//   ({getRootProps, getInputProps, isDragActive}) = useDropzone({onDrop})

//     render() {
//     return (
//         <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//         </div>
//     )}   
// }