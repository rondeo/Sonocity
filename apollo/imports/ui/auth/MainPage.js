import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_ALL_AUDIO_ID from './queries/getAllAudioId'
import GET_USER_LIKED_AUDIO from './queries/getUserLikedAudio'

import UploadModule from './uploadModule/UploadModule'
import DiscoverSongs from "./discoverModules/DiscoverSongs"
import Player from "./player/Player"

import "./style/mainPage.css"

class MainPage extends Component {
    state = {
        upload: false,
        playerContent: null
    };

    uploadComplete = () => {
        this.setState({upload: !this.state.upload})
    }

    songSelected = (audioId, i, context, name) => {
        this.setState({
            playerContent: [audioId, i, context, name]
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

                <div className="core">

                <Player content={this.state.playerContent} />

                {console.log(this.props.getUserLikedAudio.userLikedAudio)}

                {this.props.getUserLikedAudio.loading ? (<p>loading</p>) : ( this.props.getUserLikedAudio.userLikedAudio.length > 0 ? (<DiscoverSongs name={"Your liked songs"} audio={this.props.getUserLikedAudio.userLikedAudio} songSelected={this.songSelected} />) : (null))}

                {this.props.getAllAudioId.loading ? (<p>loading</p>) : (<DiscoverSongs name={"All songs"} audio={this.props.getAllAudioId.allAudioId} songSelected={this.songSelected} />)}
                
                </div>

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