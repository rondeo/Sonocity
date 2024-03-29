import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_AUDIO_DATA_BY_ID from '../queries/getAudioDataById';

class CurrentAudio extends Component {
    state = {
        title: null,
        artist: null,
        duration: 0,
        coverUrl: null,
        localCount: 0,
        timeStamp: null
    }

    componentDidMount() {       
        this.setUp()
    }

    componentWillUpdate(prevProps) {
        if(!this.props.getAudioDataById.loading && this.props.timeStamp) {
            if(this.props.timeStamp != this.state.timeStamp) {
                this.update();
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setUp = () => {
        this.timer = setInterval(() => { 
            this.setState({
                localCount: this.state.localCount + 0.1
            })
            this.evaluate();
        }, 100);
    }

    async evaluate() {
        if(this.timeRemaining() <= 0) {
            this.props.currentUpdate;
            this.set
        }
    }

    update = () => {
        this.setState({
            title: this.props.getAudioDataById.audioData.title,
            artist: this.props.getAudioDataById.audioData.artist,
            duration: this.props.getAudioDataById.audioData.duration,
            coverUrl: this.props.getAudioDataById.audioData.coverUrl,
            timeStamp: this.props.timeStamp,
            localCount: (Date.now()-this.props.timeStamp+3.0)/1000
        })    
    }

    timeRemaining = () => {
        return this.state.duration-this.state.localCount;
    }

    render() {
        return (
            <div>   
                {!this.state.title ? (null) 
                : ( 
                <Fragment>
                    <h6>{this.state.title} - {this.state.artist}</h6>
                    <img src={this.state.coverUrl}/>
                    <h6>{Math.floor(this.timeRemaining())} seconds before change</h6>
                </Fragment>
                )}
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_AUDIO_DATA_BY_ID, {
        name: "getAudioDataById",
    }),

)(withApollo(CurrentAudio));