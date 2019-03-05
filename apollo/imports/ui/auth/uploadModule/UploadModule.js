import React, { Component, Fragment } from 'react'
import * as mm from 'music-metadata-browser';

import MyDropzone from './components/FileDragger'

export default class UploadModule extends Component {
    state = {
        name: null,
        image: null,
        fileList: [],
        songMetaData: [],
    };

    addToList = binaryStr => {
        this.setState({fileList: [...this.state.fileList, binaryStr]})
    }

    handleChange = e => {
        this.setState({name: e.target.value})
    }

    upload = () => {
        this.state.fileList.forEach(file => mm.parseBlob(file).then(metadata => {
            this.setState({songMetaData: [...this.state.songMetaData, metadata]})
    }))}
    
    render() {

        return (
            <div>     
                <Fragment>
                    
                    {/* <input type="text" ref={input => (this.state.name = input)} /> */}
                    <input type="text" onChange={this.handleChange} />
                    <MyDropzone addUp={this.addToList}/>
                    {/* {
                    (this.state.fileList.length > 0) ? 
                        (<p>{this.state.fileList.length} files selected for upload</p>) 
                        : ( ()=>{} )
                    } */}
                    { (this.state.fileList.length > 0) && (this.state.name || !this.state.name=="") ? 
                    (
                        <button 
                            onClick={()=> {
                                this.upload();
                            }}
                        >
                        Upload
                        </button>
                     ) : ( <h3>The upload is not ready</h3> ) }

                    {console.log([this.state.fileList,this.state.name,this.state.image,this.state.songMetaData])}
                
                </Fragment>       
            </div>
        )
    }
}