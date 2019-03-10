import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

// import SettingsMenu from './userSettings/components/SettingsMenu'
import UploadModule from './uploadModule/UploadModule'
import GET_ALL_AUDIO_ID from './queries/getAllAudioId'
import GET_USER_LIKED_AUDIO from './queries/getUserLikedAudio'

import DiscoverAllSongs from "./discoverModules/DiscoverAllSongs"
import YourLikedAudio from "./discoverModules/YourLikedAudio"
import Player from "./player/Player"

class MainPage extends Component {
    state = {
        upload: false,
        playerContent: null
    };

    uploadComplete = () => {
        this.setState({upload: !this.state.upload})
    }

    songSelectedDA = (audioId, i) => {
        this.setState({
            playerContent: [audioId, i, "playlist", "All songs"]
        })
    }

    songSelectedYLA = (audioId, i) => {
        this.setState({
            playerContent: [audioId, i, "playlist", "Your liked audio"]
        })
    }

    render() {
        return (
            <div>   
                <Fragment>
                    
                <button 
                    onClick={()=> {
                        Meteor.logout();
                        this.props.client.cache.reset()
                        this.props.client.resetStore();
                    }}
                >
                    Logout
                </button>

                <button 
                    onClick={()=> {
                        this.setState({upload: !this.state.upload})
                    }}
                >
                    {this.state.upload ? "Cancel" : "Upload" }
                </button> 
                {this.state.upload ? (<UploadModule  uploadSuccess={this.uploadComplete}/>) : (null) }

                <Player content={this.state.playerContent} />

                {console.log(this.props.getUserLikedAudio.userLikedAudio)}

                {this.props.getUserLikedAudio.loading ? (<p>loading</p>) : ( this.props.getUserLikedAudio.userLikedAudio.length > 0 ? (<YourLikedAudio audio={this.props.getUserLikedAudio.userLikedAudio} songSelected={this.songSelectedYLA} />) : (null))}

                {this.props.getAllAudioId.loading ? (<p>loading</p>) : (<DiscoverAllSongs audio={this.props.getAllAudioId.allAudioId} songSelected={this.songSelectedDA} />)}
                
                {console.log(this.state.playerContent)}

                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_ALL_AUDIO_ID, {
        name: "getAllAudioId"
    }),

    graphql(GET_USER_LIKED_AUDIO, {
        name: "getUserLikedAudio"
    }),

)(withApollo(MainPage));