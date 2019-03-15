import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UPDATE_STATION_CURRENT_AUDIO from "../queries/updateStationCurrentAudio"

class StationManager extends Component {

    state = {
        localCount: -0.5,
        songDuration: 0,
    }

    componentDidMount() {
        this.setUp()
    }

    async updateCurrent() {
        const audioData = await this.props.updateCurrentAudio()
        if(audioData.data.updateCurrentAudio){
            this.setState({
                songDuration: audioData.data.updateCurrentAudio.duration
            })
        } else {
            this.setState({
                songDuration: 30.0
            })
        }
    }

    async setUp() {
        await this.updateCurrent();
        this.timer = setInterval(() => { 
            this.setState({
                localCount: this.state.localCount + 0.1
            })
            this.evaluate();
        }, 100);
    }

    evaluate = () => {
        console.log(this.state.localCount + " " + this.state.songDuration)
        if(this.state.localCount >= this.state.songDuration) {
            this.updateCurrent();
            this.setState({
                localCount: -0.5
            })
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default compose (

    graphql(UPDATE_STATION_CURRENT_AUDIO, {
        name: "updateCurrentAudio",
    }),
    
    )(withApollo(StationManager));
