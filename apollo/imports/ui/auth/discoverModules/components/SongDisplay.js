import React, { Component, Fragment } from 'react';
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";
import { compose } from 'react-apollo';
import "../style/songDisplay.css"

import GET_AUDIO_DATA_BY_ID from '../queries/getDataByAudioId';

class SongDisplay extends Component {    

    render() {
        return (
            <div>              
                <Fragment>
                    <div className = "songDisplay">
                        {this.props.getAudioDataById.loading ? (null) : console.log(this.props.getAudioDataById.audioData)}
                        {this.props.getAudioDataById.loading ? (null) 
                        : ( 
                            <Fragment>
                                <h6>{this.props.getAudioDataById.audioData.title}</h6>
                                <h6>{this.props.getAudioDataById.audioData.artist}</h6> 
                                <img src={this.props.getAudioDataById.audioData.coverUrl}/>
                            </Fragment>
                        )}
                    </div>  
                </Fragment>
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_AUDIO_DATA_BY_ID, {
        name: "getAudioDataById"
    }),

)(withApollo(SongDisplay));