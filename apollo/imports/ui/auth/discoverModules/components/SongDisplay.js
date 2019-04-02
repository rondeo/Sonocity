import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

import "../style/songDisplay.css"

import GET_AUDIO_DATA_BY_ID from '../queries/getDataByAudioId';

class SongDisplay extends Component {    

    sendIndexUp = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div>              
                <Fragment>
                    <div className = "songDisplay" onClick={this.sendIndexUp}>
                        {this.props.getAudioDataById.loading ? (null) 
                        : ( 
                            <Fragment>
                                
                                <img src={this.props.getAudioDataById.audioData.coverUrl}/> 
                                <div className="spaceD">
                                <h6 className="songTitle">{this.props.getAudioDataById.audioData.title}</h6>
                                <h6 className="songArtist">{this.props.getAudioDataById.audioData.artist}</h6> 
                                </div>
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