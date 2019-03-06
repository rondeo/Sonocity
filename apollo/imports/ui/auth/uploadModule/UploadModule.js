import React, { Component, Fragment } from 'react'
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";
import { compose } from 'react-apollo'

import DropZoneAudio from './components/AudioFileDragger'
import DropZoneImage from './components/ImageSelector'

export default class UploadModule extends Component {
    state = {
        name: null,
        image: null,
        songList: [],
    };

    addToList = song => {
        song[1].length > 15000000 ? (<p>The maximum size of your audio files must be of 15 mb at this time</p>) : this.setState({songList: [...this.state.songList, song]});
    }

    changeImage = image => {
        this.setState({image: image});
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

                    {console.log([this.state.songList,this.state.name,this.state.image, (this.state.image ? this.state.image.length : (null))])}
                
                </Fragment>       
            </div>
        )
    }
}

// export default compose (
    
//     graphql(GET_USER_SETTINGS, {
//         name: "getUserSettings"
//     }),
//     graphql(GET_USER_SETTINGS, {
//         name: "getUserSettings"
//     }),

// )(SettingsMenu) 