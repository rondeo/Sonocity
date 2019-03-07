import React, { Component, Fragment } from 'react'
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";
import { compose } from 'react-apollo'

// import SettingsMenu from './userSettings/components/SettingsMenu'
import UploadModule from './uploadModule/UploadModule'
import GET_ALL_AUDIO_COVER from './queries/getAllAudioCoverImages'

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

                {this.state.upload ? (<UploadModule  uploadSuccess={this.uploadComplete}/>) : (null) }
                {/* <SettingsMenu /> */}
                {console.log(this.props.getAllAudioCover)}
                {/* {this.constructImage} */}
                

                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_ALL_AUDIO_COVER, {
        name: "getAllAudioCover"
    }),

)(withApollo(MainPage));