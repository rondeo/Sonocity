import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

// import SettingsMenu from './userSettings/components/SettingsMenu'
import UploadModule from './uploadModule/UploadModule'
import GET_ALL_AUDIO_ID from './queries/getAllAudioId'
import DiscoverAllSongs from "./discoverModules/DiscoverAllSongs"
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

    render() {
        return (
            <div>     
                <Fragment>
                <button 
                    onClick={()=> {
                        Meteor.logout();
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

)(withApollo(MainPage));