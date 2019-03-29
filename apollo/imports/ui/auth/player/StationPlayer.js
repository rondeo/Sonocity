import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_STATION_DATA_BY_ID from './queries/getStationDataById';

import AudioPlayer from './components/AudioPlayer'

import "./style/stationPlayer.css"

class StationPlayer extends Component {

    state = {
        context: null,
        stationName: null,
        stationDescription: null,
        upNext: null,
        currentAudioId: null,
        ready: false,
        loopAll: false,
        loopOne: false,
        syncTime: null,
        coverUrl: null

    };

    componentDidMount() {
        this.props.getStationDataById.loading ?  (null) : this.processIntake()
    }

    componentDidUpdate(prevProps) {
        if(this.props.getStationDataById.station.name) {
            if(!this.props.getStationDataById.station.status){
                this.stationOffline()
            }
            if(this.props.getStationDataById.station.name !== this.state.stationName) {
                this.processIntake();
            } else if(this.props.getStationDataById.station.currentAudio !== this.state.currentAudioId) {
                this.changeAudio();
            } // else if(this.props.getStationDataById.station.currentAudio == this.state.currentAudioId) {
            //     this.onEnd();
            // }
        }
    }

    changeAudio = () => { 
        this.setState({
            currentAudioId: this.props.getStationDataById.station.currentAudio,
            syncTime: null
        })
    }

    processIntake = () => {
        this.setState({
            context: "station",
            stationName: this.props.getStationDataById.station.name,
            stationDescription: this.props.getStationDataById.station.description,
            upNext: this.props.getStationDataById.station.upNext,
            currentAudioId: this.props.getStationDataById.station.currentAudio,
            syncTime: (Date.now() - this.props.getStationDataById.station.timeStamp)/1000,
            coverUrl: this.props.getStationDataById.station.coverUrl,
            ready: true,
        })
    } 

    getSync = () => {
        return (Date.now() - this.props.getStationDataById.station.timeStamp)/1000;
    }

    onEnd = () => {
        this.props.getStationDataById.refetch();
    }

    stationOffline = () => {
        this.props.offline();
    }

    stationRefetch = () => {
        this.props.getStationDataById.refetch();
    }

    next = () => {}
    previous = () => {}
    handleLoop = () => {}

    render() {
        return (
            <div className="playerModule">              
                <Fragment>
                    <div className="stationPlayer">   
                        <div className="stationInfos">
                            <div className="stPlrCoverAndName">
                                <div className="stPlrCover">
                                    {this.state.coverUrl ? (<img src={this.state.coverUrl}/>): (null)}
                                </div>
                                <div className="stPlrName">
                                    {this.state.stationName ? (<h3>@{this.state.stationName} {this.state.context}</h3>): (null)}
                                    {this.state.stationDescription ? (<h4>{this.state.stationDescription}</h4>): (null)}
                                </div>
                            </div>
                        </div>
                        <div className="stationAudioPlayer">
                            {this.state.ready ?  
                                <AudioPlayer stationName={this.state.stationName} context={this.state.context} getSync={this.getSync} synchro={this.state.syncTime} offline={this.stationOffline} next={this.next} previous={this.previous} onEnd={this.onEnd} handleLoop={this.handleLoop} loopAll={this.state.loopAll} loopOne={this.state.loopOne}
                                    audioId={this.state.currentAudioId} 
                                /> 
                            : (<h3> Station Player </h3>)} 
                        </div>
                        <div className="upNextStationPlayer">
                        </div>
                    </div>  
                </Fragment>
            </div>
        )
    }
}

export default compose (

graphql(GET_STATION_DATA_BY_ID, {
    name: "getStationDataById",
}),

)(withApollo(StationPlayer));