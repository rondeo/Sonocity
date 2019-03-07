import React, { Component, Fragment } from 'react'
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";
import { compose } from 'react-apollo'

import DropZoneAudio from './components/AudioFileDragger'
import DropZoneImage from './components/ImageSelector'
import UPLOAD_SONG from './queries/audioUpload'

class UploadModule extends Component {
    state = {
        name: null,
        image: null,
        songList: [],
        error: null,
        imageMimeType: null,
    };

    addToList = song => {
        song[1].length > 15000000 ? (<p>Individual audio files cannot exceed 15 mb a this time</p>) : this.setState({songList: [...this.state.songList, song]});
    }

    changeImage = (mimeType, base64Data) => {
        this.setState({
            imageMimeType: mimeType,
            image: base64Data
        });
    }

    handleChange = e => {
        this.setState({name: e.target.value})
    }

    removeSong = e => {
        let tempArray = [...this.state.songList];
        let index = parseInt(e.target.key);
        tempArray.splice(index, 1);
        this.setState({songList: tempArray});
    }

    upload = () => {
        this.state.songList.forEach(song => {
            let disque = song[0].common.disk;
            (typeof disque === 'string' || disque instanceof String) ? (null) : disque="";        
            const result = this.props.uploadSong({
                variables: {
                    title: song[0].common.title,
                    artist: song[0].common.artist,
                    album: disque,
                    duration: song[0].format.duration,
                    dataformat: song[0].format.dataformat,
                    audioFile: song[1],
                    coverImage: this.state.image,
                    imgMimeType: this.state.imageMimeType
                }
            }).catch(error => {
                console.log(error);
                this.setState({ error: error.message });
            });
            this.state.error ? (null) : this.props.uploadSuccess()
        });  
        
    }
    
    render() {
        const files = this.state.songList.map((file, i) => <li key={i} onClick={this.removeSong}>{file[0].common.title} - {file[0].common.artist}</li>)
        return (
            <div>     
                <Fragment>
                    
                    {/* <input type="text" ref={input => (this.state.name = input)} /> */}
                    {/*(this.state.songList.length > 1) ?
                    <Fragment><p>Name your Playlist:</p> <input type="text" onChange={this.handleChange} /></Fragment>
                    : (null)*/}
                    <DropZoneAudio addUp={this.addToList}/>
                    {
                    (this.state.songList.length > 0) ? 
                        (<Fragment> <p>{this.state.songList.length} audio files selected for upload</p> <ul>{files}</ul> </Fragment>) 
                        : ( null)
                        
                    }
                    <DropZoneImage addUp={this.changeImage}/>
                    {this.state.image ? ((this.state.image.length < 2000001) ? (<h3>Image Accepted</h3>) : (<h3>Image is too big</h3>)) : (null) } 
                    { (this.state.songList.length > 0) && (this.state.image ? ((this.state.image.length < 2000001) ? (true) : (null)) : (null)) 
                    /*&& ((this.state.songList.length > 1) ? ((this.state.name || !this.state.name=="") ? (true) : (null)) : (true)) */ ?
                    (
                        <button 
                            onClick={()=> {
                                this.upload();
                            }}
                        >
                        Upload
                        </button>
                     ) : ( <h3>The upload is not ready</h3> ) }
                    {this.state.error && <p>{this.state.error}</p>}
                    {console.log([this.state.songList,this.state.name, this.state.image, (this.state.image ? this.state.image.length : (null))])}
                
                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(UPLOAD_SONG, {
        name: "uploadSong",
        options: {
          refetchQueries: ["GET_ALL_AUDIO_DATA"]
        }
    }),

)(withApollo(UploadModule));