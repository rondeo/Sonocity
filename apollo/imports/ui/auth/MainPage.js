import React, { Component, Fragment } from 'react'
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";
import { compose } from 'react-apollo'

// import SettingsMenu from './userSettings/components/SettingsMenu'
import UploadModule from './uploadModule/UploadModule'
import GET_ALL_AUDIO_ID from './queries/getAllAudioId'
import DiscoverAllSongs from "./discoverModules/DiscoverAllSongs"

class MainPage extends Component {
    state = {
        upload: false,
    };

    uploadComplete = () => {
        this.setState({upload: !this.state.upload})
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
                {console.log([this.props.getAllAudioId.allAudioId])}
                {this.state.upload ? (<UploadModule  uploadSuccess={this.uploadComplete}/>) : (null) }
                {/* <SettingsMenu /> */}
                {/* {console.log(this.props.getAllAudioData.allAudioCover)} */}
                {/* {this.constructImage} */}
                {this.props.getAllAudioId.loading ? (<p>loading</p>) : (<DiscoverAllSongs audio={this.props.getAllAudioId.allAudioId} />)}
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