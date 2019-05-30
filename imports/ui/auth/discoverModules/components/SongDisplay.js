import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

import "../style/songDisplay.css"

import GET_AUDIO_DATA_BY_ID from '../queries/getDataByAudioId';

class SongDisplay extends Component {    

    state = {
        title: null,
        artist: null,
        coverUrl: null        
    };

    componentDidMount() {
        this.props.getAudioDataById.loading ? (null) : this.setUp() 
    }

    componentDidUpdate(prevProps) {
        if(this.props.getAudioDataById.audioData) {
            if (!this.state.title || this.props.getAudioDataById.audioData.title !== prevProps.getAudioDataById.audioData.title) {
                this.setUp();
            }
        }
    }

    componentWillUnmount() {

    }

    setUp = () => {
        this.setState({
            title: this.props.getAudioDataById.audioData.title,
            artist: this.props.getAudioDataById.audioData.artist,
            coverUrl: this.props.getAudioDataById.audioData.coverUrl
        })
    } 

    sendIndexUp = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div>              
                <Fragment>
                    <div className = "songDisplay" onClick={this.sendIndexUp}>
                        {!this.state.title ? (null) 
                        : ( 
                            <Fragment> 
                                <img src={this.state.coverUrl}/> 
                                <div className="spaceD">
                                <h6 className="songTitle">{this.state.title}</h6>
                                <h6 className="songArtist">{this.state.artist}</h6> 
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