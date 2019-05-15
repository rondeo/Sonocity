import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UPLOAD_SONG from './queries/audioUpload'

import DropZoneAudio from './components/AudioFileDragger'
import DropZoneImage from './components/ImageSelector'

class UploadModule extends Component {
    state = {
        name: null,
        image: null,
        songList: [],
        error: null,
        imageMimeType: null,
        url: null,
        inProgress: false
    };

    addToList = song => {
        song[1].length > 100000000 ? console.log(">100mb") : this.setState({songList: [...this.state.songList, song]});
    }

    changeImage = dataUrl => {
        this.setState({
            image: dataUrl
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
            
            try{
                this.uploadAudioFile(song);
            } catch (e) {
                console.log(e);
                this.setState({ error: e.message })
            }

        }) 

    }  

    setUpUpload = file => {
        const cloudName = 'dkt7hv91e';
        const unsignedUploadPreset = 'gqo3naek';
        let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        let xhr = new XMLHttpRequest();
        let fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);

        return [xhr, fd];
    }

    uploadAudioFile = song => {

        const set = this.setUpUpload(song[1]);
        const xhr = set[0];
        const fd = set[1];

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // File uploaded successfully
                let response = JSON.parse(xhr.responseText);
                let url = response.secure_url;   

                const set1 = this.setUpUpload(this.state.image);
                const xhr1 = set1[0];
                const fd1 = set1[1];
        
                xhr1.onreadystatechange = (e) => {
                    if (xhr1.readyState == 4 && xhr1.status == 200) {
                        let response1 = JSON.parse(xhr1.responseText);
                        let url2 = response1.secure_url; 
                        console.log(url2)  
                        
                        let disque = song[0].common.disk;
                        (typeof disque === 'string' || disque instanceof String) ? (null) : disque=" ";        
                        const dataresult = this.props.uploadSong({
                            variables: {
                                title: song[0].common.title,
                                artist: song[0].common.artist,
                                album: disque,
                                duration: song[0].format.duration,
                                dataformat: song[0].format.dataformat,
                                fileUrl: url,
                                coverUrl: url2
                            }
                        });

                        this.state.error ? (null) : this.props.uploadSuccess()

                    };
                }
                    xhr1.send(fd1); 
            }
        };
        xhr.send(fd);
    }
           
    render() {
        const files = this.state.songList.map((file, i) => <li key={i} onClick={this.removeSong}>{file[0].common.title} - {file[0].common.artist}</li>)
        return (
            <div>     
                <Fragment>
                    
                    <DropZoneAudio addUp={this.addToList}/>
                    {
                    (this.state.songList.length > 0) ? 
                        (<Fragment> <p>{this.state.songList.length} audio files selected for upload</p> <ul>{files}</ul> </Fragment>) 
                        : ( null)
                        
                    }
                    <DropZoneImage addUp={this.changeImage}/>

                    {this.state.inProgress && <h2>... Uploading ...</h2>}

                    {this.state.image ? ((this.state.image.length < 2000001) ? (<h3>Image Accepted</h3>) : (<h3>Image is too big</h3>)) : (null) } 
                    { (this.state.songList.length > 0) && (this.state.image ? ((this.state.image.length < 2000001) ? (true) : (null)) : (null)) ?
                    (
                        <button 
                            onClick={()=> {
                                this.setState({
                                    inProgress: true
                                })
                                this.upload();
                            }}
                        >
                        Upload
                        </button>
                     ) : ( <h3>The upload is not ready</h3> ) }

                    {this.state.error && <p>{this.state.error}</p>}
                                    
                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(UPLOAD_SONG, {
        name: "uploadSong",
        options: {
          refetchQueries: ["GET_ALL_AUDIO_ID", "GET_ALL_USER_AUDIO_ID"]
        }
    }),

)(withApollo(UploadModule));