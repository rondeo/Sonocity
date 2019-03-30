import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

import GET_AUDIO_DATA_BY_ID from '../queries/getAudioDataById';

class UpNextDisplay extends Component {    

    sendIndexUp = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div>              
                <Fragment>
                    <div className = "stationUpNextD" onClick={this.sendIndexUp}>
                        {this.props.getAudioDataById.loading ? (null) 
                        : ( 
                            <Fragment>
                                <img src={this.props.getAudioDataById.audioData.coverUrl}/>
                                <h3>{this.props.getAudioDataById.audioData.title}</h3>
                                {/* <h6>{this.props.getAudioDataById.audioData.artist}</h6>  */}
                                {/* <img src={this.props.getAudioDataById.audioData.coverUrl}/> */}
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
        name: "getAudioDataById",
    }),

)(withApollo(UpNextDisplay));